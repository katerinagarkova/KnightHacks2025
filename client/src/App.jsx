import { useEffect, useState } from "react";
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

function calculateDistance(coord1, coord2) {
  const R = 3958.8; // Earth radius in miles
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in miles
}

function totalPathDistance(path) {
  let total = 0;
  for (let i = 1; i < path.length; i++) {
    total += calculateDistance(path[i - 1], path[i]);
  }
  return total;
}

function App() {
  const [showPhotos, setShowPhotos] = useState(true);
  const [showAssets, setShowAssets] = useState(true);
  const [showWaypoints, setShowWaypoints] = useState(true);
  const [showIntBoundaries, setShowIntBoundaries] = useState(true);
  const [showExtBoundaries, setShowExtBoundaries] = useState(true);
  const [totalMiles, setTotalMiles] = useState(0);

  const [photos, setPhotos] = useState([]);
  const [assets, setAssets] = useState([]);
  const [waypoints, setWaypoints] = useState([]);
  const [exterior, setExterior] = useState([]);
  const [interior, setInterior] = useState([]);
  const [paths, setPaths] = useState({"vehicles": []});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/waypoints");
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
      const res = await fetch("http://127.0.0.1:8000/api/paths");
      const rawData = await res.json();

      const data = typeof rawData === "string" ? JSON.parse(rawData) : rawData;

      // Reconfigure points array
      data.vehicles.forEach((vehicle) => {
        vehicle.route = vehicle.route.map(([lon, lat]) => [lat, lon]);
      });
      
      setPaths(data);

      // Calculate total miles
      const distance = totalPathDistance(allRoutes);
      setTotalMiles(distance);
    };

    fetchData();
  }, []);

  const allPoints = [...photos, ...assets, ...waypoints];
  const center = [26.7872632610507, -80.11286788653801];

  const downloadCSV = () => {
  if (!paths || paths.length === 0) return;
  const allCoords = paths.flatMap(v => v.route);
  const csvContent =
    "data:text/csv;charset=utf-8," +
    ["latitude,longitude", ...allCoords.map(c => c.join(","))].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "drone_path_coordinates.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

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
        <p style={{ fontSize: 20 }}>▶ Simulate drone inspection missions ◀</p>
      </header>
      <div
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
        }}
      >
        {/* Floating layer control */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1000,
            background: "rgba(255, 255, 255, 0.9)",
            padding: "10px 14px",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            fontSize: "14px",
            lineHeight: "1.6",
            textAlign: "left",
          }}
        >
          <strong style={{ display: "block", marginBottom: "4px" }}>
            Layers
          </strong>
          <label style={{ display: "block" }}>
            <input
              type="checkbox"
              checked={showPhotos}
              onChange={() => setShowPhotos(!showPhotos)}
            />{" "}
            <span style={{ color: "blue" }}>Photos</span>
          </label>
          <label style={{ display: "block" }}>
            <input
              type="checkbox"
              checked={showAssets}
              onChange={() => setShowAssets(!showAssets)}
            />{" "}
            <span style={{ color: "red" }}>Assets</span>
          </label>
          <label style={{ display: "block" }}>
            <input
              type="checkbox"
              checked={showWaypoints}
              onChange={() => setShowWaypoints(!showWaypoints)}
            />{" "}
            <span style={{ color: "purple" }}>Waypoints</span>
          </label>
          <label style={{ display: "block" }}>
            <input
              type="checkbox"
              checked={showExtBoundaries}
              onChange={() => setShowExtBoundaries(!showExtBoundaries)}
            />{" "}
            <span style={{ color: "orange" }}>Ext Boundaries</span>
          </label>
          <label style={{ display: "block" }}>
            <input
              type="checkbox"
              checked={showIntBoundaries}
              onChange={() => setShowIntBoundaries(!showIntBoundaries)}
            />{" "}
            <span style={{ color: "green" }}>Int Boundaries</span>
          </label>
        </div>

        {/* Map */}
        <MapContainer
          center={center}
          zoom={14}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
            attribution="© OpenStreetMap contributors"
          />

          {/* Boundaries */}
          {showExtBoundaries && exterior.length > 1 && (
            <Polyline positions={exterior} color="orange" weight={2} />
          )}
          {showIntBoundaries &&
            interior.map((segment, index) => (
              <Polyline
                key={index}
                positions={segment}
                color="green"
                weight={2}
              />
            ))}

          {/* Drone Path */}
          {paths.vehicles.map((vehicle, index) => (
            <Polyline
              key={index}
              positions={vehicle.route}
              color="black"
              weight={2}
            />
          ))}

          {/* Waypoints */}
          {showWaypoints &&
            waypoints.map((p, i) => (
              <CircleMarker
                key={`w-${i}`}
                center={p}
                radius={0.5}
                color="purple"
              >
                <Popup>
                  Waypoint #{i} <br></br> ({p}, {i})
                </Popup>
              </CircleMarker>
            ))}

          {/* Photos */}
          {showPhotos &&
            photos.map((p, i) => (
              <CircleMarker key={`p-${i}`} center={p} radius={0.5} color="blue">
                <Popup>
                  Photo #{i} <br></br> ({p}, {i})
                </Popup>
              </CircleMarker>
            ))}

          {/* Assets */}
          {showAssets &&
            assets.map((p, i) => (
              <CircleMarker key={`a-${i}`} center={p} radius={0.5} color="red">
                <Popup>
                  Asset #{i} <br></br> ({p}, {i})
                </Popup>
              </CircleMarker>
            ))}
        </MapContainer>
      </div>

      <div
  style={{
    background: "linear-gradient(90deg, #0097DA, #78C239)",
    textAlign: "center",
    marginTop: "10px",
    fontSize: "18px",
    color: "white",
    padding: "15px 0",
  }}
>
  <strong>Total Distance Traveled:</strong>{" "}
  {totalMiles.toFixed(2)} miles
  <br />
  <button
    onClick={downloadCSV}
    style={{
      marginTop: "8px",
      background: "#fff",
      color: "#0097DA",
      border: "none",
      padding: "8px 12px",
      borderRadius: "6px",
      fontWeight: "bold",
      cursor: "pointer",
    }}
  >
    Download Drone Path CSV
  </button>
</div>

    </div>
  );
}

export default App;
