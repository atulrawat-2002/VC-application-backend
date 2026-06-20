import { Socket } from "socket.io";
import { v4 as UUIDV4 } from "uuid";

const roomHandler = (socket: Socket) => {

    const createRoom = () => {
        const roomId = UUIDV4();
        socket.join(roomId);
        socket.emit("room-created", { roomId });
    };

    const joinRoom = () => {
        console.log("new room joined");
    };

    socket.on("create-room", createRoom);
    socket.on("join-room", joinRoom);

};

export default roomHandler;
