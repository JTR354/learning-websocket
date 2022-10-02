const WebSocket = require("ws");

const port = 3000;
const wss = new WebSocket.Server({ port });

wss.on("connection", (ws) => {
  ws.on("message", (msg) => {
    console.log("this is from client" + msg);
    wss.clients.forEach((client) => {
      if (ws !== client && client.readyState === WebSocket.OPEN) {
        client.send(msg.toString());
      }
    });
  });
});
