from database import Route_tab ,Node ,engine
from sqlalchemy.orm import sessionmaker
from geopy.distance import geodesic
import json 


##creating a db session
Session = sessionmaker(bind = engine)
session = Session()

class UserService:

    def __init__(self):
        self.route_table = session.query(Route_tab).all()
        self.nodes = session.query(Node).all()

    def campus_map(self):
        json_resp = { "routes" : [ ] , "building" : [ ], "enterance" : [ ] }
        for nd in self.nodes :
            loc = {"lat" : float(nd.lat) ,"lng" : float(nd.lng) ,"name" : nd.build_nme}

            if nd.ntype == "root" : 
                json_resp["routes"].append(loc)
            
            elif nd.ntype == "build" : 
                json_resp["building"].append(loc)
            
            else : 
                json_resp["enterance"].append(loc)
        
        return json.dumps(json_resp)
    
    def shortes_path(self ,user_location ,destination_build_nme):
        close_node = self.__map_closest_node(user_location =  user_location)
        shortest_path = self.__find_route(src_nd = close_node ,dest_buildname = destination_build_nme )
        return json.dumps( [user_location] + shortest_path ) 
    
    def __map_closest_node(self ,user_location):
        closest_node = None  
        min_dist =  float("inf")

        for nd in self.nodes : 
            dist = self.distance( {"lat" : nd.lat ,"lng": nd.lng } ,user_location)
            if dist  < min_dist : 
                min_dist = dist
                closest_node = nd
        
        return closest_node 
    
    def __find_route(self ,src_nd ,dest_buildname):
        output = [ ]
        output.append( {"lng":float(src_nd.lng)  ,"lat" : float(src_nd.lat) } )
       
        nd = src_nd 
        while( nd is not None and (nd.ntype == "root" or nd.ntype == "entrance" or nd.build_nme != dest_buildname) ):
           nd = self.__find_row(nd.id ,dest_buildname)
           if nd is not None :
               output.append( {"lng":float(nd.lng)  ,"lat" : float(nd.lat) } )
        
        return output
    
    def __find_row(self ,node_id ,buildname):
        for row in self.route_table : 
            if row.node_id == node_id and row.build_nme == buildname :     
                for nd in self.nodes : 
                    if nd.id == row.next_hop_id:
                        return nd 
                
    def distance(self ,node1 ,node2):
        return geodesic( (node1["lat"], node1["lng"]), (node2["lat"], node2["lng"])).meters 







        


    


