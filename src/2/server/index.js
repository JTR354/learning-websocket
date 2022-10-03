const WebSocket = require("ws");

const port = 3000;
const wss = new WebSocket.Server({ port });

let num = 0;
wss.on("connection", (ws) => {
  ws.on("message", (msg) => {
    console.log("this is from client" + msg);
    const { event, message, ...others } = JSON.parse(msg);
    if (event === "enter") {
      ws.name = message;
      num++;
    }
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({ ...others, message, event, num, name: ws.name })
        );
      }
    });
  });

  ws.on("close", () => {
    if (!ws.name) return;
    num--;
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ event: "logout", num, name: ws.name }));
      }
    });
  });
});
