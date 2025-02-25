from database import Node ,engine
from sqlalchemy.orm import sessionmaker
from geopy.distance import geodesic


##creating a db session
Session = sessionmaker(bind = engine )
session = Session()

##removes redundent root nodes  
class Remove_Redundent_RootNode :

    def __init__(self ,min_sep):
        self.min_sep = min_sep ##min seperation required to considere two nodes distinct 
    
    ##removes redundent nodes and updates remaining in the db  
    def remove_redundancy(self ,root_nodes):
        assert isinstance( root_nodes ,list) ,"root nodes must be a list"
        redundent_node_indx = [ ]
        
        ##finding reduntebt node 
        for i in range(len(root_nodes)-1):
            if i not in redundent_node_indx : 
                for j in range(i+1 ,len(root_nodes)):
                    if self.distance(root_nodes[i] ,root_nodes[j]) < self.min_sep :
                        redundent_node_indx.append(j)
        
        ##creating db instance for remaining nodes 
        select_node = [ ]
        for i in range(len(root_nodes)):
            if i not in redundent_node_indx:
                select_node.append( 
                    Node( 
                        lng = root_nodes[i]["lng"],
                        lat = root_nodes[i]["lat"],
                        ntype = "root", 
                        build_nme = "",
                        )
                    )
        
        ##updating it in the db  
        session.add_all(select_node)
        session.commit()
        return select_node

    def distance(self ,node1 ,node2):
        return geodesic( (node1["lat"], node1["lng"]), (node2["lat"], node2["lng"])).meters 




        