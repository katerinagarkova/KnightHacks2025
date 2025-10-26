import numpy as np # pip install numpy
from shapely import wkt # pip install shapely
import json

# Load the polygon
with open("code/polygon_lon_lat.wkt") as f:
    wktString = f.read()

polygon = wkt.loads(wktString)


interior_coords = []
for interior in polygon.interiors:
    x, y = interior.xy
    interior_segment = []
    for i in range(len(x)):
        interior_segment.append((y[i], x[i]))
    interior_coords.append(interior_segment)
    
exterior_x,exterior_y = polygon.exterior.xy

exterior_coords = []
for i in range(len(exterior_x)):
    exterior_coords.append((exterior_y[i], exterior_x[i]))
    
boundaries = {
    "exterior_coords": exterior_coords,
    "interior_coords": interior_coords
}

boundaries_json = json.dumps(boundaries)

def get_boundaries():
    global boundaries_json
    return boundaries_json