//Import the express module
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes");
//Use the router
app.use("/api", router);

//Middleware
app.use(cors());
app.use(express.json());

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
