const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createAppeal,
  getReceivedAppeals,
  acceptAppeal,
  rejectAppeal,
} = require("../controllers/appealController");

router.post("/", authMiddleware, createAppeal);

router.get("/received", authMiddleware, getReceivedAppeals);

router.patch("/:id/accept", authMiddleware, acceptAppeal);

router.patch("/:id/reject", authMiddleware, rejectAppeal);

module.exports = router;