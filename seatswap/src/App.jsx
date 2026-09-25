import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateRequest from "./pages/CreateRequest";
import Matches from "./pages/Matches";
import SearchRequests from "./pages/SearchRequests";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;