const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const cors = require('cors');
app.use(cors());
const dbConfig = require('./config/dbConfig');
const userRoute = require('../server/routes/userRoute');

app.use('/api/users', userRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`server has been started on ${port}`));