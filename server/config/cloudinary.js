const cloudianry = require('cloudinary').v2;

//
/* This code snippet is configuring the Cloudinary SDK with the necessary credentials to authenticate
and interact with the Cloudinary service. The `cloudinary.config()` method is used to set up the
configuration for Cloudinary by providing the cloud name, API key, and API secret as environment
variables (`process.env.CLOUD_NAME`, `process.env.CLOUD_API_KEY`, `process.env.CLOUD_API_SECRET`). */
cloudianry.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})
module.exports = cloudianry;