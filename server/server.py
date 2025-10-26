from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import points
import waypoints
import boundaries
import path

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"]
)

@app.get("/api/points")
def get_points():
    return points.get_points()

@app.get("/api/waypoints")
def get_waypoints():
    return waypoints.get_waypoints()

@app.get("/api/boundaries")
def get_boundaries():
    return boundaries.get_boundaries()

@app.get("/api/dronePath")
def get_path():
    return path.get_path()
