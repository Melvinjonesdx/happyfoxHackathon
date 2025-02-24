const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
// Update CORS middleware to use the allowed origins
app.use(cors({
    origin: '*'
}));

app.get("/api/college-map", async (req, res) => {

     data = {
        "buildings": [
          { "name": "bb cort", "lat": 13.009327, "lng": 80.003903 },
          { "name": "hostel", "lat": 13.007529, "lng": 80.003946}
        ],
        "roads": [
          { "name": "Library to Auditorium", "path": [
            [13.009307, 80.003904 ],
             [13.009244, 80.003908],
             [13.009186, 80.003910],
             [13.009004, 80.003904  ],
             [13.008887, 80.003909],
             [13.008577, 80.003917],
             [13.008444, 80.003920
          ],[13.008355, 80.003917
          ],[13.008287, 80.003922
          ],[13.008224, 80.003924
          ],[13.008163, 80.003928
          ],[13.008097, 80.003924
          ],[13.008054, 80.003930
          ],[13.007902, 80.003937
          ],[13.007720, 80.003935
          ],[13.007594, 80.003941
          ],[13.007534, 80.003941
          ],[13.007513, 80.003945
          ]] }
        ]
      }
       // Fetch from MongoDB
    res.json(data);
  });
  
  app.post("/api/send-location", function(req, res) {
    console.log("api")
    console.log(req.body.locations); // Log the received data
    res.status(200).json({ message: "Location received" }); // Send a JSON response back
  });
  app.post("/api/add-centre", function(req, res) {
    console.log("api")
    console.log(req.body); // Log the received data
    res.status(200).json({ message: "Location received" }); // Send a JSON response back
  });
  app.post("/api/add-entrance", function(req, res) {
    console.log("api")
    console.log(req.body); // Log the received data
    res.status(200).json({ message: "Location received" }); // Send a JSON response back
  });


const PORT = process.env.PORT || 5000;
app.listen(5000, "0.0.0.0", () => {
    console.log("Server running on port 5000");
  });
  


