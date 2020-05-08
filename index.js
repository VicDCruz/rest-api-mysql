const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.send('Hello, world! MySql');
});

require("./routes/routers.routes.js")(app);

// set port, listen for requests
app.listen(9191, () => {
  console.log("Server is running on port 9191. http://localhost:9191/");
});