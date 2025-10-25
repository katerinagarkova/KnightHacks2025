import numpy as np # pip install numpy
from shapely import wkt # pip install shapely
import geopandas as gpd
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon


load_distance_array = np.load("distance_matrix.npy", mmap_mode='r')

print("distance_matrix.npy:")
#print(load_distance_array)

#scipy ????
load_predecessors = np.load("predecessors.npy", mmap_mode='r')

print("predecessors.npy:")
#print(load_predecessors)

points_lat_long = np.load("points_lat_long.npy", mmap_mode='r')

print("points_lat_long.npy:")
#print(points_lat_long)

# lon, lat
#for element in points_lat_long:
    #print(element)

assets_index = np.load("asset_indexes.npy", mmap_mode='r')

print("asset_indexes.npy:")
print(assets_index[0])
print(assets_index[1])


photo_indexes = np.load("photo_indexes.npy", mmap_mode='r')

print("photo_indexes.npy:")
print(photo_indexes[0])
print(photo_indexes[1])

# Load the polygon
with open("polygon_lon_lat.wkt") as f:
    wktString = f.read()

polygon = wkt.loads(wktString)

exterior_x,exterior_y = polygon.exterior.xy

interior_coords = []
for interior in polygon.interiors:
    interior_coords.append(interior.xy)

fig, ax = plt.subplots()

    # Plot the exterior
ax.plot(exterior_x, exterior_y, color='red', linewidth=2, solid_capstyle='round', zorder=1)

    # Plot any interiors
for interior_x, interior_y in interior_coords:
    ax.plot(interior_x, interior_y, color='blue', linewidth=1, solid_capstyle='round', zorder=1)

    # Set title and labels 
ax.set_title('Polygon Zone')
ax.set_xlabel('Longitude')
ax.set_ylabel('Latitude')

    # Adjust plot limits for better visualization (optional)
ax.autoscale_view()
ax.set_aspect('equal', adjustable='box')

plt.show()



