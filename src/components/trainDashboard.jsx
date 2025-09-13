import { Clock, MapPin } from "lucide-react";

export default function TrainDashboard({ trains, stations }) {
  const getStationName = (stationId) => {
    const station = stations.find((s) => s.id === stationId);
    return station?.name || "Unknown";
  };

  const getNextStation = (train) => {
    const currentIndex = stations.findIndex((s) => s.id === train.currentStationId);
    if (currentIndex === -1) return "Unknown";

    let nextIndex =
      train.direction === "south" ? currentIndex + 1 : currentIndex - 1;

    if (nextIndex >= stations.length) nextIndex = stations.length - 1;
    if (nextIndex < 0) nextIndex = 0;

    return stations[nextIndex]?.name || "End of Line";
  };

  const getETA = () => Math.floor(Math.random() * 6) + 2; // 2-7 min ETA

  return (
    <div className="h-full bg-card text-card-foreground shadow-sm border rounded-lg">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Train Positions
        </h3>
      </div>
      <div className="p-6 pt-0 space-y-4">
        {trains.map((train) => (
          <div key={train.id} className="border rounded-lg p-3 space-y-2 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{train.name}</h3>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  train.direction === "south"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {train.direction === "south" ? "↓ South" : "↑ North"}
              </span>
            </div>

            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Current: {getStationName(train.currentStationId)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>
                  Next: {getNextStation(train)} (ETA: {getETA()} min)
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
