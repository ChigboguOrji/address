var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var compression = require('compression');
var session = require('express-session');
var flash = require('connect-flash');

var indexRouter = require('./routes/index');
var addressRouter = require('./routes/address');

var app = express();

// connect database
var addressdb = 'mongodb://127.0.0.1:27017/address';
var options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 300,
  keepAlive: true,
  keepAliveInitialDelay: 30000,
  poolSize: 10
}
mongoose.connect(addressdb, options);
var conn = mongoose.connection;
conn.once('open', function () {
  console.log('Connection to database opened')
});

conn.on('error', function () {
  console.log('Connection to database terminated with error')
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// custom app variables
app.locals.appName = 'Address book';

app.use(logger('short'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());
app.use(session({
  secret: 'address app kinky secret code',
  resave: true,
  saveUninitialized: true
}))
app.use(flash());

app.use('/', indexRouter);
app.use('/address', addressRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;