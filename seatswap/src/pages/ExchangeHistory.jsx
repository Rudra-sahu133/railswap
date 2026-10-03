import { useEffect, useState } from "react";
import api from "../services/api";

function ExchangeHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get("/requests/history");

        setHistory(response.data.requests);
      } catch (error) {
        console.log(
          error.response?.data || "Failed to fetch exchange history"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading exchange history...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Exchange History 📜
        </h1>

        <p className="text-gray-500 text-center mt-2 mb-8">
          View your completed seat exchanges
        </p>

        {history.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <p className="text-gray-500">
              No completed exchanges yet.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {history.map((request) => (
              <div
                key={request._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
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

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Completed
                  </span>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500">
                      Your Original Seat
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
                      Requested Seat
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
                      Original Request Message
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

export default ExchangeHistory;