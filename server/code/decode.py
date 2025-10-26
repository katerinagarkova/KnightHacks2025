import numpy as np # pip install numpy
from shapely import wkt # pip install shapely
from scipy.sparse.csgraph import dijkstra
from scipy.sparse import csr_matrix
import plotly.graph_objects as go

predecessors = np.load("predecessors.npy", mmap_mode='r')

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


fig = go.Figure(go.Scattermap(
        lat=['38.91427','38.91538','38.91458',
             '38.92239','38.93222','38.90842',
             '38.91931','38.93260','38.91368',
             '38.88516','38.921894','38.93206',
             '38.91275'],
        lon=['-77.02827','-77.02013','-77.03155',
             '-77.04227','-77.02854','-77.02419',
             '-77.02518','-77.03304','-77.04509',
             '-76.99656','-77.042438','-77.02821',
             '-77.01239'],
        mode='markers',
        marker=go.scattermap.Marker(
            size=9
        )
    ))

fig.update_layout(
    autosize=True,
    hovermode='closest',
    map=dict(
        bearing=0,
        center=dict(
            lat=26.787,
            lon=-80.11
        ),
        pitch=0,
        zoom=12
    ),
)

fig.show()


