const WebSocket = require("ws");

const port = 3000;
const wss = new WebSocket.Server({ port });

const group = {};
wss.on("connection", (ws) => {
  ws.on("message", (msg) => {
    console.log("this is from client" + msg);
    const { event, message, room, ...others } = JSON.parse(msg);
    if (event === "enter") {
      ws.name = message;
      ws.room = room;
      if (group[room] == null) {
        group[room] = 1;
      } else {
        group[room]++;
      }
    }
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN && client.room === ws.room) {
        client.send(
          JSON.stringify({
            ...others,
            message,
            event,
            num: group[client.room],
            name: ws.name,
          })
        );
      }
    });
  });

  ws.on("close", () => {
    if (!ws.name) return;
    group[ws.name]--;
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN && client.room === ws.room) {
        client.send(
          JSON.stringify({
            event: "logout",
            num: group[ws.name],
            name: ws.name,
          })
        );
      }
    });
  });
});
