const   express = require('express'),
        path = require('path'),
        cookieParser = require('cookie-parser'),
        logger = require('morgan'),
        helmet = require('helmet'),
        cors = require('cors'),
        bodyParser = require('body-parser'),
        error = require('./middleware/error.js');
        require('./startup/config');


const indexRouter = require('./routes/index');

const app = express();


app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(helmet());
app.use('/', indexRouter);
app.use(error);

// catch 404 and forward to error handler
app.use(function(err,req, res, next) {
    res.status(404).send({ error: err })
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500).send({ error: err })
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
