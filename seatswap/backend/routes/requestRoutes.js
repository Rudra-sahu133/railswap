const express = require("express");
const {
  createRequest,
  getMyRequests,
  cancelRequest,
} = require("../controllers/requestController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createRequest);
router.get("/", authMiddleware, getMyRequests);
router.patch("/:id", authMiddleware, cancelRequest);

module.exports = router;