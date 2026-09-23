const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const requestRoutes = require("./routes/requestRoutes");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes);

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