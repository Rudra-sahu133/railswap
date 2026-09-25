import { useState } from "react";
import api from "../services/api";

function SearchRequests() {
  const [trainNumber, setTrainNumber] = useState("");
  const [journeyDate, setJourneyDate] = useState("");
  const [coach, setCoach] = useState("");
  const [requests, setRequests] = useState([]);
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await api.get("/requests/search", {
        params: {
          trainNumber,
          journeyDate,
          coach,
        },
      });

      setRequests(response.data.requests);
      console.log(response.data);
    } catch (error) {
      console.log(error.response?.data || "Failed to search requests");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">
          Search Exchange Requests
        </h1>

        <p className="text-gray-500 mt-2">
          Find passengers looking for seat exchanges
        </p>

        <form
          onSubmit={handleSearch}
          className="bg-white rounded-2xl shadow-sm p-6 mt-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Train Number
              </label>

              <input
                type="text"
                value={trainNumber}
                onChange={(e) => setTrainNumber(e.target.value)}
                placeholder="e.g. 12345"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Journey Date
              </label>

              <input
                type="date"
                value={journeyDate}
                onChange={(e) => setJourneyDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Coach
              </label>

              <input
                type="text"
                value={coach}
                onChange={(e) => setCoach(e.target.value)}
                placeholder="e.g. S5"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Search Requests
          </button>
        </form>
        {requests.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center mt-6">
            <p className="text-gray-500">No exchange requests found.</p>
          </div>
        ) : (
          <div className="space-y-4 mt-6">
            {requests.map((request) => (
              <div
                key={request._id}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Train {request.trainNumber}
                    </h2>

                    <p className="text-gray-600 mt-2">
                      Journey Date:{" "}
                      {new Date(request.journeyDate).toLocaleDateString()}
                    </p>

                    <p className="text-gray-600">Coach: {request.coach}</p>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                    {request.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Current Seat</p>

                    <p className="text-lg font-semibold text-gray-900">
                      {request.currentSeat}
                    </p>

                    <p className="text-sm text-gray-600">
                      {request.currentSeatType}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Desired Seat</p>

                    <p className="text-lg font-semibold text-gray-900">
                      {request.desiredSeat}
                    </p>

                    <p className="text-sm text-gray-600">
                      {request.desiredSeatType}
                    </p>
                  </div>
                </div>

                {request.message && (
                  <div className="mt-5 border-t pt-4">
                    <p className="text-sm text-gray-500">Message</p>

                    <p className="text-gray-700 mt-1">{request.message}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchRequests;
