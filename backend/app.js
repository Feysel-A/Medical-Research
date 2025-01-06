//Import the express module
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const router = require("./routes");
//Middleware
app.use(cors(true));
app.use(express.json());
//Use the router
app.use("/api", router);

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
