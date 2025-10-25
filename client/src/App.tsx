import React, { useEffect, useState } from "react";
import Map from "./components/Map";
import WaypointList from "./components/Waypoints";
import Controls from "./components/Controls";
import { Waypoint, Point } from "./types";
import "./App.css";

import { load } from "npyjs"

const App: React.FC = () => {
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
  const [zoom, setZoom] = useState<number>(1);
  const [dronePos, setDronePos] = useState<Point>({ x: 100, y: 100 });

  const addWaypoint = (point: Point) => {
    const newWaypoint: Waypoint = { id: Date.now(), ...point };
    setWaypoints([...waypoints, newWaypoint]);
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
      const arr = await load("../data/points_lat_long.npy")
      console.log(arr) 
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