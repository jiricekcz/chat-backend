import SocketIO from "socket.io";
import { server as httpServer } from "../http";
import auth from "./authentication";
import handleSocket from "./socketHandler";



export async function init(): Promise<void> {

}
export const server = new SocketIO.Server(httpServer, { 
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
    pingInterval: 300
});
server.use(function authentication (socket, next) {
    const token = socket.handshake.auth.token;
    const room = socket.handshake.auth.room;
    const id = socket.handshake.auth.id;
    if (!token) return next(new Error("Token not present."));
    if (!auth(token, room, id)) return next(new Error("Authentication failed."));
    return next(); 
});
server.use(function identification(socket, next) {
    const id = socket.handshake.auth.id;
    const room = socket.handshake.auth.room;

    socket.data.room = room;
    socket.data.id = id;

    socket.join(room);
    socket.join(id);
});
server.on("connection", (socket) => {
    handleSocket(socket);
});