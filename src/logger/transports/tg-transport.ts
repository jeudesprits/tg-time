import Transport from 'winston-transport';
import fetch from 'node-fetch';

interface TelegramTransportOptions extends Transport.TransportStreamOptions {

    token: string;

    chatId: string;

}

export class TelegramTransport extends Transport {

    private token: string;

    private chatId: string;

    constructor(options: TelegramTransportOptions) {
        super(options);

        this.token = options.token;
        this.chatId = options.chatId;
    }

    private async sendText(message: string) {
        const response = await fetch(`https://api.telegram.org/bot${this.token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: this.chatId,
                text: `\`\`\`${message}\`\`\``,
                parse_mode: 'Markdown',
                disable_notification: true,
            }),
        });

        if (response.status !== 200) {
            const text = await response.text();
            setImmediate(() => this.emit('error', `${response.status} ${text}`));
        }
    }

    log(info: any, callback: () => void): any {
        setImmediate(() => this.emit('logged', info));

        this.sendText(info[Symbol.for('message')])
            .then(() => callback())
            .catch(error => console.error(error));
    }

}
