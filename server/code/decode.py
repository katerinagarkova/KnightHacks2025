import numpy as np # pip install numpy

predecessors = np.load("predecessors.npy", mmap_mode='r')

print(predecessors)

def get_path(i, j, predecessors):
    path = [j]
    while predecessors[i, path[-1]] != -9999:  # -9999 means “no predecessor”
        j = predecessors[i, path[-1]]
        path.append(int(j))
    path.reverse()
    return path

# max is 3543 if photos and waypoints other than poles
source = 0
target = 3543
shortest = get_path(source, target, predecessors)
print(f"Shortest path from {source} to {target}: {shortest}")

points_lat_long = np.load("points_lat_long.npy", mmap_mode='r')

for element in shortest:
    print(points_lat_long[element])

