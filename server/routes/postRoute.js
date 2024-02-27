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
    .get('/getPostLikeByCurrentUser', authMiddleware, postController.GetPostLikeByCurrentUser)
    .get('/visitPostById', authMiddleware, postController.VisitPostById)
    .get('/mostLikedPostIn7Days', authMiddleware, postController.MostPostLikedIn7Days)
    .get('/mostLikedPost', authMiddleware, postController.MostLikedPost)
    .get('/mostCommentedPost', authMiddleware, postController.MostCommentedPost)

module.exports = postRoute;
