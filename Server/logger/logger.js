import pkg from 'winston';
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';

const {createLogger, format, transports, ExceptionHandler} = pkg;
const {combine, label, timestamp, printf} = format;
const myFormat = printf(info => `${info.timestamp} [${info.level}]: ${info.label} - ${info.message}`);
const __basename = dirname(fileURLToPath(import.meta.url));
const __dirname = __basename.split('\\', __basename.length - 1).slice(0, 7).join('\\');

const timeZone = () => {
    return new Date().toLocaleString('pl-PL', {
        timeZone: 'Europe/Warsaw'
    })
}
const logger = createLogger({
    level: 'info',
    format: combine(
        label({label: 'main'}),
        timestamp({format: timeZone}),
        myFormat,
    ),
    defaultMeta: {service: 'user-service'},
    transports: [
        new transports.Console(),
        new transports.File({
            filename: join(__dirname, 'error.log'),
            level: 'error',
            format: format.json(),
            timestamp: true,
        }),
    ],
    exceptionHandlers: [
        new transports.Console(),
        new transports.File({
            filename: join(__dirname, 'uncaughtExceptions.log'),
            level: 'error',
            format: format.json(),
            timestamp: true,
        })
    ]
});

export default logger;
