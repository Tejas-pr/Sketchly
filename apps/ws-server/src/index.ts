import { WebSocket, WebSocketServer } from "ws";
import url from "url";
import { Queue } from 'bullmq';
import { redisConnection } from "./redis-connection";

const wss = new WebSocketServer({ port: Number(process.env.WS_PORT) || 8080 });
const chatQueue = new Queue('shapes-worker', {
    connection: redisConnection
});

chatQueue.waitUntilReady().then(() => console.log("Queue connected to Redis")).catch((err) => console.error("Queue connection failed:", err));

interface User {
    userId: string
    ws: WebSocket;
    rooms: string[];
}

const users: User[] = [];

wss.on("connection", (ws, req) => {
    const query = url.parse(req.url || "", true).query;
    const userId = Array.isArray(query.userId) ? query.userId[0] : query.userId;

    if (!userId) {
        ws.send("Please provide user ID!!");
        ws.close();
        return;
    }

    const existingUser = users.findIndex(u => u.userId === userId);
    if (existingUser !== -1) {
        users.splice(existingUser, 1);
    }

    const user: User = {
        userId,
        ws,
        rooms: []
    }

    users.push(user);

    ws.on("message", async (data) => {
        const parsedData = JSON.parse(data.toString());

        if (!parsedData.roomId) {
            ws.send("Please provide room ID!!");
            ws.close();
        }

        if (parsedData.type === 'join_room') {
            const roomId = parsedData.roomId
            if (!user.rooms.includes(roomId)) {
                user.rooms.push(roomId);
                ws.send(`joined room ${roomId} successfully!`);
            }
        }

        if (parsedData.type === 'leave_room') {
            const roomId = parsedData.roomId;
            user.rooms = user.rooms.filter(x => x !== roomId);
            ws.send(`left room ${roomId} successfully!`);
        }

        if (parsedData.type === 'shape') {
            const roomId = parsedData.roomId;
            const shapes = parsedData.shapes;

            await chatQueue.add("shapes", {
                roomId,
                shapes,
                userId
            })

            users.forEach(async (e) => {
                if (e.rooms.includes(roomId)) {
                    e.ws.send(shapes);
                }
            })
        }
    })
});