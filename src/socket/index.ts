import SocketIO from "socket.io";
import { server as httpServer } from "../http";
import auth from "./authentication";



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
    if (!token) return next(new Error("Token not present."));
    if (!auth(token)) return next(new Error("Authentication failed."));
    return next(); 
});
server.on("connection", (socket) => {

});