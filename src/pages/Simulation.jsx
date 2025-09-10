import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// ✅ Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Simulation() {
  const [params, setParams] = useState({
    cleaningSlots: 10,
    targetMileage: 750,
    brandingWeight: 1,
    status: "Standby",
  });
  const [results, setResults] = useState([]);

  function runSim() {
    const out = Array.from({ length: 5 }, (_, i) => ({
      scenario: `Scenario ${i + 1}`,
      revenue: Math.floor(Math.random() * 20 + 15),
      standby: Math.floor(Math.random() * 6 + 4),
      ibl: Math.floor(Math.random() * 4 + 1),
    }));
    setResults(out);
  }

  const chartData = {
    labels: results.map((r) => r.scenario),
    datasets: [
      {
        label: "Revenue",
        data: results.map((r) => r.revenue),
        backgroundColor: "#6366f1",
      },
      {
        label: "Standby",
        data: results.map((r) => r.standby),
        backgroundColor: "#fbbf24",
      },
      {
        label: "IBL",
        data: results.map((r) => r.ibl),
        backgroundColor: "#10b981",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Simulation Results" },
    },
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">What-If Simulation</h2>

      {/* Parameters Control */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm">
              Cleaning Slots: {params.cleaningSlots}
            </label>
            <input
              type="range"
              min="5"
              max="15"
              value={params.cleaningSlots}
              onChange={(e) =>
                setParams((p) => ({
                  ...p,
                  cleaningSlots: Number(e.target.value),
                }))
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm">
              Target Mileage: {params.targetMileage}
            </label>
            <input
              type="range"
              min="500"
              max="1000"
              value={params.targetMileage}
              onChange={(e) =>
                setParams((p) => ({
                  ...p,
                  targetMileage: Number(e.target.value),
                }))
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm">
              Branding Weight: {params.brandingWeight}
            </label>
            <input
              type="range"
              min="0.1"
              max="2.0"
              step="0.1"
              value={params.brandingWeight}
              onChange={(e) =>
                setParams((p) => ({
                  ...p,
                  brandingWeight: Number(e.target.value),
                }))
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm">Default Status</label>
            <select
              value={params.status}
              onChange={(e) =>
                setParams((p) => ({ ...p, status: e.target.value }))
              }
              className="w-full border p-2 rounded"
            >
              <option>Revenue</option>
              <option>Standby</option>
              <option>IBL</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={runSim}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Run Simulation
          </button>
        </div>
      </div>

      {/* Results Table + Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Simulation Results</h3>
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left text-sm">
            <thead className="text-gray-500">
              <tr>
                <th className="p-2">Scenario</th>
                <th className="p-2">Revenue</th>
                <th className="p-2">Standby</th>
                <th className="p-2">IBL</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.scenario} className="border-t">
                  <td className="p-2">{r.scenario}</td>
                  <td className="p-2">{r.revenue}</td>
                  <td className="p-2">{r.standby}</td>
                  <td className="p-2">{r.ibl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {results.length > 0 && (
          <div className="mt-6">
            <Bar data={chartData} options={chartOptions} />
          </div>
        )}
      </div>
    </div>
  );
}
