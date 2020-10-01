const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const server = express();
server.use(bodyParser.json());

server.use("/api", routes);

server.listen("2088", () => {
  console.log("Hajime!");
});

module.exports = server;
