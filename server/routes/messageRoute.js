const router = require('express').Router();
const messageController = require('../Controller/messgeController');
const authMiddleware = require('../middleware/authMiddleware')
//sent message to user 
const messageRoute = router.post('/createNewChat', authMiddleware, messageController.CreateNewChat)
    .post('/sentMessage', authMiddleware, messageController.SentMessage)
    .post('/getMessage', authMiddleware, messageController.GetMessage)
    .get('/getMessageUserList', authMiddleware, messageController.GetMessageUserList)
    .post('/getMessagesOfUser', authMiddleware, messageController.GetMessage)
module.exports = messageRoute;

