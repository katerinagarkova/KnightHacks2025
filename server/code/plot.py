import numpy as np # pip install numpy
from shapely import wkt # pip install shapely

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
print(assets_index)

photo_indexes = np.load("photo_indexes.npy", mmap_mode='r')

print("photo_indexes.npy:")
print(photo_indexes)

with open('polygon_lon_lat.wkt', 'r') as f:
    wkt_string = f.read()

region = wkt.loads(wkt_string)

print(region.area)
print(region.centroid)
