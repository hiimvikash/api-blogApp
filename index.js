require("dotenv").config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000; 
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRoutes');
const blogRouter = require('./routes/blogRoutes');
const {checkAuthe} = require('./middlewares/checkAuth');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);
app.use(cookieParser());

const corsOptions = {
  origin: 'https://blogefy.onrender.com',
  credentials: true
};

app.use(cors(corsOptions));

app.use(checkAuthe)


app.use(express.json())
app.use(express.static(path.resolve('./public')));


app.use('/user', userRouter);
app.use('/blog', blogRouter);

app.listen(PORT, ()=>{console.log(`App listening @ ${PORT}`)}) 