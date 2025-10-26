# Knight Hacks 2025 NextEra Energy Challenge

## Summary
Simulates inspection missions with drone that visit every required waypoint while respecting battery constraints and returning to the launch site between missions.

## What we were given:
- Geo-referenced waypoints that include both asset poles and photo locations.
- Precomputed shortest-path distances between waypoints inside the allowed flight zone.
- Helper arrays for decoding paths and mapping indices to coordinates.

Layer | File | What it contains | Role
| :--------: | :------: | :---------: | :------: |
🌍 Map boundary | polygon_lon_lat.wkt | Allowed flight area | Defines where the drone can fly
📍 Waypoints | points_lat_long.npy | GPS coordinates (lon, lat) | The list of all points (assets + photo points + others)
📡 Distances | distance_matrix.npy | NxN table of distances | Cost of flying between any two waypoints
🧩 Paths | predecessors.npy | NxN table of “who comes before who” | Used to rebuild full shortest routes
⚡ Assets | asset_indexes.npy | Range of indices for electrical poles | Marks which waypoints are poles
📸 Photos | photo_indexes.npy | Range of indices for photo locations | Marks which waypoints are photo angles around poles

## What we wrote:
- Working code (any language) that can reproduce your solution from the provided data.
- A presentation of your approach, assumptions, and analysis of results.
- Evidence of coverage and constraint handling (plots, tables, or metrics). Visual output is encouraged.

## Steps to Reproduce:

### Running Python:
(linux environment, such as ws12, reccommended but not required)
1. Install python: ```sudo apt install python3```
2. In the command line you can use ```code .``` to enter  the current directory in VS Code
3. Install python extensions for VS Code
4. Set up a virtual environment by going clicking ```View > Command Palette... > “Python: Create Environment > Venv```, then choose the location where python was installed
- Go to the terminal tab on the top to open the venv terminal in vscode
- From there, for any dependencies can do “pip install replace-with-dependency”

### Running Frontend:
open command line > npm run dev

## Authors:
Katerina Garkova🐝
Alexander Peacock
Tal Avital
Maryam Chaudhry
