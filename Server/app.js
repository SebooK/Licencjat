import express from 'express';
import path, {dirname} from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index.js';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import {error} from './middleware/error.js';
import config from 'config';
import jwt from 'jsonwebtoken';
import * as configuration from'./startup/config.js';
import {fileURLToPath} from "url";
const __basename = dirname(fileURLToPath(import.meta.url));
const __dirname = __basename.split('\\', __basename.length - 1).slice(0, 7).join('\\');
const app = express();
const port = process.env.PORT || 8000;
app.enable('trust proxy');
app.set('trust proxy', 'loopback');
app.use(logger('dev'));


app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use('/', indexRouter);
app.use(error);

// catch 404 and forward to error handler
app.use(function (err, req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY,Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
    res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
    res.header("Allow", " GET,POST, OPTIONS, PUT, DELETE");
    res.status(404).json(err);
    console.log(err);
    next()
});

// error handler
app.use(function (err, req, res, next) {
    if (req.secure) {
        next();
    } else {
        res.redirect('https://' + req.headers.host + req.url);
        console.log(res.redirect('https://' + req.headers.host + req.url))
    }
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500).send({error: err})
});


app.listen(port, () => console.log(`Listening on port ${port}`));

export default app;
