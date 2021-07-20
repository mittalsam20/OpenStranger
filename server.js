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
    console.log("Someone Connected,Their Socket ID is " + socket.id);
    socket.on("new_user", (username) => {
        console.log("UserName :", username)

    })

    socket.on("disconnect", () => {
        console.log(`${socket.id} Disconnected`);
    });
})


httpServer.listen(port, () => {
    console.log(`Server Started Listening on Port ${port}`);
});