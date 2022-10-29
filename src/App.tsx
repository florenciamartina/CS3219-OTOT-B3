import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DivelogPage from "./pages/DivelogPage";
import HomePage from "./pages/HomePage";
import NUSModsPage from "./pages/NUSModsPage";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const loggedInRoutes = (
    <Routes>
      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/divelog" element={<DivelogPage />} />
      <Route path="/nusmods" element={<NUSModsPage />} />
      <Route path="*" element={<Navigate replace to="/divelog" />} />
    </Routes>
  );

  return (
    <div className="App" style={{ minHeight: "100vh" }}>
      <Router>
        <Navbar />
        {loggedInRoutes}
      </Router>
    </div>
  );
}

export default App;
