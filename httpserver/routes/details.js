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
            return res.status(400).json({ message: "Type and name are required." });
        }

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



module.exports = router;







module.exports=router


