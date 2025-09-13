// import { AlertTriangle, CheckCircle } from "lucide-react"

// export default function AlertPanel({ stations, crowdLevels }) {
//   const crowdedStations = stations.filter((station) => (crowdLevels[station.id] || 0) > 70)

//   return (
//     <div className="h-full bg-card text-card-foreground shadow-sm border rounded-lg">
//       <div className="flex flex-col space-y-1.5 p-6">
//         <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2">
//           <AlertTriangle className="h-5 w-5" />
//           Crowd Alerts
//         </h3>
//       </div>
//       <div className="p-6 pt-0 space-y-3">
//         {crowdedStations.length === 0 ? (
//           <div className="relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground">
//             <CheckCircle className="h-4 w-4" />
//             <div className="text-sm [&_p]:leading-relaxed">All stations are operating normally. No crowd alerts.</div>
//           </div>
//         ) : (
//           crowdedStations.map((station) => (
//             <div
//               key={station.id}
//               className="relative w-full rounded-lg border border-destructive/50 p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-destructive-foreground text-destructive-foreground"
//             >
//               <AlertTriangle className="h-4 w-4" />
//               <div className="text-sm [&_p]:leading-relaxed">
//                 <strong>{station.name}</strong> is crowded ({crowdLevels[station.id]}% capacity)
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   )
// }

import { AlertTriangle, CheckCircle } from "lucide-react";

export default function AlertPanel({ stations = [], crowdLevels = {} }) {
  const crowdedStations = stations.filter(
    (station) => (crowdLevels[station.id] || 0) > 70
  );

  return (
    <div className="h-full bg-card text-card-foreground shadow-sm border rounded-lg">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Crowd Alerts
        </h3>
      </div>
      <div className="p-6 pt-0 space-y-3">
        {crowdedStations.length === 0 ? (
          <div className="relative w-full rounded-lg border p-4">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <div className="text-sm">All stations are operating normally. No crowd alerts.</div>
          </div>
        ) : (
          crowdedStations.map((station) => (
            <div
              key={station.id}
              className="relative w-full rounded-lg border border-red-400 p-4 text-red-600"
            >
              <AlertTriangle className="h-4 w-4" />
              <div className="text-sm">
                <strong>{station.name}</strong> is crowded ({crowdLevels[station.id]}% capacity)
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
