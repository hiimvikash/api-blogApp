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

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "OPTIONS, GET, POST, PUT, PATCH, DELETE"
//     );
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     if (req.method === "OPTIONS") {
//       return res.sendStatus(200);
//     }
//     next();
//   });
// app.use(cors({origin: 'https://blogefy.netlify.app', credentials: true }));

app.use(cors());
app.use(express.json())
app.use(cookieParser());
app.use(express.static(path.resolve('./public')));

app.use(checkAuthe)

app.use('/user', userRouter);
app.use('/blog', blogRouter);

app.listen(PORT, ()=>{console.log(`App listening @ ${PORT}`)}) 