const mongoose = require("mongoose");

const exchangeRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    trainNumber: {
      type: String,
      required: true,
      trim: true,
    },

    journeyDate: {
      type: Date,
      required: true,
    },

    coach: {
      type: String,
      required: true,
      trim: true,
    },

    currentSeat: {
      type: Number,
      required: true,
    },

    currentSeatType: {
      type: String,
      required: true,
    },

    desiredSeat: {
      type: Number,
      required: true,
    },

    desiredSeatType: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["open", "matched", "completed", "cancelled"],
      default: "open",
    },

    matchedRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExchangeRequest",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const ExchangeRequest = mongoose.model(
  "ExchangeRequest",
  exchangeRequestSchema
);

module.exports = ExchangeRequest;