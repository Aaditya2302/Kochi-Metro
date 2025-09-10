import React from "react";
import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';
import KPIcard from "../components/KPIcard";
import { KPIS, mileageData, allocationCounts } from "../data";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

export default function Dashboard(){
  const lineData = {
    labels: mileageData.map(d => d.name),
    datasets: [{
      label: 'Mileage (km)',
      data: mileageData.map(d => d.mileage),
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99,102,241,0.06)',
      tension: 0.3,
      pointRadius: 2
    }]
  };

  const pieData = {
    labels: ['Revenue','Standby','Maintenance'],
    datasets: [{
      data: [allocationCounts.revenue, allocationCounts.standby, allocationCounts.maintenance],
      backgroundColor: ['#6366f1','#fbbf24','#10b981']
    }]
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">System Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPIcard title="Fleet Availability" value={`${KPIS.fleetAvailability}%`} icon="🚆" />
        <KPIcard title="Punctuality" value={`${KPIS.punctuality}%`} icon="⏱" />
        <KPIcard title="Branding SLA" value={`${KPIS.brandingSLA}%`} icon="📊" />
        <KPIcard title="Maintenance Cost" value={`₹${KPIS.maintenanceCost.toLocaleString()}`} icon="💰" />
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
    </div>
  );
}
