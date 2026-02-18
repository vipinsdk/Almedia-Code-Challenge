import winston from 'winston';

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue',
  },
};

winston.addColors(customLevels.colors);

export const logger = winston.createLogger({
  levels: customLevels.levels,
  level: 'debug',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }), 
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ level, message, timestamp }) => {
          return `[${level}] ${timestamp}: ${message}`;
        })
      ),
    })
  ],
});