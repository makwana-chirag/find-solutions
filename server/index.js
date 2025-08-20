const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const { addUser, getUser, getUserInRoom, removeUser } = require("./user");

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connnection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.emit("message", {
      user: "Admin",
      text: "Welcome to this chat room",
    });

    socket.broadcast
      .to(user.room)
      .emit("message", { user: "Admin", text: "New User has join" });
      
    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUserInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    console.log("🚀 ~ socket.on ~ message:", message);
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        usre: "Admin",
        text: "user has left",
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
    console.log("user has left :::");
  });
});
app.use(router);

server.listen(PORT, () => console.log(`Server has started on port : ${PORT}`));
