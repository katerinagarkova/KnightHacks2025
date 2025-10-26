import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Polyline} from "react-leaflet";
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

      // Reconfigure points array
      points.forEach((point) => {
        let temp = point[0]
        point[0] = point[1]
        point[1] = temp
      })

      // Slice based on partitions
      const photosArr = points.slice(photoStart, photoEnd + 1);
      const assetsArr = points.slice(assetStart, assetEnd + 1);
      const waypointsArr = points.slice(photoEnd + 1, assetStart);

      setPhotos(photosArr);
      setAssets(assetsArr);
      setWaypoints(waypointsArr);
    }

    fetchData()
  }, [])

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
    <div style={{ background: "linear-gradient(90deg, #0097DA, #78C239)", height: "100vh", width: "100%" }}>
      <header style={{ textAlign: "center", padding: "5px", color: "white" }}>
        <h1 style={{fontSize: 50}}>Drone Flight Path Simulator</h1>
        <p style={{fontSize: 25}}>▶ Simulate drone inspection missions ◀</p>
      </header>
      <MapContainer center={center} zoom={12} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
          attribution='© OpenStreetMap contributors'
        />

        {/* Waypoints */}
        {waypoints.map((p, i) => {
          console.log("Waypoint:", p);

            return (
              <CircleMarker key={`w-${i}`} center={p} radius={2} color="blue">
                <Popup>Waypoint #{i}</Popup>
              </CircleMarker>
          )
        })}
        {/* {waypoints.length > 1 && <Polyline positions={waypoints} color="blue" weight={2} />} */}

        {/* Photos */}
        {photos.map((p, i) => (
          <CircleMarker key={`p-${i}`} center={p} radius={2} color="green">
            <Popup>Photo #{i}</Popup>
          </CircleMarker>
        ))}
        {/* {photos.length > 1 && <Polyline positions={photos} color="green" weight={3} />} */}

        {/* Assets */}
        {assets.map((p, i) => (
          <CircleMarker key={`a-${i}`} center={p} radius={2} color="black">
            <Popup>Asset #{i}</Popup>
          </CircleMarker>
        ))}
        {/* {assets.length > 1 && <Polyline positions={assets} color="black" weight={3} />} */}
      </MapContainer>
      <div style={{ background: "linear-gradient(90deg, #0097DA, #78C239)", textAlign: "center", marginTop: "10px", fontSize: "18px"}}>
        <strong>Total Distance Traveled:</strong> {/*totalMiles.toFixed(2)} miles*/}
      </div>
    </div>
  );
}

export default App;