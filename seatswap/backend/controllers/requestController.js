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

module.exports = { createRequest, getMyRequests };