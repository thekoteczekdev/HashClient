const express = require("express");
const WebSocket = require("ws");
const cors = require("cors");

const app = express();
const server = require("http").createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());

let users = {}; // { uuid: { name, ws } }
let friends = {}; // { uuid: [friend_uuid, friend_uuid] }
let groups = {}; // { groupId: { name, members: [uuid, uuid] } }

wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        const data = JSON.parse(message);

        if (data.type === "register") {
            users[data.uuid] = { name: data.name, ws };
            ws.send(JSON.stringify({ type: "friendList", friends: friends[data.uuid] || [] }));
        }

        if (data.type === "addFriend") {
            if (!friends[data.uuid]) friends[data.uuid] = [];
            friends[data.uuid].push(data.friendUuid);
            ws.send(JSON.stringify({ type: "friendAdded", friend: data.friendUuid }));
        }

        if (data.type === "sendMessage") {
            const friendWs = users[data.to]?.ws;
            if (friendWs) {
                friendWs.send(JSON.stringify({ type: "message", from: data.from, text: data.text }));
            }
        }
    });

    ws.on("close", () => {
        Object.keys(users).forEach((uuid) => {
            if (users[uuid].ws === ws) {
                delete users[uuid];
            }
        });
    });
});

server.listen(3001, () => console.log("Serwer działa na porcie 3001"));
