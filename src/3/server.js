const WebSocket = require("ws");
const jwt = require("jsonwebtoken");

const port = 3000;
const wss = new WebSocket.Server({ port });

const AUTH = "auth";
const LOGIN = "login";
const CHAT = "chat";
const LOGOUT = "logout";

const group = {};
wss.on("connection", (ws) => {
  ws.on("message", (body) => {
    const { event, data } = JSON.parse(body);
    if (event === AUTH) {
      jwt.verify(data, "secret", (error, decode) => {
        if (error) {
          console.log("token error");
          send(AUTH, error);
        } else {
          send(AUTH, decode);
        }
      });
    } else if (event === LOGIN) {
      const { room } = (ws.profile = data);
      if (group[room]) {
        group[room]++;
      } else {
        group[room] = 1;
      }
      wss.clients.forEach((client) => {
        if (
          client.readyState === WebSocket.OPEN &&
          room === client.profile?.room
        ) {
          send(event, { num: group[room], profile: data }, client);
        }
      });
    } else if (event === CHAT) {
      const room = ws.profile.room;
      wss.clients.forEach((client) => {
        if (
          client.readyState === WebSocket.OPEN &&
          room === client.profile?.room
        ) {
          send(
            event,
            {
              profile: ws.profile,
              num: group[room],
              ...data,
            },
            client
          );
        }
      });
    }
  });

  ws.on("close", () => {
    const { room } = ws.profile || {};
    if (room) {
      group[room]--;
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          send(LOGOUT, { profile: ws.profile, num: group[room] }, client);
        }
      });
    }
  });

  function send(event, data, socket = ws) {
    socket.send(JSON.stringify({ event, data }));
  }
});
