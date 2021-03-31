var createError = require('http-errors');
var express = require('express');
var cors = require("cors");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var profilesRouter = require('./routes/profiles');
var usersRouter = require('./routes/users');
var comentsRouter = require('./routes/coments');
var postsRouter = require('./routes/posts');

const { parseBearer } = require("./utils/token");

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {

//   const openPathes = [
//     "/users/login", "/users/signup","/profiles/list","/profiles",
//     "/profiles/u-profile/:id",
//   ];
//   if (!openPathes.includes(req.path)) {
//     try {
//       console.log("req.headers.authorization");
//       console.log(req.headers.authorization);

//       req.user = parseBearer(req.headers.authorization, req.headers);
//     } catch (err) {
//       return res.status(401).json({ result: "Access Denied" });
//     }
//   }
//   next();
// });

app.use('/', indexRouter);
app.use('/profiles', profilesRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/coments', comentsRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
