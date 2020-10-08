const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const server = express();
server.use(cors());
server.use(bodyParser.json());

server.use("/api", routes);

server.listen("2088", () => {
  console.log("Hajime!");
});

module.exports = server;
