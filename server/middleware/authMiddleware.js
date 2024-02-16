const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try {
        const token = req.header("Authorization").split(" ")[1];
        // console.log(token);
        const decryptedToken = jwt.verify(token, process.env.SECRET_TOKEN);
        req.userId = decryptedToken.userid;
        // console.log(decryptedToken.userid)
        next();
    } catch (error) {
        res.send({
            message: "problem in registration token",
            success: false
        })
    }
}