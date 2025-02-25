const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT=3001;

const detailsRouter=require("./routes/details");

app.use(cors());
app.use(express.json()); 

app.use(bodyParser.json());
app.use("/details",detailsRouter);

app.get('/', (req, res) => {
    res.json({ message: "API Base URL is working!" }); 
  });
  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;