// import { createLogger, format, transports } from 'winston';
// const { File, Console } = transports;
// const { combine, timestamp, printf } = format;
// import { TelegramTransport as Telegram } from './transports/tg-transport';
// import { isProduction } from '../utils/helpers';
// import secrets from '../utils/secrets';
// const { TG_TOKEN, TG_CHANNEL_NAME } = secrets;

// const myFormat = printf(({ level, message, label, timestamp }) => {
//     return `${timestamp} [${label}] ${level}: ${message}`;
// });

// const logger = createLogger({
//     level: isProduction() ? 'info' : 'debug',
//     format: combine(timestamp(), myFormat),
// });

// if (isProduction()) {
//     logger.add(
//         new File({
//             filename: 'logs/error.log',
//             level: 'error',
//         }),
//     );

//     logger.add(
//         new File({
//             filename: 'logs/combined.log',
//             level: 'info',
//         }),
//     );
// } else {
//     logger.add(
//         new Console({
//             format: combine(format.colorize(), myFormat),
//         }),
//     );
// }

// logger.add(
//     new Telegram({
//         token: TG_TOKEN,
//         chatId: TG_CHANNEL_NAME,
//         pathToImage: 'tmp/screenshot.jpg',
//     }),
// );

// export default logger;
