const express = require("express");
const {
  createRequest,
  getMyRequests,
} = require("../controllers/requestController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createRequest);
router.get("/", authMiddleware, getMyRequests);

module.exports = router;