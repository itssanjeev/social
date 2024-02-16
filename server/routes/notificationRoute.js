const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const notificationController = require('../Controller/notificationController');
//get a notification 
const notificationRoute = router.post('/getAllNotification', authMiddleware, notificationController.GetNotificationRoute)
    .post('/markNotificationAsRead', authMiddleware, notificationController.MarkReadNofication)

module.exports = notificationRoute;