const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const cors = require('cors');
app.use(cors({ origin: "*" }));
const port = process.env.PORT || 8080;

const http = require('http').createServer(app);
const io = require('socket.io')(http);
module.exports = { io }

require('./config/dbConfig');
require('../server/socket/socketManager')
const userRoute = require('../server/routes/userRoute');
const postRoute = require('../server/routes/postRoute')
const messageRoute = require('../server/routes/messageRoute')
const notificationRoute = require('../server/routes/notificationRoute');
const adminRoute = require("../server/routes/adminRoute")

const { swaggerUi, swaggerSpec } = require('./swagger/swagger');
// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Your middleware and route setup here
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/message', messageRoute)
app.use('/api/notification', notificationRoute);
app.use('/api/admin', adminRoute);

http.listen(port, () => {
    console.log(`server has been started on ${port}`);
});
