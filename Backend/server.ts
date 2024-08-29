const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const server = require("http").Server(app);
export const io = require("socket.io")(server);
const port = 4000;
const socketEvents = require("./socket/socket.ts");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req: any, res: any) => {
  res.json({});
});
io.on("connection", socketEvents.onConnection);

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
