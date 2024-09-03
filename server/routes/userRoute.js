const router = require('express').Router();
const userController = require('../Controller/userController');
const authMiddleware = require('../middleware/authMiddleware');

const userRouter =
    router
        /**
         * @swagger
         * /register:
         *   post:
         *     summary: Register a new user
         *     tags: [Users]
         *     requestBody:
         *       description: User registration details
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               name:
         *                 type: string
         *               email:
         *                 type: string
         *               password:
         *                 type: string
         *     responses:
         *       200:
         *         description: User registered successfully
         *       400:
         *         description: Bad request
         */
        .post('/register', userController.Register)
        .post('/login', userController.Login)
        .get("/get-current-user", authMiddleware, userController.GetCurrentUser)
        .post("/edit-user-profile", authMiddleware, userController.EditUserProfile)
        .post('/followUser', authMiddleware, userController.FollwUser)
        .post('/getFollowers', authMiddleware, userController.GetFollower)
        .post('/getOtherUser', authMiddleware, userController.GetOhterUser)
        .post('/getFollowing', authMiddleware, userController.GetFollowing)
        .post('/searchUser', authMiddleware, userController.SearchUser)

module.exports = userRouter;
