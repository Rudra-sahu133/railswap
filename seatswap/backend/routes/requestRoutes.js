const express = require("express");
const {
  createRequest,
  getMyRequests,
  cancelRequest,
  searchRequests,
  getMatches,
  getHistory,
} = require("../controllers/requestController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, createRequest);
router.get("/", authMiddleware, getMyRequests);
router.get("/search", authMiddleware, searchRequests);
router.get("/matches", authMiddleware, getMatches);
router.get("/history", authMiddleware, getHistory);
router.patch("/:id", authMiddleware, cancelRequest);

module.exports = router;