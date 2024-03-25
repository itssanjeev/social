const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const notificationController = require('../Controller/notificationController');
//get a notification 
const notificationRoute = router.post('/getAllNotification', authMiddleware, notificationController.GetNotificationRoute)
    .post('/markNotificationAsRead', authMiddleware, notificationController.MarkReadNofication)
    .get('/countNotication', authMiddleware, notificationController.CountNotication)
    .get('/countMessage', authMiddleware, notificationController.CountMessage)
    .get('/markMessageAsRead', authMiddleware, notificationController.MarkMessageAsRead)
    .post('/markMessageAsReadFromSocket', notificationController.readNotificationOFMessageFromSocket)

module.exports = notificationRoute;