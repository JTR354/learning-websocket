const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", function (ws) {
  ws.on("message", function (data) {
    console.log("from client", data.toString());
  });
  ws.send(`it's from severs`);
});
