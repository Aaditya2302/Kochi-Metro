import React from "react";
import { BookOpen } from "lucide-react";

export default function Navbar({ page, setPage }){
  const nav = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'planner', label: 'Induction Planner' },
    { id: 'simulation', label: 'Simulation' },
    { id: 'stabling', label: 'Stabling Map' },
    { id: 'audit', label: 'Audit & Alerts' }
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <BookOpen className="text-indigo-600" />
          <h1 className="font-semibold text-lg">SKM AI</h1>
        </div>
        <nav className="text-gray-600">
          <ul className="flex gap-6">
            {nav.map(n => (
              <li key={n.id}>
                <button
                  className={`text-sm ${page===n.id ? 'text-indigo-600 font-medium' : 'hover:text-indigo-600'}`}
                  onClick={() => setPage(n.id)}
                >
                  {n.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
