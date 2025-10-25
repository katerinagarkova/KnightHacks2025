import numpy as np # pip install numpy
from shapely import wkt # pip install shapely
from scipy.sparse.csgraph import dijkstra
from scipy.sparse import csr_matrix

predecessors = np.load("predecessors.npy", mmap_mode='r')

def get_path(i, j, predecessors):
    path = [j]
    while predecessors[i, path[-1]] != -9999:  # -9999 means “no predecessor”
        j = predecessors[i, path[-1]]
        path.append(j)
    path.reverse()
    return path

source = 0
target = 1000
shortest = get_path(source, target, predecessors)
print(f"Shortest path from {source} to {target}: {shortest}")
