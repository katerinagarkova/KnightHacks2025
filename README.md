# Knight Hacks 2025 - NextEra Energy Challenge 🍃

[![Python](https://img.shields.io/badge/Python-3.10+-blue?logo=python)](https://www.python.org/)
[![React](https://img.shields.io/badge/Frontend-React-61dafb?logo=react&logoColor=white)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
---
## Summary
This project simulates inspection missions where a drone must visit a series of geo-located waypoints using the shortesst path while respecting battery constraints and returning to the launch site between missions.

This system integrates:
- 🧮 Optimization algorithms (shortest paths, distance matrices)
- 🗺️ Geospatial visualization (React + Leaflet)
- ⚙️ API-driven architecture (FastAPI backend)

Together, these components model realistic flight planning within a restricted area and integrates both backend computation and an interactive map-based frontend.

## Project Setup 🧠
Our team was given several files to start including:
- Geo-referenced waypoints that including asset poles and photo locations.
- Precomputed shortest-path distances between all valid waypoints.
- Helper arrays for decoding optimal paths and mapping indices to coordinates.

### File Details
Layer | File | Contents | Role
| :------------: | :------: | :---------: | :------: |
🌍 Map boundary | polygon_lon_lat.wkt | Coordinates of flight area | Defines where the drone can fly
📍 Waypoints | points_lat_long.npy | GPS coordinates (lon, lat) | Full list of points (assets + photo points + others)
📡 Distances | distance_matrix.npy | NxN table of distances | Cost of flying between any two waypoints
🧩 Paths | predecessors.npy | NxN table of “who comes before who” | Used to rebuild full shortest routes
⚡ Assets | asset_indexes.npy | Range of indices for electrical poles | Marks which waypoints are poles
📸 Photos | photo_indexes.npy | Range of indices for photo locations | Marks which waypoints are photo angles around poles

## Project Deliverables: 📝
We implemented:
- Scripts to decode routes, manage partitions, and visualize constraint handling
- Backend logic (Python/FastAPI) to load and serve geospatial data
- Frontend visualization (React + Leaflet) to display flight paths and points interactively

### File Details
File | Role
| :---------: | :-------------: |
🔐 decode.py | Reconstructs full paths from the predecessor matrix
📊 plot.py | Generates plots and visual diagnostics of flight coverage
📌 points.py | Loads waypoint data to frontend
🚧 boundaries.py | Handles flight boundary polygons and spatial constraint checks
🌐 app.jsx | Frontend interface — displays map, paths, and categorized points in real time

## Steps to Reproduce💻

### Running Backend:
 > recommended to use linux environment, such as ws12, but not required
1. Install python: ```sudo apt install python3```
2. Enter current directory in VS Code: ```code .```
3. Install python extensions for VS Code if needed
4. Set up a virtual environment by clicking ```View > Command Palette... > “Python: Create Environment > Venv```, then choose the location where python was installed
5. Open the Venv terminal in VS Code by going to the terminal tab on the top 
6. Download dependencies: ```pip install replace-with-dependency```
7. Run the backend: ```uvicorn server.main:app --reload```
8. The API will be available at ```http://127.0.0.1:8000```

### Running Frontend:
1. Open terminal and navigate to frontend directory (client folder): ```cd client```
2. Install dependencies: ```npm install```
3. Run development server: ```npm run dev```
4. The project will be displayed at ```http://localhost:5173```

## Output 🗺️
![Output](image.png)

✅ Displayed on Map:
- Purple Points: General waypoints
- Red Points: Electrical poles (assets)
- Blue Points: Photo capture locations
- Purple Lines: Flight paths between mission waypoints

## Authors:
[Katerina Garkova🐝](https://www.linkedin.com/in/katerina-garkova/) | [Alexander Peacock😼](https://www.linkedin.com/in/alexander-peacock/) | [Tal Avital🤠](https://www.linkedin.com/in/tal-avital-profile/) | [Maryam Chaudhry🫧](https://www.linkedin.com/in/chaudhrymaryam/)
