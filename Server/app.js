const mongoose = require('mongoose');
const debug = require('debug')('app:startup');
const express = require('express');
const config = require('config');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const orderDetails = require('./routes/ordersDetails');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/licencjatDB',{useNewUrlParser: true, useUnifiedTopology: true})
    .then( () => console.log('Connected to mongoDB..'))
    .catch( err => console.error('Could not connect to mongodb',err));

app.use(logger('dev'));

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(helmet());

//Configuration
console.log('Application Name: ' + config.get('name'));

//Routers
app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/orderDetails',orderDetails);
if(app.get('env') ==='dev') {
    app.use(logger('tiny'));
    debug('Morgan enabled');

}
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));


