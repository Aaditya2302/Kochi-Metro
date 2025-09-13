import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Planner from "./pages/Planner";
import Simulation from "./pages/Simulation";
import Stabling from "./pages/Stabling";
import Audit from "./pages/Audit";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/stabling" element={<Stabling />} />
          <Route path="/audit" element={<Audit />} />
        </Routes>
      </div>
    </div>
  );
}
