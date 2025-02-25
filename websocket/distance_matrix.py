from geopy.distance import geodesic
from database import Node
import numpy as np 

class DistanceMatrix:

    def __init__(self ,max_dist):
        self.max_dist = max_dist #maximum allowed distance to consider two nodes connected
        self.build_entrance_sep = 1 

    def form_distance_matrix(self ,nodes):
        assert isinstance(nodes ,list) ,"nodes must be of type list"
        assert isinstance(nodes[0] ,Node) ,"provided nodes must of Node class"
        
        distance_matrix = self.__create_dist_mat( len(nodes) )
        
        for i in range(len(nodes)):
            for j in range(i+1 ,len(nodes)):

                if nodes[i].ntype == "build" : 
                    if nodes[j].ntype == "entrance":
                        if nodes[i].build_nme == nodes[j].build_nme : 
                            distance_matrix[i][j] = self.build_entrance_sep
                            distance_matrix[j][i] = self.build_entrance_sep 
                
                if nodes[i].ntype == "entrance" : 
                    if nodes[j].ntype == "entrance" :
                        if nodes[i].build_nme == nodes[j].build_nme : 
                            distance_matrix[i][j] = 0
                            distance_matrix[j][i] = 0

                if nodes[i].ntype == "root" :
                    if nodes[j].ntype == "entrance" or nodes[j].ntype == "root" : 
                        dist = self.distance( node1 = nodes[i] , node2 = nodes[j] )
                        distance_matrix[i][j] = dist
                        distance_matrix[j][i] = dist
        
        ##set the distanc[i][j] = float("inf") if dist > max_dist 
        distance_matrix = np.array(distance_matrix)
        distance_matrix[ distance_matrix > self.max_dist] = float("inf")
        return distance_matrix 

    def __create_dist_mat(self ,n):
        mat = [ ]
        for i in range(n):
            mat.append([])
            for j in range(n):
                mat[-1].append(float("inf"))
        return mat 
    

    def distance(self ,node1 ,node2):
        return geodesic( (node1.lat, node1.lng), (node2.lat, node2.lng)).meters 
 



