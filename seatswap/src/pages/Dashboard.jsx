import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const getRequests = async () => {
      try {
        const response = await api.get("/requests");

        setRequests(response.data.requests);
      } catch (error) {
        console.log(
          error.response?.data || "Failed to fetch requests"
        );
      }
    };

    getRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-4xl mx-auto">

        <div className="mb-8 flex justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              My Exchange Requests 🚆
            </h1>

            <p className="text-gray-500 mt-2">
              View all your seat exchange requests
            </p>
          </div>

          <button
            onClick={() => navigate("/create-request")}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            + Create Request
          </button>
        </div>

        {requests.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <p className="text-gray-500">
              No exchange requests yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">

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
                      {new Date(
                        request.journeyDate
                      ).toLocaleDateString()}
                    </p>

                    <p className="text-gray-600">
                      Coach: {request.coach}
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold capitalize">
                    {request.status}
                  </span>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500">
                      Current Seat
                    </p>

                    <p className="text-lg font-semibold text-gray-900">
                      {request.currentSeat}
                    </p>

                    <p className="text-sm text-gray-600">
                      {request.currentSeatType}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500">
                      Desired Seat
                    </p>

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
                    <p className="text-sm text-gray-500">
                      Message
                    </p>

                    <p className="text-gray-700 mt-1">
                      {request.message}
                    </p>
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

export default Dashboard;