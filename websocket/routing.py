from distance_matrix import DistanceMatrix 
from path_finding_alg import PathFind
from sqlalchemy.orm import sessionmaker
from database import Node ,engine 

##creating a db session
Session = sessionmaker(bind = engine )
session = Session()

##perform routing  
class Routing : 
    dist_mat_onj = DistanceMatrix(max_dist = 10)
    pathfind_obj = PathFind()

    @classmethod
    def route(cls):
        nodes = session.query(Node).all()
        dist_mat = cls.dist_mat_onj.form_distance_matrix(nodes = nodes)
        cls.pathfind_obj.find_shortes_path( nodes = nodes ,distance_matrix = dist_mat )
        return 

if __name__ == "__main__": 
    inp = input( "start performing routing(y/n) : ")
    if inp == "y" : 
        try:
            Routing.route( ) 
            print("routing succesfull")         
        except Exception as e:
            print(f"router : error occurred: {e}")


    


        






