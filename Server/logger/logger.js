const {createLogger,format,transports,ExceptionHandler}= require('winston');
const {combine, label, timestamp, printf} = format;
const path = require('path');
const myFormat = printf(info => `${info.timestamp} [${info.level}]: ${info.label} - ${info.message}`);

var logger = createLogger({
    level: 'info',
    format: combine(
        label({ label:'main'}),
        timestamp(),
        myFormat,
    ),
    defaultMeta: {service: 'user-service'},
    transports: [
        new transports.Console(),
        new transports.File({
            filename: path.join(__dirname,'error.log'),
            level:'error',
            format: format.json(),
            timestamp:true,
        }),
    ],
    exceptionHandlers: [
        new transports.File({
            filename: path.join(__dirname, 'uncaughtExceptions.log'),
            level: 'error',
            format: format.json(),
            timestamp: true,
        })
    ]
});

module.exports =logger;