const express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    helmet = require('helmet'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    error = require('./middleware/error.js'),
    config = require('config');
require('./startup/config');

const indexRouter = require('./routes/index');
const app = express();
const port = process.env.PORT || 8000;
app.enable('trust proxy');
const allowedOrigins = [
    'capacitor://localhost',
    'ionic://localhost',
    'http://localhost',
    'http://localhost:8000',
    'http://localhost:8100'
];

// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Origin not allowed by CORS'));
            console.log('Not Allowed')
        }
    }
}


app.use(logger('dev'));


app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use('/', indexRouter);
app.use(error);

// catch 404 and forward to error handler
app.use(function (err, req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY,Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
    res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
    res.header("Allow", " GET,POST, OPTIONS, PUT, DELETE");
    res.status(404).send(err);
    //console.log(err);
    next()
});

// error handler
app.use(function (err, req, res, next) {
    if(req.secure) {
        next();
    } else {
        res.redirect('https://' + req.headers.host + req.url);
    }
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500).send({error: err})
});


app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
