const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const url = require('url');
const app = express();

const server = http.createServer(app);
const io = new Server(server);

const users = []
io.on('connection', (socket) => {



    socket.on("message", message => {
        io.sockets.emit("message", {
            message,
            user: socket.user,
            id: socket.id,
        });
    });

    socket.on("disconnect", () => {
        console.log(`user ${socket.user} is disconnected`);
        if (socket.user) {
            users.splice(users.indexOf(socket.user), 1);
            io.sockets.emit("user", users);
            console.log("remaining users:", users);
        }
    });
});