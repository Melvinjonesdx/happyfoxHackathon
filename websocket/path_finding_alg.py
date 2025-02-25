from database import Route_tab ,engine
from sqlalchemy.orm import sessionmaker
import heapq

##creating a db session
Session = sessionmaker(bind = engine )
session = Session()

class PathFind :

    def find_shortes_path(self ,nodes ,distance_matrix):
        assert isinstance(nodes ,list ) ,"nodes must be a list"
        assert len(distance_matrix[0]) == len(nodes) ,"number of node in the distance matrix and nodes are not matching"
        
        ##storing the b_node indices in a seperatae indices  
        b_node_indices = [ ]
        for i in range(len(nodes)): 
            if nodes[i].ntype == "build":
                b_node_indices.append(i)
        
        ##route table objects  
        route_tab_obj = [ ] 

        ##find shortest path from each node to buildings in the campus  
        for i in range(len(nodes)):
            
            dijkstra_output = self.__dijkstra(distance_matrix ,i) 
            route_info = self.__find_next_hop_and_cost(dijkstra_output ,b_node_indices)
            
            for b_indice ,cost ,next_hop_indice in zip(route_info["build"] ,route_info["cost"] ,route_info["next_hop"]):
                if next_hop_indice is not None:  # Avoid inserting invalid routes
                    
                    if nodes[i].id == nodes[next_hop_indice].id :
                        b_node = self.__get_building_node(nodes[i].build_nme ,nodes)
                        route_tab_obj.append(
                            Route_tab(
                            node_id=nodes[i].id,
                            build_nme=nodes[b_indice].build_nme,
                            cost=cost,
                            next_hop_id = b_node.id ,  # Only used if not None
                          )
                        )

                    else: 
                        route_tab_obj.append(
                            Route_tab(
                            node_id=nodes[i].id,
                            build_nme=nodes[b_indice].build_nme,
                            cost=cost,
                            next_hop_id=nodes[next_hop_indice].id,  # Only used if not None
                           )
                        )
        
        ##updating the db  
        session.add_all(route_tab_obj)
        session.commit()

    def __dijkstra(self ,matrix, src):
        """ Runs Dijkstra's algorithm and returns distances and parent nodes. """
        V = len(matrix)  # Number of vertices
        dist = {i: float('inf') for i in range(V)}
        parent = {i: None for i in range(V)}
        dist[src] = 0
        pq = [(0, src)]  # (cost, node)
        
        while pq:
            d, u = heapq.heappop(pq)
            if d > dist[u]:
                continue  # Ignore outdated distances
            for v in range(V):
                weight = matrix[u][v]
                if weight != float('inf') and dist[u] + weight < dist[v]:  # Found a shorter path
                    dist[v] = dist[u] + weight
                    parent[v] = u
                    heapq.heappush(pq, (dist[v], v))

        return {
        "vertex": list(range(V)),  # Indices 0 to V-1
        "cost": [dist[i] for i in range(V)],  # Cost from source to all nodes
        "parent": [parent[i] for i in range(V)]  # Parent index for each node
        }
    
    def __find_next_hop_and_cost(self ,dijkstra_output, b_node_indexs):
        """ Finds next hop and cost for specific nodes based on Dijkstra's output. """
        parent = dijkstra_output["parent"]
        cost = dijkstra_output["cost"]
        src = dijkstra_output["vertex"][0]  # Source node

        # Compute next_hop
        def find_next_hop(dest):
            if parent[dest] is None:
                return None  # No path
            hop = dest
            while parent[hop] is not None and parent[hop] != src:
                hop = parent[hop]
            return hop  # First hop from the source

        return {
            "build": b_node_indexs,
            "cost": [cost[i] for i in b_node_indexs],
            "next_hop": [find_next_hop(i) for i in b_node_indexs]
            }
    
    def __get_building_node(self ,build_nme ,nodes):
        for nd in nodes :
            if nd.build_nme == build_nme and nd.ntype == "build":
                return nd 

    
    

 


    





    