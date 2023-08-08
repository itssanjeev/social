const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try {
        // console.log(req.header, "auth middleware");
        const token = req.header("Authorization").split(" ")[1];
        // console.log(token);
        const decryptedToken = jwt.verify(token, process.env.SECRET_TOKEN);
        req.userId = decryptedToken.userid;
        // console.log('authmiddleware', req.userId)
        // console.log('decrypted token ', decryptedToken);
        next();
    } catch (error) {
        res.send({
            message: "problem in registration token",
            success: false
        })
    }
}