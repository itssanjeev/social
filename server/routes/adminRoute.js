const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminController = require('../Controller/adminController');

const adminRoute = router.post('/approve', authMiddleware, adminController.ApprovePost)
    .post("/block", authMiddleware, adminController.BlockPost)
    .get("/getAllPostAdmin", authMiddleware, adminController.GetAllPostAdmin)

module.exports = adminRoute;