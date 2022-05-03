import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf } = format;

const LIVELLI = {
  error: 'error',
  warn: 'warn',
  info: 'info',
  verbose: 'verbose',
  debug: 'debug',
  silly: 'silly',
};

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] : ${message}`;
});

/**
 * Logger usato in tutta app
 */
export const logger = createLogger({
  format: combine(timestamp(), myFormat),

  transports: [
    new transports.Console({ level: LIVELLI.debug }),
    new transports.File({ filename: 'app.log', level: LIVELLI.warn }),
  ],
});
