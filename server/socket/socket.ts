import express from "express";
import http from "node:http";
import { Server } from "socket.io";

// // Create Express app instance
export const app = express();
export const server = http.createServer(app);
export const io = new Server(server);

let userSocketMap: any = [];

export const getReciverSocketId = (reciverId: any) => {
    return userSocketMap[reciverId];
};

io.on("connection", async (socket) => {
    const userId: any = socket.handshake.query.userId;

    socket.on("testing", ({ userId }) => {
        userSocketMap[userId] = socket.id;
        console.log(userSocketMap);
    });

    socket.on("disconnect", async () => {
        delete userSocketMap[userId];
        console.log("disconnected");
    });
});
