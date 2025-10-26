import numpy as np
import json

points = np.load("code/points_lat_long.npy")

asset_partition = np.load("code/asset_indexes.npy")
photo_partition = np.load("code/photo_indexes.npy")

print(f"{asset_partition}\n{photo_partition}\n[{photo_partition[1] + 1} {asset_partition[0]}]\n{len(points)}")

points_partitions = {
    "points": points.tolist(),
    "assets_partition": asset_partition.tolist(),
    "photo_partition": photo_partition.tolist()
}

points_partitions_json = json.dumps(points_partitions)

def get_points():
    global points_partitions_json
    return points_partitions_json

with open("one_drone.txt", 'r') as file:
    lines = file.readlines()
    if len(lines) >= 3:
        pathway = lines[2].strip()

pathing = pathway.split(' -> ') # Splits by comma

def get_path():
    return pathing