const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const cors = require('cors');
const socketManager = require('../server/socket/socketManager');
app.use(cors());
const path = require('path');


const http = require('http');

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log(`server has been started on ${port}`);
});


const io = require('socket.io')(server, {
    cors: {
        origin: 'https://connect-me-front.vercel.app/',
        methods: ['GET', 'POST'],
        credentials: true
    }
});



const dbConfig = require('./config/dbConfig');
const userRoute = require('../server/routes/userRoute');
const postRoute = require('../server/routes/postRoute')
const messageRoute = require('../server/routes/messageRoute')
const notificationRoute = require('../server/routes/notificationRoute');



app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/message', messageRoute)
app.use('/api/notification', notificationRoute);


io.on('connection', (socket) => {
    socket.on('joinRoom', currentUserId => {
        console.log('A user connected:', socket.id);
        console.log('user', currentUserId);
        socket.join(currentUserId);
        socketManager.setUserSocket(currentUserId, socket);
    })
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    })
});

/*-------------------deployment---------------*/
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname1, "../client/dist")));

    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname1, "client", "dist", "index.html"))
    );
} else {
    app.get("/", (req, res) => {
        res.send("API is running..");
    });
}
/*--------------------deployment-------------*/
