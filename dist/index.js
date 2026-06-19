import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import ServerConfig from "./config/serverConfig.js";
const app = express();
const server = http.createServer(app);
app.use(cors());
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "post"],
    },
});
io.on("connection", (socket) => {
    console.log("A connection established");
    socket.on("disconnected", () => {
        console.log("Socket disconnected");
    });
});
server.listen(ServerConfig.PORT, () => {
    console.log(`Server is up at port ${ServerConfig.PORT}`);
});
//# sourceMappingURL=index.js.map