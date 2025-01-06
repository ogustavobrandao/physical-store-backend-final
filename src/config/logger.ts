import {createLogger, format, transports} from 'winston'

const {combine, timestamp, printf, errors, colorize} = format;

const customFormat = printf(({ level, message, timestamp, stack}) => {
    return `${timestamp} ${level}: ${stack || message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        colorize(),
        timestamp({format: 'DD-MM-YYYY HH:mm:ss'}),
        errors({stack:true}),
        customFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({filename: 'logs/error.log', level: 'error'}),
        new transports.File({filename: 'logs/combined.log'})
    ],
});

export default logger;