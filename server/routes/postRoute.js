const router = require('express').Router();
const postController = require('../Controller/postController')
const authMiddleware = require('../middleware/authMiddleware')
//add new post
const postRoute = router.post('/addNewPost', authMiddleware, postController.AddNewPost)
    .get('/getAllPost', postController.GetAllPost)
    .get('/getUserPost', authMiddleware, postController.GetUserPost)
    .post('/getOtherUserPost', authMiddleware, postController.GetOtherUserPost)
    .post('/likes', authMiddleware, postController.Likes)
    .post('/dislikes', authMiddleware, postController.Dislikes)
    .post('/comment', authMiddleware, postController.Comment)
    .post('/category', authMiddleware, postController.CatgoeryByPost)

module.exports = postRoute;
