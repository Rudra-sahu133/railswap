const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;



app.get("/", (req, res) => {
  res.send("SeatSwap Backend is Running");
});
app.get("/api/test", (req, res) => {
  res.json({
    message: "SeatSwap API is working",
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed");
    console.log(error.message);
  });