import numpy as np # pip install numpy
from shapely import wkt # pip install shapely

# Load the polygon
with open("polygon_lon_lat.wkt") as f:
    wktString = f.read()

polygon = wkt.loads(wktString)

exterior_x,exterior_y = polygon.exterior.xy

interior_coords = []
for interior in polygon.interiors:
    x, y = interior.xy
    interior_coords.append(interior.xy)

