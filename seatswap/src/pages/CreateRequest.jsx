import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import api from "../services/api";

function CreateRequest() {
  const [trainNumber, setTrainNumber] = useState("");
  const [journeyDate, setJourneyDate] = useState("");
  const [coach, setCoach] = useState("");
  const [currentSeat, setCurrentSeat] = useState("");
  const [currentSeatType, setCurrentSeatType] = useState("");
  const [desiredSeat, setDesiredSeat] = useState("");
  const [desiredSeatType, setDesiredSeatType] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
  const response = await api.post("/requests", {
    trainNumber,
    journeyDate,
    coach,
    currentSeat,
    currentSeatType,
    desiredSeat,
    desiredSeatType,
    message,
  });

  console.log(response.data);
} catch (error) {
  console.log(error.response?.data || "Request creation failed");
}
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Create Exchange Request 🚆
        </h1>

        <p className="text-gray-500 text-center mt-2 mb-8">
          Tell other passengers which seat you want to exchange
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <Input
            label="Train Number"
            type="text"
            value={trainNumber}
            onChange={(e) => setTrainNumber(e.target.value)}
            placeholder="e.g. 12860"
          />

          <Input
            label="Journey Date"
            type="date"
            value={journeyDate}
            onChange={(e) => setJourneyDate(e.target.value)}
          />

          <Input
            label="Coach"
            type="text"
            value={coach}
            onChange={(e) => setCoach(e.target.value)}
            placeholder="e.g. S5"
          />

          <Input
            label="Current Seat Number"
            type="number"
            value={currentSeat}
            onChange={(e) => setCurrentSeat(e.target.value)}
            placeholder="e.g. 42"
          />

          <Input
            label="Current Seat Type"
            type="text"
            value={currentSeatType}
            onChange={(e) => setCurrentSeatType(e.target.value)}
            placeholder="e.g. Lower"
          />

          <Input
            label="Desired Seat Number"
            type="number"
            value={desiredSeat}
            onChange={(e) => setDesiredSeat(e.target.value)}
            placeholder="e.g. 18"
          />

          <Input
            label="Desired Seat Type"
            type="text"
            value={desiredSeatType}
            onChange={(e) => setDesiredSeatType(e.target.value)}
            placeholder="e.g. Lower"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message for other passengers..."
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Button type="submit">
            Create Request
          </Button>

        </form>
      </div>
    </div>
  );
}

export default CreateRequest;