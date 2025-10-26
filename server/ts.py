import numpy as np
import os

import ortools as ot
from ortools.constraint_solver import pywrapcp
from ortools.constraint_solver import routing_enums_pb2

# Opens the distance array file
BASE_DIR = os.path.dirname(__file__)
load_distance_array = np.load(os.path.join(BASE_DIR, "code", "distance_matrix.npy"), mmap_mode="r")

# Creates the data model by loading the distance array and adding the number
    # of vehicles and a "depot" (starting location)
def create_data_model():
    data = {}
    
    data["distance_matrix"] = load_distance_array
    data["num_vehicles"] = 2
    data["depot"] = 0 
    
    return data
data = create_data_model()

# Maps the locations to an internal ID to better represent the data for calculations
manager = pywrapcp.RoutingIndexManager(
    len(data["distance_matrix"]), data["num_vehicles"], data["depot"]
)

# Builds and solves the optimization problem; the heart of the program
routing = pywrapcp.RoutingModel(manager)

# Takes any pair of locations and returns the distance between them
def distance_callback(from_index, to_index):
    from_node = int(manager.IndexToNode(from_index))
    to_node = int(manager.IndexToNode(to_index))
    return int(data["distance_matrix"][from_node][to_node])

transit_callback_index = routing.RegisterTransitCallback(distance_callback)

# How we determine the cost of travel between two points. Currently,
    # it is simply calculated by the distance between the points
routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)
# You can also define multiple arc cost evaluators that depend on which vehicle is traveling between locations, using the method routing.SetArcCostEvaluatorOfVehicle(). For example, if the vehicles have different speeds, you could define the cost of travel between locations to be the distance divided by the vehicle's speed — in other words, the travel time.

# Tells the solver how to begin looking for a good route
# This one specifically is a greedy algorithm that does the following:
    # 1. Start at the depot (the starting location)
    # 2. Look at all possible next locations
    # 3. Choose the one with the smallest distance (or cost)
    # 4. Move there and repeat- always go to the nearest unvisited node
    # 5. Continue until every node has been visited and the route returns to the depot
search_parameters = pywrapcp.DefaultRoutingSearchParameters()
search_parameters.first_solution_strategy = (
    routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC
)

# Displays the solution returned by the solver
def print_solution(manager, routing, solution, filename=f"solution_for_{data.get('num_vehicles')}.txt"):
    with open(filename, "w") as f:
        f.write(f"Objective: {solution.ObjectiveValue()} miles\n")
        index = routing.Start(0)
        plan_output = "Route for vehicle 0:\n"
        route_distance = 0
        while not routing.IsEnd(index):
            plan_output += f" {manager.IndexToNode(index)} ->"
            previous_index = index
            index = solution.Value(routing.NextVar(index))
            route_distance += routing.GetArcCostForVehicle(previous_index, index, 0)
        plan_output += f" {manager.IndexToNode(index)} \n"
        plan_output += f"Route distance: {route_distance} miles\n"
        f.write(plan_output)

solution = routing.SolveWithParameters(search_parameters)
if solution:
    print_solution(manager, routing, solution)
    