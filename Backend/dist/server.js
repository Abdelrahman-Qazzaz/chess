"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const server = require("http").Server(app);
exports.io = require("socket.io")(server);
const port = 4000;
const socketEvents = require("./socket/socket.js");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.json({});
});
exports.io.on("connection", socketEvents.onConnection);
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
