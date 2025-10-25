import React from "react";
import { Waypoint, Point } from "../types.ts";

interface MapGridProps {
  zoom: number;
  waypoints: Waypoint[];
  dronePos: Point;
  onAddWaypoint: (waypoint: Waypoint) => void;
}

const Map: React.FC<MapGridProps> = ({
  zoom,
  waypoints,
  dronePos,
  onAddWaypoint,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;
    onAddWaypoint({ id: Date.now() + x + y, x, y });
  };

  return (
    <div
      className="map-grid"
      onClick={handleClick}
      style={{ transform: `scale(${zoom})` }}
    >
      {/* Drone */}
      <div
        className="drone"
        style={{ left: `${dronePos.x}px`, top: `${dronePos.y}px` }}
      />

      {/* Waypoints */}
      {waypoints.map((wp) => (
        <div
          key={wp.id}
          className="waypoint"
          style={{ left: `${wp.x}px`, top: `${wp.y}px` }}
          title={`ID: ${wp.id}`}
        />
      ))}
    </div>
  );
};

export default Map;