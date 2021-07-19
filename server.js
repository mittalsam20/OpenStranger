const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});
const port = 7000;

io.on("connection", socket => {
    console.log("Someone Connected Their Socket ID is " + socket.id);
    socket.on("disconnect", () => {
        console.log(`${socket.id} Disconnected`);
    })
})


httpServer.listen(port, () => {
    console.log(`Server Started Listening on Port ${port}`);
});