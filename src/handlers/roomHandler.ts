import { Socket } from "socket.io";
import { v4 as UUIDV4 } from "uuid";

const roomHandler = (socket: Socket) => {

    const createRoom = () => {
        const roomId = UUIDV4();
        socket.join(roomId);
        socket.emit("room-created", { roomId });
        console.log("A new room has been creating room with id", roomId);
    };

    const joinedRoom = ({roomId}: {roomId: string}) => {
        console.log("A new user has joined the room with id", roomId);
    };

    socket.on("create-room", createRoom);
    socket.on("joined-room", joinedRoom);

};

export default roomHandler;
