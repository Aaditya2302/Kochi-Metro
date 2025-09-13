import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";

const getCrowdColor = (level) => {
  if (level < 40) return "#22c55e"; // Green
  if (level < 70) return "#eab308"; // Yellow
  return "#ef4444"; // Red
};

// Train SVG icon
const trainIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2563eb" width="24" height="24">
      <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2l2-2h4l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-9H6V6h12v2z"/>
    </svg>
  `),
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// Station SVG icon
const stationIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64=" +
    btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#dc2626" width="20" height="20">
      <circle cx="12" cy="12" r="8" fill="#dc2626"/>
      <circle cx="12" cy="12" r="4" fill="white"/>
    </svg>
  `),
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

export default function MetroMap({ stations, trains, crowdLevels }) {
  // Get train position from currentStationId
  const getTrainPosition = (train) => {
    const station = stations.find((s) => s.id === train.currentStationId);
    if (!station) return [0, 0];
    return [train.lat, train.lng];
  };

  return (
    <div className="h-full w-full">
      <MapContainer
        center={[10.0271, 76.307]}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Stations */}
        {stations.map((station) => (
          <div key={station.id}>
            <Marker position={[station.lat, station.lng]} icon={stationIcon}>
              <Popup>
                <div className="text-center">
                  <h3 className="font-semibold">{station.name}</h3>
                  <p className="text-sm text-gray-600">
                    Crowd Level: {crowdLevels[station.id] || 0}%
                  </p>
                </div>
              </Popup>
            </Marker>

            <Circle
              center={[station.lat, station.lng]}
              radius={200 + (crowdLevels[station.id] || 0) * 3}
              pathOptions={{
                color: getCrowdColor(crowdLevels[station.id] || 0),
                fillColor: getCrowdColor(crowdLevels[station.id] || 0),
                fillOpacity: 0.3,
                weight: 2,
              }}
            />
          </div>
        ))}

        {/* Trains */}
        {trains.map((train) => (
          <Marker
            key={train.id}
            position={getTrainPosition(train)}
            icon={trainIcon}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-semibold">{train.name}</h3>
                <p className="text-sm text-gray-600">
                  Direction: {train.direction}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
