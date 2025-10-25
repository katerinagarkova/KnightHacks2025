import React, { useState } from "react";
import { Point } from "../types";

interface ControlsProps {
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  onAddWaypoint: (point: Point) => void;
}

const Controls: React.FC<ControlsProps> = ({ zoom, setZoom, onAddWaypoint }) => {
  const [coords, setCoords] = useState<Point>({ x: 0, y: 0 });

  const handleAdd = () => {
    if (!isNaN(coords.x) && !isNaN(coords.y)) {
      onAddWaypoint({ x: coords.x, y: coords.y });
      setCoords({ x: 0, y: 0 });
    }
  };

  return (
    <div className="controls">
      <div className="zoom-controls">
        <button onClick={() => setZoom((z) => Math.min(z + 0.1, 2))}>
          Zoom In
        </button>
        <button onClick={() => setZoom((z) => Math.max(z - 0.1, 0.5))}>
          Zoom Out
        </button>
      </div>

      <div className="add-waypoint">
        <input
          type="number"
          placeholder="X"
          value={coords.x}
          onChange={(e) =>
            setCoords({ ...coords, x: parseFloat(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Y"
          value={coords.y}
          onChange={(e) =>
            setCoords({ ...coords, y: parseFloat(e.target.value) })
          }
        />
        <button onClick={handleAdd}>Add Waypoint</button>
      </div>
    </div>
  );
};

export default Controls;
