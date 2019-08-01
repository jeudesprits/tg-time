import { createLogger, format } from 'winston';
const { combine, timestamp, printf } = format;
import { TelegramTransport as Telegram } from './transports/tg-transport';
import secrets from '../utils/secrets';
const { TG_TOKEN, TG_CHANNEL_NAME } = secrets;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(timestamp(), myFormat),
});

logger.add(new Telegram({
    token: TG_TOKEN,
    chatId: TG_CHANNEL_NAME,
}));

export default logger;