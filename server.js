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

const users = {};


io.on("connection", socket => {

    // -----------------------USER CONNECTED----------------------------
    console.log("Someone Connected,Their Socket ID is " + socket.id);


    // -----------------------USER CONNECTION----------------------------
    socket.on("new_user", (username) => {
        console.log("UserName :", username)
        users[username] = socket.id;
        //Notification Whenever A New User Joins
        io.emit("all_users", users);
    })


    // -----------------------USER DISCONNECTED----------------------------
    socket.on("disconnect", () => {
        for (let user in users) {
            if (users[user] === socket.id) {
                delete users[user];
            }
        }
        io.emit("all_users", users);
        console.log(`${socket.id} Disconnected`);
    });
})


httpServer.listen(port, () => {
    console.log(`Server Started Listening on Port ${port}`);
});