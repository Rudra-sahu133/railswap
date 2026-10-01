
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

  const [matchFound, setMatchFound] = useState(false);
  const [matchedRequest, setMatchedRequest] = useState(null);

  const [appealMessage, setAppealMessage] = useState("");
  const [appealSent, setAppealSent] = useState(false);

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

      if (response.data.matchedRequest) {
        setMatchFound(true);
        setMatchedRequest(response.data.matchedRequest);
      }
    } catch (error) {
      console.log(
        error.response?.data || "Request creation failed"
      );
    }
  };

  const handleSendAppeal = async () => {
    try {
      const response = await api.post("/appeals", {
        requestId: matchedRequest._id,
        message: appealMessage,
      });

      console.log(response.data);

      setAppealSent(true);
    } catch (error) {
      console.log(
        error.response?.data || "Failed to send appeal"
      );
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

        {matchFound && matchedRequest && (
          <div className="bg-green-100 border border-green-300 text-green-800 rounded-lg p-5 mb-6">

            <h2 className="font-bold text-lg">
              🎯 Match Found!
            </h2>

            <p className="mt-2">
              Another passenger has the seat you want.
            </p>

            <div className="mt-4 bg-white rounded-lg p-4">

              <p>
                <strong>Current Seat:</strong>{" "}
                {matchedRequest.currentSeat} (
                {matchedRequest.currentSeatType})
              </p>

              <p className="mt-2">
                <strong>Desired Seat:</strong>{" "}
                {matchedRequest.desiredSeat} (
                {matchedRequest.desiredSeatType})
              </p>

              <p className="mt-2">
                <strong>Coach:</strong>{" "}
                {matchedRequest.coach}
              </p>

            </div>

            {!appealSent ? (
              <div className="mt-4">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exchange Appeal
                </label>

                <textarea
                  value={appealMessage}
                  onChange={(e) =>
                    setAppealMessage(e.target.value)
                  }
                  placeholder="Write your exchange appeal..."
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={handleSendAppeal}
                  disabled={!appealMessage.trim()}
                  className="mt-3 bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 transition"
                >
                  Send Exchange Appeal
                </button>

              </div>
            ) : (
              <div className="mt-4 bg-green-50 border border-green-200 text-green-700 rounded-lg p-3">
                ✅ Exchange appeal sent successfully.
              </div>
            )}

          </div>
        )}

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

