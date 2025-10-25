from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import numpy as np

app = FastAPI()

points = np.load("code/points_lat_long.npy")

asset_partition = np.load("code/asset_indexes.npy")
photo_partition = np.load("code/photo_indexes.npy")

print(f"{asset_partition}\n{photo_partition}\n[{photo_partition[1] + 1} {asset_partition[0]}]\n{len(points)}")

photos = points[photo_partition[0]: photo_partition[1]]
waypoints = points[photo_partition[1]: asset_partition[0]]
assets = points[asset_partition[0]: asset_partition[1]]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"]
)

@app.get("/api/points")
def get_points():
    arr = np.load("code/points_lat_long.npy")
    return arr.tolist()

@app.get("/api/assets")
def get_assets():
    arr = np.load("code/asset_indexes.npy")
    print(arr)
    return arr.tolist()