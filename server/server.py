from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

<<<<<<< HEAD
import waypoints
=======
import server.points as points
>>>>>>> 2a18d7f04dc021054a543408b4f41a7665e189f0

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"]
)

@app.get("/api/points")
def get_points():
<<<<<<< HEAD
    return points_partitions_json

@app.get("/api/path")
def get_path():
    return pathing
=======
    return points.get_points()
>>>>>>> 2a18d7f04dc021054a543408b4f41a7665e189f0
