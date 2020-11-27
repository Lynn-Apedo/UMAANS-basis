const express = require("express");
require("express-async-errors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const notFoundHandler = require("./middleware/not_found_404_handler");
const errorHandler = require("./middleware/error_handler");
const routes = require("./routes");

const server = express();
server.use(morgan("dev"));
// server.use(cors({ origin: true, credentials: true }));
server.use("/", cors());

server.use(bodyParser.json());

server.use("/api", routes);
server.use("*", notFoundHandler);
server.use(errorHandler);

server.listen("2088", () => {
  console.log("Hajime!");
});

module.exports = server;
