import numpy as np
import json

points = np.load("code/points_lat_long.npy")

asset_partition = np.load("code/asset_indexes.npy")
photo_partition = np.load("code/photo_indexes.npy")

points_partitions = {
    "points": points.tolist(),
    "assets_partition": asset_partition.tolist(),
    "photo_partition": photo_partition.tolist()
}

points_partitions_json = json.dumps(points_partitions)

def get_waypoints():
    global points_partitions_json
    return points_partitions_json
