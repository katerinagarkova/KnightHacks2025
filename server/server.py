from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import waypoints
import boundaries
import paths

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"]
)

@app.get("/api/waypoints")
def get_waypoints():
    return waypoints.get_waypoints()

@app.get("/api/boundaries")
def get_boundaries():
    return boundaries.get_boundaries()

@app.get("/api/paths")
def get_paths():
    return paths.get_paths()
