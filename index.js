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
          { "name": "bb cort", "lat": 13.009327, "lng": 80.003903 },
          { "name": "hostel", "lat": 13.007529, "lng": 80.003946}
        ],
        "roads": [
          { "name": "Library to Auditorium", "path": [[13.009307, 80.003904 ], [13.009244, 80.003908],[13.009186, 80.003910],[13.009004, 80.003904  ]] }
        ]
      }
       // Fetch from MongoDB
    res.json(data);
  });
  

const PORT = process.env.PORT || 5000;
app.listen(5000, "0.0.0.0", () => {
    console.log("Server running on port 5000");
  });
  
  