from remove_redunt_node import Remove_Redundent_RootNode
from user_services import UserService
import websockets # type: ignore
import asyncio
import json


async def client_handler(websocket):
    print(f"Client connected: {websocket.remote_address}")
    
    try:
        service_req = await websocket.recv()
        ##__________________________________mapping service is requested by admin 
        if service_req == "mapping/admin":
            root_nodes = [ ]
            obj = Remove_Redundent_RootNode(min_sep = 5)

            async for message in websocket:
                if message == "over": 
                    selcted_nodes = obj.remove_redundancy(root_nodes)
                    await websocket.send("Process over")
                    print("route nodes is updated in db ")
                    break
                else:
                    root_nodes = root_nodes + json.loads(message)
        
        ##__________________________________routing service is request by the users   
        elif service_req == "user" :
            user_serve_obj = UserService()
            
            await websocket.send( user_serve_obj.campus_map() )
            
            async for message in websocket:  
                req = json.loads(message)
                
                await websocket.send( 
                    user_serve_obj.shortes_path( 
                        user_location = { "lat" : req["lat"] ,"lng" : req["lng"] },
                        destination_build_nme = req["building_name"]
                    )
                ) 

    except websockets.exceptions.ConnectionClosed:
        print(f"Client {websocket.remote_address} disconnected")


async def main():
    server = server = await websockets.serve(client_handler, "0.0.0.0", 8765) 
    print("WebSocket server started on ws://0.0.0.0:8765 (accessible from any machine)")
    await server.wait_closed()

if __name__ == "__main__":
    asyncio.run(main())
