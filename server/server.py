from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import waypoints

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"]
)

@app.get("/api/points")
def get_points():
    return points_partitions_json

@app.get("/api/path")
def get_path():
    return pathing
