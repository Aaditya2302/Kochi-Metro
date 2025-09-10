import React, { useState, useEffect } from "react";
import { dummyAuditLogs, dummyAlerts } from "../data";

export default function Audit(){
  const [logs, setLogs] = useState(dummyAuditLogs);
  const [alerts, setAlerts] = useState(dummyAlerts);

  useEffect(()=>{
    const id = setInterval(()=>{
      if(Math.random()>0.85) {
        const a = { id: alerts.length+1, title:'New Alert', message:'Random system alert.', timestamp: new Date().toISOString() };
        setAlerts(prev => [a, ...prev]);
      }
    }, 10000);
    return ()=> clearInterval(id);
    // eslint-disable-next-line
  },[]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Audit Logs & Alerts</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Audit Logs</h3>
          <div className="space-y-3">
            {logs.map(l=>(
              <div key={l.id} className="p-3 border-l-4 border-red-200 bg-red-50 rounded">
                <div className="font-medium">{l.action}</div>
                <div className="text-xs text-gray-500">{new Date(l.timestamp).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Real-Time Alerts</h3>
          <div className="space-y-3">
            {alerts.map(a=>(
              <div key={a.id} className="p-3 border-l-4 border-red-500 bg-red-50 rounded">
                <div className="font-medium">{a.title}</div>
                <div className="text-sm">{a.message}</div>
                <div className="text-xs text-gray-500">{new Date(a.timestamp).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
