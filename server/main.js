// მოგესალმებით თქვენი დავალებაა შექმნათ ფრონტიც და ბექიც სოკეტების გამოყენებით.
// 1) ფრონტში უნდა გქონდეთ ორი ფეიჯი. პირველ ფეიჯზე უნდა გქონდეთ ინფუთი და ამ ინფუთში რამეს რო დაწერთ ეგ ტექსტი უნდა გამოუჩნდეს საერთოდ ყველას
// 2) უნდა გქონდეთ რუმის როუტი სადაც გექმენათ მსგავსი რაც ლექციაზე გავაკეთეთ იმეილის შესაყვანი და რუმის აიდი, როგორც კი დაჯოინდება გამოუჩნდეს ტექსტის ჩასაწერი რომელსაც ექნება ჩატის ვიზუალი ისევე როგორც ვქნით ლექციაში.
// 3) ბექშიც ამ ორივე რესურზე გასცემთ სოკეტებით პასუხს.

const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const app = express();

const server = app.listen(3001, () => {
  console.log("server is running on http://localhost:3001");
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`connected ${socket.id}`);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

  socket.on("sendMessage", (data) => {
    console.log(data, "sendData");
    socket.broadcast.emit("sendMessage", data);
    socket.to(data.roomId).emit('sendMessage',data)
  });
  io.on("disconnect", (reason) => {
    console.log(`disconnected ${socket.id} ${reason}`);
  });
});
