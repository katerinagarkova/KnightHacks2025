import numpy as np # pip install numpy
from shapely import wkt # pip install shapely
import json

# Load the polygon
with open("code/polygon_lon_lat.wkt") as f:
    wktString = f.read()

polygon = wkt.loads(wktString)

exterior_x,exterior_y = polygon.exterior.xy

interior_coords = []
for interior in polygon.interiors:
    x, y = interior.xy
    interior_coords.append(interior.xy)
    
print(exterior_x)

# boundaries = {
#     "exterior_x": exterior_x,
#     "exterior_y": exterior_y,
#     "interior_coords": interior_coords
# }

# boundaries_json = json.dumps(boundaries)

# print(boundaries_json)

# def get_points():
#     global boundaries_json
#     return boundaries_json