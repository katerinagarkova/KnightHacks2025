import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function App() {
  const [photos, setPhotos] = useState([]);
  const [assets, setAssets] = useState([]);
  const [waypoints, setWaypoints] = useState([]);
  const [exterior, setExterior] = useState([]);
  const [interior, setInterior] = useState([]);
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/points");
      const rawData = await res.json();

      // Parse JSON string from FastAPI
      const data = typeof rawData === "string" ? JSON.parse(rawData) : rawData;

      const { points, assets_partition, photo_partition } = data;

      const [photoStart, photoEnd] = photo_partition;
      const [assetStart, assetEnd] = assets_partition;

      // Reconfigure points array
      points.forEach((point) => {
        let temp = point[0];
        point[0] = point[1];
        point[1] = temp;
      });

      // Slice based on partitions
      const photosArr = points.slice(photoStart, photoEnd + 1);
      const assetsArr = points.slice(assetStart, assetEnd + 1);
      const waypointsArr = points.slice(photoEnd + 1, assetStart);

      setPhotos(photosArr);
      setAssets(assetsArr);
      setWaypoints(waypointsArr);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/boundaries");
      const rawData = await res.json();

      // Parse JSON string from FastAPI
      const data = typeof rawData === "string" ? JSON.parse(rawData) : rawData;

      const { exterior_coords, interior_coords } = data;

      setExterior(exterior_coords);
      setInterior(interior_coords);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/path");
      const rawData = await res.json();

      const data = typeof rawData === "string" ? JSON.parse(rawData) : rawData;

      console.log(data.vehicles)

      setPaths(data.vehicles);
    };

    fetchData();
  }, []);

  // Helper to compute map center
  const getCenter = (points) => {
    if (!points.length) return [0, 0];
    const avgLat = points.reduce((sum, p) => sum + p[0], 0) / points.length;
    const avgLng = points.reduce((sum, p) => sum + p[1], 0) / points.length;
    return [avgLat, avgLng];
  };

  const allPoints = [...photos, ...assets, ...waypoints];
  const center = getCenter(allPoints);

  return (
    <div
      style={{
        background: "linear-gradient(90deg, #0097DA, #78C239)",
        height: "100vh",
        width: "100%",
      }}
    >
      <header style={{ textAlign: "center", padding: "5px", color: "white" }}>
        <h1 style={{ fontSize: 50 }}>Drone Flight Path Simulator</h1>
        <p style={{ fontSize: 25 }}>▶ Simulate drone inspection missions ◀</p>
      </header>
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
          attribution="© OpenStreetMap contributors"
        />

        {/* Boundaries */}
        {exterior.length > 1 && (
          <Polyline positions={exterior} color="orange" weight={2} />
        )}
        {interior.map((segment, index) => (
          <Polyline key={index} positions={segment} color="green" weight={2} />
        ))}

        {/* Waypoints */}
        {waypoints.map((p, i) => (
          <CircleMarker key={`w-${i}`} center={p} radius={0.5} color="purple">
            <Popup>Waypoint #{i}</Popup>
          </CircleMarker>
        ))}

        {/* Photos */}
        {photos.map((p, i) => (
          <CircleMarker key={`p-${i}`} center={p} radius={0.5} color="blue">
            <Popup>Photo #{i}</Popup>
          </CircleMarker>
        ))}

        {/* Assets */}
        {assets.map((p, i) => (
          <CircleMarker key={`a-${i}`} center={p} radius={0.5} color="red">
            <Popup>Asset #{i}</Popup>
          </CircleMarker>
        ))}
      </MapContainer>
      <div
        style={{
          background: "linear-gradient(90deg, #0097DA, #78C239)",
          textAlign: "center",
          marginTop: "10px",
          fontSize: "18px",
        }}
      >
        <strong>Total Distance Traveled:</strong>{" "}
        {/*totalMiles.toFixed(2)} miles*/}
      </div>
    </div>
  );
}

export default App;
