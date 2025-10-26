from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import points
import waypoints
import boundaries

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

@app.get("/api/path")
def get_points():
    return waypoints.get_path()

@app.get("/api/boundaries")
def get_boundaries():
    return boundaries.get_boundaries()
