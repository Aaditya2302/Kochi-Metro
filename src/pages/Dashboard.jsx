import React, { useState, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import KPIcard from "../components/KPIcard.jsx";
import MetroMap from "../components/metroMap.jsx";
import SimulationControls from "../components/simulationControl.jsx";
import TrainDashboard from "../components/trainDashboard.jsx";
import AlertPanel from "../components/alertPanel.jsx";
import Complaint from "../components/complaint.jsx";


import { KPIS, mileageData, allocationCounts } from "../data";
import { generateCrowdLevels } from "../lib/running";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const navigate = useNavigate();
  const [stations, setStations] = useState([]);
  const [trains, setTrains] = useState([]);
  const [crowdLevels, setCrowdLevels] = useState({});
  const [running, setRunning] = useState(false);

  // Initialize stations + trains
  useEffect(() => {
    const initialStations = [
      { id: 1, name: "Aluva", lat: 10.1076, lng: 76.3516 },
      { id: 2, name: "Pulinchodu", lat: 10.0934, lng: 76.3475 },
      { id: 3, name: "Companypady", lat: 10.0852, lng: 76.342 },
      { id: 4, name: "Edapally", lat: 10.0271, lng: 76.307 },
      { id: 5, name: "M.G. Road", lat: 10.0196, lng: 76.311 },
      { id: 6, name: "Lissie", lat: 10.0215, lng: 76.318 },
      { id: 7, name: "High Court", lat: 10.024, lng: 76.324 },
    ];
    setStations(initialStations);

    setTrains([
      {
        id: 1,
        name: "Train 1",
        currentStationId: 1,
        direction: "south",
        progress: 0,
        lat: initialStations[0].lat,
        lng: initialStations[0].lng,
      },
      {
        id: 2,
        name: "Train 2",
        currentStationId: 4,
        direction: "north",
        progress: 0,
        lat: initialStations[3].lat,
        lng: initialStations[3].lng,
      },
    ]);
  }, []);

  // Smooth train movement
  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTrains((prevTrains) =>
        prevTrains.map((train) => {
          const currentIndex = stations.findIndex(
            (s) => s.id === train.currentStationId
          );
          if (currentIndex === -1) return train;

          let nextIndex;
          if (train.direction === "south") {
            nextIndex = currentIndex + 1 >= stations.length ? 0 : currentIndex + 1;
          } else {
            nextIndex = currentIndex - 1 < 0 ? stations.length - 1 : currentIndex - 1;
          }

          const currentStation = stations[currentIndex];
          const nextStation = stations[nextIndex];

          let progress = (train.progress || 0) + 0.02;
          if (progress >= 1) {
            progress = 0;
            train.currentStationId = nextStation.id;
          }

          const lat =
            currentStation.lat + (nextStation.lat - currentStation.lat) * progress;
          const lng =
            currentStation.lng + (nextStation.lng - currentStation.lng) * progress;

          return { ...train, lat, lng, progress };
        })
      );

      setCrowdLevels(generateCrowdLevels(stations));
    }, 100);

    return () => clearInterval(interval);
  }, [running, stations]);

  const lineData = {
    labels: mileageData.map((d) => d.name),
    datasets: [
      {
        label: "Mileage (km)",
        data: mileageData.map((d) => d.mileage),
        borderColor: "#6366f1",
        backgroundColor: "rgba(99,102,241,0.06)",
        tension: 0.3,
        pointRadius: 2,
      },
    ],
  };

  const pieData = {
    labels: ["Revenue", "Standby", "Maintenance"],
    datasets: [
      {
        data: [
          allocationCounts.revenue,
          allocationCounts.standby,
          allocationCounts.maintenance,
        ],
        backgroundColor: ["#6366f1", "#fbbf24", "#10b981"],
      },
    ],
  };

  return (
    <div className="space-y-6 relative p-4">
      <h2 className="text-2xl font-bold">System Overview</h2>

      <button
        className="absolute top-6 right-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        onClick={() => navigate("/complaint")}
      >
        Complaint Box
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPIcard title="Fleet Availability" value={`${KPIS.fleetAvailability}%`} icon="🚆" />
        <KPIcard title="Punctuality" value={`${KPIS.punctuality}%`} icon="⏱" />
        <KPIcard title="Branding SLA" value={`${KPIS.brandingSLA}%`} icon="📊" />
        <KPIcard
          title="Maintenance Cost"
          value={`₹${KPIS.maintenanceCost.toLocaleString()}`}
          icon="💰"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="font-semibold mb-3">Mileage Distribution</h3>
          <Line data={lineData} />
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="font-semibold mb-3">Train Allocation</h3>
          <Pie data={pieData} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg p-4 shadow">
          <h3 className="font-semibold mb-3">Kochi Metro Live Tracker</h3>
          <MetroMap trains={trains} stations={stations} crowdLevels={crowdLevels} />
        </div>

        <div className="flex flex-col gap-4">
          <SimulationControls
            isRunning={running}
            onToggle={() => setRunning(!running)}
            onReset={() => {
              const resetTrains = [
                {
                  id: 1,
                  name: "Train 1",
                  currentStationId: 1,
                  direction: "south",
                  progress: 0,
                  lat: stations[0]?.lat,
                  lng: stations[0]?.lng,
                },
                {
                  id: 2,
                  name: "Train 2",
                  currentStationId: 4,
                  direction: "north",
                  progress: 0,
                  lat: stations[3]?.lat,
                  lng: stations[3]?.lng,
                },
              ];
              setTrains(resetTrains);
              setCrowdLevels({});
              setRunning(false);
            }}
          />
          <TrainDashboard trains={trains} stations={stations} />
          <AlertPanel stations={stations} crowdLevels={crowdLevels} />
        </div>
      </div>
    </div>
  );
}
