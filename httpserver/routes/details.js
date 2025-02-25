const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const {Building,Rooms}=require("../db/db")




router.post("/search", async (req, res) => {
    try {
        const { type, name } = req.body; // type can be 'room' or 'building'
        if (!type || !name) {
            return res.status(400).json({ message: "building and roomname are required." });
        }
        console.log(type)

        if (type === "room") {
            // Search for a room by name and include the building it belongs to
            const room = await Rooms.findOne({
                where: { name: name },
                attributes: ["name", "event_name", "event_description", "availability"], // Include availability
                include: {
                    model: Building,
                    attributes: ["name"], // Fetch the building name
                }
            });

            if (!room) {
                return res.status(404).json({ message: "Room not found." });
            }

            return res.json({
                room_name: room.name,
                event_name: room.event_name,
                event_description: room.event_description,
                availability: room.availability, // Return availability
                building_name: room.Building ? room.Building.name : null
            });
        } 
        else if (type === "building") {
            // Search for a building by name and get all associated rooms
            const building = await Building.findOne({
                where: { name: name },
                attributes: ["name"],
                include: {
                    model: Rooms,
                    attributes: ["name", "event_name", "event_description", "availability"] // Include availability
                }
            });
            console.log(building)
            if (!building) {
                return res.status(404).json({ message: "Building not found." });
            }

            return res.json(building);
        } 
        else {
            return res.status(400).json({ message: "Invalid search type." });
        }
    } catch (error) {
        console.error("Search error:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});

router.get("/alldetails", async function(req, res) {
    try {
        // Fetch all buildings with their associated rooms
        const buildings = await Building.findAll({
            include: [{
                model: Rooms,
                as: 'Rooms' // This matches the association we defined
            }]
        });

        // Format the response
        const response = buildings.map(building => ({
            id: building.id,
            name: building.name,
            description: building.description,
            rooms: building.Rooms.map(room => ({
                id: room.id,
                name: room.name,
                event_name: room.event_name,
                event_description: room.event_description,
                availability: room.availability
            }))
        }));

        res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// ... existing code ...
module.exports = router;







module.exports=router


