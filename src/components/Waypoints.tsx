import React from "react";
import { Waypoint, Point } from "../types";

interface WaypointsProps {
  waypoints: Waypoint[];
  onUpdate: (id: number, newPoint: Point) => void;
  onDelete: (id: number) => void;
}

const Waypoints: React.FC<WaypointsProps> = ({
  waypoints,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className="waypoint-list">
      {waypoints.map((wp) => (
        <div key={wp.id} className="waypoint-item">
          <span>
            X: {wp.x.toFixed(1)} | Y: {wp.y.toFixed(1)}
          </span>
          <button onClick={() => onDelete(wp.id)}>🗑</button>
        </div>
      ))}
    </div>
  );
};

export default Waypoints;