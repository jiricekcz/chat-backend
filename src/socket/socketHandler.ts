import io from 'socket.io';
import * as database from '../messageManager';



export default async function handleSocket(socket: io.Socket): Promise<void> {
    socket.on("message", (text: string) => {
        const message = {
            author: socket.data.id,
            chatId: socket.data.room,
            text,
            modifiedAt: new Date()
        };
        socket.to(socket.data.room).emit("new_message", message);
        database.addMessage(message);
    });
}