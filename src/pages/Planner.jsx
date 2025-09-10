import React, { useState } from "react";
import { generateTrainsets } from "../data";
import Modal from "../components/Modal";

export default function Planner(){
  const [trainsets] = useState(generateTrainsets(25));
  const [planGenerated, setPlanGenerated] = useState(false);
  const [modal, setModal] = useState({ open:false, title:'', content:'' });

  function handleGenerate() {
    setPlanGenerated(true);
  }
  function handleExplain(t) {
    setModal({ open:true, title: `Explanation ${t.trainId}`, content: `Status: ${t.status}\nMileage:${t.mileage}\nReason: Balance mileage & branding`});
  }
  function handleOverride(t) {
    setModal({ open:true, title: `Override ${t.trainId}`, content: `Override options for ${t.trainId}`});
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Induction Planner</h2>
        <div className="flex gap-3">
          <button onClick={handleGenerate} className="px-4 py-2 bg-indigo-600 text-white rounded shadow">Generate Plan</button>
          <button disabled={!planGenerated} className="px-4 py-2 bg-gray-200 rounded">Approve Plan</button>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <table className="w-full text-left table-auto">
          <thead className="text-xs text-gray-500">
            <tr>
              <th className="p-2">Train ID</th>
              <th className="p-2">Status</th>
              <th className="p-2">Fitness Certificate</th>
              <th className="p-2">Job-card Status</th>
              <th className="p-2">Branding Priority</th>
              <th className="p-2">Mileage (km)</th>
              <th className="p-2">Cleaning Slot</th>
              <th className="p-2">Stabling Bay</th>
              <th className="p-2">Explain</th>
              <th className="p-2">Override</th>
            </tr>
          </thead>
          <tbody>
            {trainsets.map(t => (
              <tr key={t.trainId} className="border-t">
                <td className="p-2">{t.trainId}</td>
                <td className="p-2">{t.status}</td>
                <td className="p-2">{t.fitnessCertificate}</td>
                <td className="p-2">{t.jobCardStatus}</td>
                <td className="p-2">{t.brandingPriority}</td>
                <td className="p-2">{t.mileage}</td>
                <td className="p-2">{t.cleaningSlot}</td>
                <td className="p-2">{t.stablingBay}</td>
                <td className="p-2"><button className="text-indigo-600 underline" onClick={()=>handleExplain(t)}>Explain</button></td>
                <td className="p-2"><button className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={()=>handleOverride(t)}>Override</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={modal.open} title={modal.title} onClose={()=>setModal({open:false})}>
        <pre className="whitespace-pre-wrap text-sm">{modal.content}</pre>
      </Modal>
    </div>
  );
}
