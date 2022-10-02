const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const ws = io.on("connection", function (socket) {
  console.log(`a socket is connected`);
  socket.on("chatEvent", function (msg) {
    console.log(msg, "from client");
    // socket.emit("serverMsg", "this is from server" + msg);
    // socket.broadcast.emit("serverMsg", "this is from server" + msg);
    ws.emit("serverMsg", "all" + msg);
  });
});

app.get("/", function (_, res) {
  res.sendFile(__dirname + "/index.html");
});

http.listen(3000, function () {
  console.log(`sever is on port:3000`);
});
