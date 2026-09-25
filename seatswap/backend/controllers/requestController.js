const ExchangeRequest = require("../models/ExchangeRequest");

const createRequest = async (req, res) => {
  try {
    const {
      trainNumber,
      journeyDate,
      coach,
      currentSeat,
      currentSeatType,
      desiredSeat,
      desiredSeatType,
      message,
    } = req.body;

    const request = await ExchangeRequest.create({
      userId: req.userId,
      trainNumber,
      journeyDate,
      coach,
      currentSeat,
      currentSeatType,
      desiredSeat,
      desiredSeatType,
      message,
    });

    res.status(201).json({
      message: "Exchange request created successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const getMyRequests = async (req, res) => {
  try {
    const requests = await ExchangeRequest.find({
  userId: req.userId,
  status: "open",
}).sort({ createdAt: -1 });

    res.status(200).json({
      requests,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
const searchRequests = async (req, res) => {
  try {
    const { trainNumber, journeyDate, coach } = req.query;

    const filter = {
      status: "open",
      userId: { $ne: req.userId },
    };

    if (trainNumber) {
      filter.trainNumber = trainNumber;
    }

    if (journeyDate) {
      filter.journeyDate = journeyDate;
    }

    if (coach) {
      filter.coach = coach;
    }

    const requests = await ExchangeRequest.find(filter)
      .sort({ createdAt: -1 });

    res.status(200).json({
      requests,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const cancelRequest = async (req, res) => {
  try {
    const request = await ExchangeRequest.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    if (request.status !== "open") {
      return res.status(400).json({
        message: "Only open requests can be cancelled",
      });
    }

    request.status = "cancelled";

    await request.save();

    res.status(200).json({
      message: "Request cancelled successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createRequest,
  getMyRequests,
  cancelRequest,
  searchRequests,
};