const path = require('path')
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');

const { errorHandler } = require("./middleware/errorMiddleware");

connectDB();

const port = process.env.PORT;
const app = express();

app.use(express.json()) // to allow for receiving of json body from call
app.use(express.urlencoded({ extended: false })) // to allow for receiving of urlencoded body from call

// Routes
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));