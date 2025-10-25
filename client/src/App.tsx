import React, { useEffect, useState } from "react";
import Map from "./components/Map";
import WaypointList from "./components/Waypoints";
import Controls from "./components/Controls";
import { Waypoint, Point } from "./types";
import "./App.css";

const App: React.FC = () => {
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
  const [zoom, setZoom] = useState<number>(1);
  const [dronePos, setDronePos] = useState<Point>({ x: 100, y: 100 });

  const addWaypoint = (waypoint: Waypoint) => {
    const newWaypoint: Waypoint = { ...waypoint };
    setWaypoints(prev => [...prev, newWaypoint]);
  };

  const updateWaypoint = (id: number, newPoint: Point) => {
    setWaypoints(prev =>
      prev.map(wp => (wp.id === id ? { ...wp, ...newPoint } : wp))
    );
  };

  const deleteWaypoint = (id: number) => {
    setWaypoints(prev => prev.filter(wp => wp.id !== id));
  };

  const simulateFlight = async () => {
    for (const wp of waypoints) {
      setDronePos({ x: wp.x, y: wp.y });
      await new Promise(res => setTimeout(res, 500)); // 0.5s per step
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/points")
      const data = await res.json()

      const allWaypoints = data.map((element: any, index: number) => ({
        id: Date.now() + index + Math.floor(Math.random() * 1000),
        x: element[0],
        y: element[1],
      }));

      setWaypoints(allWaypoints)
    }
    
    fetchData()
  }, [])

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2>Waypoints</h2>
        <WaypointList
          waypoints={waypoints}
          onUpdate={updateWaypoint}
          onDelete={deleteWaypoint}
        />
        <button onClick={simulateFlight}>Simulate Flight</button>
      </div>
      <Map
        zoom={zoom}
        dronePos={dronePos}
        waypoints={waypoints}
        onAddWaypoint={addWaypoint}
      />

      <Controls zoom={zoom} setZoom={setZoom} onAddWaypoint={addWaypoint} />
    </div>
  );
};

export default App;