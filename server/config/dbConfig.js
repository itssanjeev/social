const mongoose = require('mongoose');
/* This code snippet is establishing a connection to a MongoDB database using Mongoose, which is an
Object Data Modeling (ODM) library for MongoDB and Node.js. Here is a breakdown of what each part of
the code is doing: */
mongoose.connect(process.env.MONGO_URL);
const connection = mongoose.connection;
connection.on('connected', () => {
    console.log('database connected successsfuly');
})
connection.on('error', () => {
    console.log('database connection failed!');
})

module.exports = connection;