const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const cors = require('cors');
app.use(cors());


const http = require('http');
const server = http.createServer(app);
// const io = require('socket.io')(server, {
//    cors: {
//       origin: 'http://localhost:5173',
//       methods: ['GET', 'POST'],
//       credentials: true
//    }
// });


const dbConfig = require('./config/dbConfig');
const userRoute = require('../server/routes/userRoute');
const postRoute = require('../server/routes/postRoute')


app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);


// io.on('connection', (socket) => {
//    console.log('A user connected:', socket.id);

//    socket.on('disconnect', () => {
//       console.log('User disconnected:', socket.id);
//    });

//    socket.on('chatMessage', (message) => {
//       console.log('Received message:', message);
//       io.emit('chatMessage', message);
//    });
// });


const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`server has been started on ${port}`));
