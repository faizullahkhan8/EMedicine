import { io } from "../app";

let userSocketMap: any = [];

export const getReciverSocketId = (reciverId: any) => {
    return userSocketMap[reciverId];
};

io.on("connection", async (socket) => {
    const userId: any = socket.handshake.query.userId;

    if (userId !== "undefined") {
        userSocketMap[userId] = socket.id;
    }

    socket.on("disconnect", async () => {
        delete userSocketMap[userId];
        console.log("disconnected");
    });
});
