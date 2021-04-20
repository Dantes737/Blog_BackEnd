const express = require('express');
const cors = require("cors");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const apiErrorHandler=require('./error/api-error-handler.js');


const indexRouter = require('./routes/index');
const profilesRouter = require('./routes/profiles');
const userRouter = require('./routes/user-auth');
const comentsRouter = require('./routes/coments');
const postsRouter = require('./routes/posts');

const app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/profiles', profilesRouter);
app.use('/user-auth', userRouter);
app.use('/posts', postsRouter);
app.use('/coments', comentsRouter);



app.use(apiErrorHandler);

module.exports = app;
