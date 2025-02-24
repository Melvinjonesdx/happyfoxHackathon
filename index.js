const express = require('express');
const cors = require('cors');
const app = express();

// Update CORS middleware to use the allowed origins
app.use(cors({
    origin: '*'
}));

app.get("/api/college-map", async (req, res) => {
    console.log("hii")
     data = {
        "buildings": [
          { "name": "Library", "lat": 12.9750, "lng": 77.5940 },
          { "name": "Cafeteria", "lat": 12.9690, "lng": 77.5945 }
        ],
        "roads": [
          { "name": "Library to Auditorium", "path": [[12.9750, 77.5940], [12.9725, 77.5905]] }
        ]
      }
       // Fetch from MongoDB
    res.json(data);
  });
  

const PORT = process.env.PORT || 5000;
app.listen(5000, "0.0.0.0", () => {
    console.log("Server running on port 5000");
  });
  
  