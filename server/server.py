from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import json

app = FastAPI()

points = np.load("server/code/points_lat_long.npy")

asset_partition = np.load("server/code/asset_indexes.npy")
photo_partition = np.load("server/code/photo_indexes.npy")

print(f"{asset_partition}\n{photo_partition}\n[{photo_partition[1] + 1} {asset_partition[0]}]\n{len(points)}")



points_partitions = {
    "points": points.tolist(),
    "assets_partition": asset_partition.tolist(),
    "photo_partition": photo_partition.tolist()
}

points_partitions_json = json.dumps(points_partitions)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"]
)

@app.get("/api/points")
def get_points():
    return points_partitions_json