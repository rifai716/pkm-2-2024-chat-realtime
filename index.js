const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8000", // or use '*' to allow all origins
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.broadcast.emit("Selamat datang... di fitur Chatting");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat", (msg) => {
    console.log("message: " + msg);
    io.emit("chat", msg);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
