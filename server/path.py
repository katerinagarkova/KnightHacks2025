import numpy as np

predecessors = np.load("code/predecessors.npy", mmap_mode='r')
coords = np.load("code/points_lat_long.npy", mmap_mode='r')
unfinished_path = np.load("solution_for_1.npy", allow_pickle=True).item()


def get_segment(i, j, predecessors):
    path = [j]
    while predecessors[i, path[-1]] != -9999:
        j = predecessors[i, path[-1]]
        path.append(int(j))
    path.reverse()
    return path

path = {"vehicles": []}
max_route_length = 0

for key, value in unfinished_path.items():
    if key.startswith("vehicle_"):
        route = value["route"]
        vehicle_path = []

        for i in range(1, len(route)):
            segment = get_segment(route[i - 1], route[i], predecessors)
            vehicle_path.extend(segment)

        distance = value.get("distance", 0)
        max_route_length = max(max_route_length, distance)

        path["vehicles"].append({
            "route": vehicle_path,
            "distance": distance
        })

pointslist = coords.tolist()
latlong = []
for element in vehicle_path:
    latlong.append(pointslist[element])

def get_path():
    global latlong
    return latlong