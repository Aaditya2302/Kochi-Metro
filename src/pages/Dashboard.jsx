// import React from "react";
// import { Line, Pie } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';
// import KPIcard from "../components/KPIcard";
// import { KPIS, mileageData, allocationCounts } from "../data";
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

// export default function Dashboard(){
//   const lineData = {
//     labels: mileageData.map(d => d.name),
//     datasets: [{
//       label: 'Mileage (km)',
//       data: mileageData.map(d => d.mileage),
//       borderColor: '#6366f1',
//       backgroundColor: 'rgba(99,102,241,0.06)',
//       tension: 0.3,
//       pointRadius: 2
//     }]
//   };

//   const pieData = {
//     labels: ['Revenue','Standby','Maintenance'],
//     datasets: [{
//       data: [allocationCounts.revenue, allocationCounts.standby, allocationCounts.maintenance],
//       backgroundColor: ['#6366f1','#fbbf24','#10b981']
//     }]
//   };

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold">System Overview</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <KPIcard title="Fleet Availability" value={`${KPIS.fleetAvailability}%`} icon="🚆" />
//         <KPIcard title="Punctuality" value={`${KPIS.punctuality}%`} icon="⏱" />
//         <KPIcard title="Branding SLA" value={`${KPIS.brandingSLA}%`} icon="📊" />
//         <KPIcard title="Maintenance Cost" value={`₹${KPIS.maintenanceCost.toLocaleString()}`} icon="💰" />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-lg p-4 shadow">
//           <h3 className="font-semibold mb-3">Mileage Distribution</h3>
//           <Line data={lineData} />
//         </div>
//         <div className="bg-white rounded-lg p-4 shadow">
//           <h3 className="font-semibold mb-3">Train Allocation</h3>
//           <Pie data={pieData} />
//         </div>
//       </div>
//     </div>
//   );
// }

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

import KPIcard from "../components/KPIcard";
import MetroMap from "../components/metroMap";
import SimulationControls from "../components/simulationControl";
import TrainDashboard from "../components/trainDashboard";
import AlertPanel from "../components/alertPanel";
import { KPIS, mileageData, allocationCounts } from "../data";
import { generateCrowdLevels } from "../lib/running";

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
  const [stations, setStations] = useState([]);
  const [trains, setTrains] = useState([]);
  const [crowdLevels, setCrowdLevels] = useState({});
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const initialStations = [
      { id: 1, name: "Aluva", lat: 10.1076, lng: 76.3516 },
      { id: 2, name: "Pulinchodu", lat: 10.0934, lng: 76.3475 },
      { id: 3, name: "Companypady", lat: 10.0852, lng: 76.342 },
      { id: 4, name: "Edapally", lat: 10.0271, lng: 76.307 },
    ];
    setStations(initialStations);

    // Initialize trains at starting stations
    setTrains([
      { id: 1, name: "Train 1", currentStationId: 1, direction: "south", lat: 10.1076, lng: 76.3516 },
      { id: 2, name: "Train 2", currentStationId: 3, direction: "north", lat: 10.0852, lng: 76.342 },
    ]);
  }, []);

  // Simulation loop: smooth train movement
  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTrains((prevTrains) =>
        prevTrains.map((train) => {
          const currentIndex = stations.findIndex((s) => s.id === train.currentStationId);
          if (currentIndex === -1) return train;

          let nextIndex;
          if (train.direction === "south") {
            nextIndex = currentIndex + 1 >= stations.length ? 0 : currentIndex + 1;
          } else {
            nextIndex = currentIndex - 1 < 0 ? stations.length - 1 : currentIndex - 1;
          }

          const nextStation = stations[nextIndex];

          return {
            ...train,
            currentStationId: nextStation.id,
            lat: nextStation.lat,
            lng: nextStation.lng,
          };
        })
      );
      setCrowdLevels(generateCrowdLevels(stations));
    }, 2000);

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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">System Overview</h2>

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
              setTrains([
                { id: 1, name: "Train 1", currentStationId: 1, direction: "south", lat: 10.1076, lng: 76.3516 },
                { id: 2, name: "Train 2", currentStationId: 3, direction: "north", lat: 10.0852, lng: 76.342 },
              ]);
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
