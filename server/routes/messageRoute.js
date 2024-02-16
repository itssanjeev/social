const router = require('express').Router();
const messageController = require('../Controller/messgeController');
const authMiddleware = require('../middleware/authMiddleware')
//sent message to user 
const messageRoute = router.post('/sentMessage', authMiddleware, messageController.SentMessage)
    .post('/getMessage', authMiddleware, messageController.GetMessage)
    .post('/messageUserList', authMiddleware, messageController.MessaageUserList)

module.exports = messageRoute;

