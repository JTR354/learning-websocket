const WebSocket = require("ws");

const ws = new WebSocket.Server({ port: 3000 });

ws.on("connection", () => {
  console.log("one client connected");
});
