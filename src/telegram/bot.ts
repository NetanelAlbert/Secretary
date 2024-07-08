import TelegramBot from 'node-telegram-bot-api';

export function createBot(token: string): void {
    const bot = new TelegramBot(token, { polling: true });

    // Add your bot logic here

    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, 'Hello! Welcome to the bot.');
    });

    // Add more bot commands and event listeners here

    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, 'Received a message.');
    });
}