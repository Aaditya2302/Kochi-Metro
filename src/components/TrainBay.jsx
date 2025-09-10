import React from "react";
import { Train } from "lucide-react"; // ✅ lucide-react icon (install if not already)

export default function TrainBay({ trainId }) {
  return (
    <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition cursor-pointer">
      <Train className="w-4 h-4 text-indigo-600" />
      <div>
        <p className="text-sm font-semibold text-gray-800">{trainId}</p>
        <p className="text-xs text-gray-500">Running On Time</p>
      </div>
    </div>
  );
}
