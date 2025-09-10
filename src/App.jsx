import { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Planner from "./pages/Planner";
import Simulation from "./pages/Simulation";
import Stabling from "./pages/Stabling";
import Audit from "./pages/Audit";

export default function App(){
  const [page, setPage] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar page={page} setPage={setPage} />
      <div className="container mx-auto p-6">
        {page === 'dashboard' && <Dashboard />}
        {page === 'planner' && <Planner />}
        {page === 'simulation' && <Simulation />}
        {page === 'stabling' && <Stabling />}
        {page === 'audit' && <Audit />}
      </div>
    </div>
  );
}
