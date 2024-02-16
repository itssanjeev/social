const router = require('express').Router();
const userController = require('../Controller/userController');
const authMiddleware = require('../middleware/authMiddleware');

const userRouter = router.post('/register', userController.Register)
    .post('/login', userController.Login)
    .get("/get-current-user", authMiddleware, userController.GetCurrentUser)
    .post("/edit-user-profile", authMiddleware, userController.EditUserProfile)
    .post('/followUser', authMiddleware, userController.FollwUser)
    .post('/getFollowers', authMiddleware, userController.GetFollower)
    .post('/getOtherUser', authMiddleware, userController.GetOhterUser)
    .post('/getFollowing', authMiddleware, userController.GetFollowing)
    .post('/searchUser', authMiddleware, userController.SearchUser)

module.exports = userRouter;
