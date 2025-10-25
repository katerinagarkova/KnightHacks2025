import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function App() {
  const [count, setCount] = useState(0)
  const [photos, setPhotos] = useState([]);
  const [assets, setAssets] = useState([]);
  const [waypoints, setWaypoints] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/points")
      const rawData = await res.json()

      // Parse JSON string from FastAPI
      const data = typeof rawData === "string" ? JSON.parse(rawData) : rawData;

      const { points, assets_partition, photo_partition } = data;

      const [photoStart, photoEnd] = photo_partition;
      const [assetStart, assetEnd] = assets_partition;

      // Slice based on partitions
      const photosArr = points.slice(photoStart, photoEnd + 1);
      const assetsArr = points.slice(assetStart, assetEnd + 1);

      // Waypoints
      const waypointsArr = [
        ...points.slice(0, photoStart),
        ...points.slice(photoEnd + 1, assetStart),
        ...points.slice(assetEnd + 1),
      ];

      setPhotos(photosArr);
      setAssets(assetsArr);
      setWaypoints(waypointsArr);
    }

    fetchData()
  }, [])

        // const allWaypoints = data.map((element: any, index: number) => ({
      //   id: ${Date.now()}-${index}-${Math.random().toString(36).slice(2, 8)},
      //   x: element[0],
      //   y: element[1],
      // }));

      // setWaypoints(allWaypoints)

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
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer center={center} zoom={12} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© OpenStreetMap contributors'
        />

        {/* Waypoints in gray */}
        {waypoints.map((p, i) => {
          console.log("Waypoint:", p);
            return (
            <CircleMarker key={`w-${i}`} center={p} radius={4} color="gray">
              <Popup>Waypoint #{i}</Popup>
            </CircleMarker>
          )
        })}

        {/* Photos in blue */}
        {photos.map((p, i) => (
          <CircleMarker key={`p-${i}`} center={p} radius={5} color="blue">
            <Popup>Photo #{i}</Popup>
          </CircleMarker>
        ))}

        {/* Assets in red */}
        {assets.map((p, i) => (
          <CircleMarker key={`a-${i}`} center={p} radius={5} color="red">
            <Popup>Asset #{i}</Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;