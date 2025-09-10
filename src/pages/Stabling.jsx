import React, { useEffect, useState } from "react";
import TrainBay from "../components/TrainBay";

export default function Stabling() {
  const totalBays = 20;
  const [positions, setPositions] = useState({});
  const [initial, setInitial] = useState({});
  const [cost, setCost] = useState(0);

  useEffect(() => {
    const pos = {};
    for (let i = 1; i <= totalBays; i++) pos[i] = i <= 5 ? `Train-${i}` : null;
    setPositions(pos);
    setInitial({ ...pos });
  }, []);

  useEffect(() => {
    let c = 0;
    for (let b in positions)
      if (positions[b] && positions[b] !== initial[b]) c++;
    setCost(c);
  }, [positions, initial]);

  function onDragStart(e, trainId) {
    e.dataTransfer.setData("text/plain", trainId);
  }

  function onDrop(e, bay) {
    e.preventDefault();
    const trainId = e.dataTransfer.getData("text/plain");
    if (!trainId) return;
    // remove from old bay
    const newPos = { ...positions };
    for (let b in newPos) if (newPos[b] === trainId) newPos[b] = null;
    newPos[bay] = trainId;
    setPositions(newPos);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Depot Stabling Map</h2>
      <div className="bg-white p-4 rounded shadow mb-4">
        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: totalBays }, (_, i) => {
            const bay = i + 1;
            return (
              <div
                key={bay}
                className="relative border rounded-xl p-2 h-28 flex items-center justify-center bg-gray-50"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => onDrop(e, bay)}
              >
                <div className="absolute top-1 left-2 text-xs text-gray-400">
                  Bay {bay}
                </div>
                {positions[bay] ? (
                  <div
                    draggable
                    onDragStart={(e) => onDragStart(e, positions[bay])}
                    className="cursor-grab"
                  >
                    <TrainBay trainId={positions[bay]} />
                  </div>
                ) : (
                  <div className="text-gray-400 italic">Empty</div>
                )}
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-gray-700">
          Drag train icons to reposition.{" "}
          <strong>Extra shunting cost: {cost} minutes</strong>
        </p>
      </div>
    </div>
  );
}
