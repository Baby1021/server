const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const taskRouter = require('./routes/tasks');
const appRouter = require('./routes/app');
const loveRouter = require('./routes/love');
const surpriseRouter = require('./routes/surprise');

const app = express();

// 跨域问题
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.header('Origin'));
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'content-type,Authorization')
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
    next()
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/user', usersRouter);
app.use('/api/v1/task', taskRouter);
app.use('/api/v1/app', appRouter);
app.use('/api/v1/love', loveRouter);
app.use('/api/v1/surprise', surpriseRouter);

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
