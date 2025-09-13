import React from "react";
import { Train } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const nav = [
    { path: "/", label: "Dashboard" },
    { path: "/planner", label: "Induction Planner" },
    { path: "/simulation", label: "Simulation" },
    { path: "/stabling", label: "Stabling Map" },
    { path: "/audit", label: "Audit & Alerts" },
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo / Title */}
        <div className="flex items-center gap-3">
          <Train className="text-indigo-600" />
          <h1 className="font-semibold text-lg">SKM AI</h1>
          <h1 className="font-semibold text-lg">Smart Kochi Metro AI</h1>
        </div>

        {/* Navigation */}
        <nav className="text-gray-600">
          <ul className="flex gap-6">
            {nav.map((n) => (
              <li key={n.path}>
                <NavLink
                  to={n.path}
                  className={({ isActive }) =>
                    `text-sm ${
                      isActive
                        ? "text-indigo-600 font-medium"
                        : "hover:text-indigo-600"
                    }`
                  }
                >
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
