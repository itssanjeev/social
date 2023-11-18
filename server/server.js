const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const cors = require('cors');
const socketManager = require('../server/socket/socketManager');
//sssapp.use(cors());
app.use(cors({ origin: '*' }));


const http = require('http');
const server = app.listen(port, () => {
    console.log(`server has been started on ${port}`);
});


const io = require('socket.io')(server, {
    cors: {
        origin: '*',
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


const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`server has been started on ${port}`));
