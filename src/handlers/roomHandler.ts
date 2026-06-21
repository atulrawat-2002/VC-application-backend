import { Socket } from "socket.io";
import { v4 as UUIDV4 } from "uuid";
import type { IRoomParams } from "../interfaces/IRoomParams.js";

const rooms: Record<string, string[]> = {};

const roomHandler = (socket: Socket) => {

    const createRoom = () => {
        const roomId = UUIDV4();
        socket.join(roomId);
        rooms[roomId] = [];

        socket.emit("room-created", { roomId });
        console.log("A new room has been creating room with id", roomId);
    };

    const joinedRoom = ({roomId, peerId}: IRoomParams) => {
        if (rooms[roomId]) {
            console.log("A new user has joined the room with id", roomId, " with peerId ", peerId);
            rooms[roomId]?.push(peerId);
            socket.join(roomId);
        }
        socket.emit("get-users", {
            roomId,
            participants: rooms[roomId],
        });
    };

    socket.on("create-room", createRoom);
    socket.on("joined-room", joinedRoom);

};

export default roomHandler;
