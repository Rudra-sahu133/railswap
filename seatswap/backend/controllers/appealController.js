const Appeal = require("../models/Appeal");
const ExchangeRequest = require("../models/ExchangeRequest");

const createAppeal = async (req, res) => {
  try {
    const { requestId, message } = req.body;

    const request = await ExchangeRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({
        message: "Exchange request not found",
      });
    }
    if (request.status === "completed") {
  return res.status(400).json({
    message: "This exchange request has already been completed",
  });
}
    if (request.status !== "matched") {
      return res.status(400).json({
        message: "Request is not matched",
      });
    }

    const appeal = await Appeal.create({
      fromUserId: req.userId,
      toUserId: request.userId,
      requestId,
      message,
    });

    res.status(201).json({
      message: "Exchange appeal sent successfully",
      appeal,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
const getReceivedAppeals = async (req, res) => {
  try {
    const appeals = await Appeal.find({
      toUserId: req.userId,
    })
      .populate("fromUserId", "name email")
      .populate("requestId");

    res.status(200).json({
      appeals,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
const acceptAppeal = async (req, res) => {
  try {
    const { id } = req.params;

    const appeal = await Appeal.findById(id);

    if (!appeal) {
      return res.status(404).json({
        message: "Appeal not found",
      });
    }

    if (appeal.toUserId.toString() !== req.userId.toString()) {
      return res.status(403).json({
        message: "You cannot accept this appeal",
      });
    }

    if (appeal.status !== "pending") {
      return res.status(400).json({
        message: "Appeal has already been processed",
      });
    }

    const currentRequest = await ExchangeRequest.findById(
      appeal.requestId
    );

    if (!currentRequest) {
      return res.status(404).json({
        message: "Exchange request not found",
      });
    }

    const matchedRequest = await ExchangeRequest.findById(
      currentRequest.matchedRequestId
    );

    if (!matchedRequest) {
      return res.status(404).json({
        message: "Matched request not found",
      });
    }

    appeal.status = "accepted";

    currentRequest.status = "completed";
    matchedRequest.status = "completed";

    await appeal.save();
    await currentRequest.save();
    await matchedRequest.save();

    res.status(200).json({
      message: "Exchange appeal accepted",
      appeal,
      requests: {
        currentRequest,
        matchedRequest,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
const rejectAppeal = async (req, res) => {
  try {
    const { id } = req.params;

    const appeal = await Appeal.findById(id);

    if (!appeal) {
      return res.status(404).json({
        message: "Appeal not found",
      });
    }

    if (appeal.toUserId.toString() !== req.userId.toString()) {
      return res.status(403).json({
        message: "You cannot reject this appeal",
      });
    }

    if (appeal.status !== "pending") {
      return res.status(400).json({
        message: "Appeal has already been processed",
      });
    }

    appeal.status = "rejected";

    await appeal.save();

    res.status(200).json({
      message: "Exchange appeal rejected",
      appeal,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createAppeal,
  getReceivedAppeals,
  acceptAppeal,
  rejectAppeal,
};