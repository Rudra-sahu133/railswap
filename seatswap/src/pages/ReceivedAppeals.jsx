import { useEffect, useState } from "react";
import api from "../services/api";

function ReceivedAppeals() {
  const [appeals, setAppeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppeals = async () => {
      try {
        const response = await api.get("/appeals/received");

        setAppeals(response.data.appeals);
      } catch (error) {
        console.log(error.response?.data || "Failed to fetch appeals");
      } finally {
        setLoading(false);
      }
    };

    fetchAppeals();
  }, []);

  const handleAccept = async (appealId) => {
    try {
      const response = await api.patch(`/appeals/${appealId}/accept`);

      console.log(response.data);

      setAppeals((prevAppeals) =>
        prevAppeals.map((appeal) =>
          appeal._id === appealId
            ? {
                ...appeal,
                status: "accepted",
              }
            : appeal,
        ),
      );
    } catch (error) {
      console.log(error.response?.data || "Failed to accept appeal");
    }
  };
  const handleReject = async (appealId) => {
    try {
      const response = await api.patch(`/appeals/${appealId}/reject`);

      console.log(response.data);

      setAppeals((prevAppeals) =>
        prevAppeals.map((appeal) =>
          appeal._id === appealId
            ? {
                ...appeal,
                status: "rejected",
              }
            : appeal,
        ),
      );
    } catch (error) {
      console.log(error.response?.data || "Failed to reject appeal");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading appeals...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Exchange Appeals 📩
        </h1>

        <p className="text-gray-500 text-center mt-2 mb-8">
          Review exchange requests from other passengers
        </p>

        {appeals.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-8 text-center">
            <p className="text-gray-500">No exchange appeals received yet.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {appeals.map((appeal) => (
              <div key={appeal._id} className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-xl font-bold text-gray-900">
                  📩 Exchange Appeal
                </h2>

                <div className="mt-4 space-y-2 text-gray-700">
                  <p>
                    <strong>From:</strong>{" "}
                    {appeal.fromUserId?.name ||
                      appeal.fromUserId?.email ||
                      "Passenger"}
                  </p>

                  <p>
                    <strong>Train:</strong> {appeal.requestId?.trainNumber}
                  </p>

                  <p>
                    <strong>Coach:</strong> {appeal.requestId?.coach}
                  </p>

                  <p>
                    <strong>Current Seat:</strong>{" "}
                    {appeal.requestId?.currentSeat} (
                    {appeal.requestId?.currentSeatType})
                  </p>

                  <p>
                    <strong>Desired Seat:</strong>{" "}
                    {appeal.requestId?.desiredSeat} (
                    {appeal.requestId?.desiredSeatType})
                  </p>
                </div>

                <div className="mt-5 bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Message
                  </p>

                  <p className="text-gray-800">{appeal.message}</p>
                </div>

                {appeal.status === "pending" && (
                  <div className="mt-5 flex gap-3">
                    <button
                      type="button"
                      onClick={() => handleAccept(appeal._id)}
                      className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                      Accept
                    </button>

                    <button
                      type="button"
                      onClick={() => handleReject(appeal._id)}
                      className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                    >
                      Reject
                    </button>
                  </div>
                )}

                {appeal.status === "accepted" && (
                  <div className="mt-5">
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Accepted
                    </span>
                  </div>
                )}

                {appeal.status === "rejected" && (
                  <div className="mt-5">
                    <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      Rejected
                    </span>
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

export default ReceivedAppeals;
