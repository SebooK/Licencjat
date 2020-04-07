const   debug = require('debug')('app:startup'),
        express = require('express'),
        config = require('config'),
        path = require('path'),
        cookieParser = require('cookie-parser'),
        logger = require('morgan'),
        helmet = require('helmet'),
        cors = require('cors'),
        bodyParser = require('body-parser');


const indexRouter = require('./routes/index');

var app = express();


app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(helmet());

app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404).send({ error: 'Not found' })
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
