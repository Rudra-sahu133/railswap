import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateRequest from "./pages/CreateRequest";
import Matches from "./pages/Matches";
import SearchRequests from "./pages/SearchRequests";
import ReceivedAppeals from "./pages/ReceivedAppeals";
import ExchangeHistory from "./pages/ExchangeHistory";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-request" element={<CreateRequest />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/search-requests" element={<SearchRequests />} />
        <Route path="/appeals" element={<ReceivedAppeals />} />
        <Route path="/history" element={<ExchangeHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;