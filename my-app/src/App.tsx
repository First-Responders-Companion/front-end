import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MissingComplaintsPage from "./pages/MissingComplaintsPage";
import AddMissingComplaintPage from "./pages/AddMissingComplaintPage";
import MissingComplaintDetailsPage from "./pages/MissingComplaintDetailsPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<div></div>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
      {/* secured routes */}
      <Routes>
        <Route path="/missing-complaints">
          <Route path="" element={<MissingComplaintsPage />} />
          <Route path="new" element={<AddMissingComplaintPage />} />
          <Route path=":id" element={<MissingComplaintDetailsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
