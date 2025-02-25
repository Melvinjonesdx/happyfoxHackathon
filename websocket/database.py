from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String ,Numeric ,ForeignKey ,Float
from sqlalchemy.orm import declarative_base
from credentials import url

engine = create_engine(url)
Base = declarative_base()

##info about individual nodes
# ntype = ["build" ,"root" ,"entrance"] 
class Node(Base):
    __tablename__ = "node"
    id = Column(Integer, primary_key=True ,autoincrement=True)
    lng = Column(Numeric(10, 6) ,nullable = False)
    lat = Column(Numeric(10, 6) ,nullable = False)
    ntype = Column(String(25) )
    build_nme = Column(String(125))

##routing informations  
class Route_tab(Base):
    __tablename__ = "routing_table"
    id = Column(Integer, primary_key=True ,autoincrement=True)
    node_id = Column(Integer ,ForeignKey('node.id'))
    build_nme = Column(String(125))
    cost = Column(Float)
    next_hop_id = Column(Integer ,ForeignKey('node.id'))

if __name__ == "__main__": 
    inp = input( "Start_Creating_Tables(y/n) : ")
    if inp == "y" : 
        try:
            Base.metadata.create_all( engine )
            print( "Tables created succesfully")
        except Exception as e:
            print(f"db_creation : error occurred: {e}")

