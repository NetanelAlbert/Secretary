import { getSecret } from './aws/security/get-secret';
import { createBot } from './telegram/bot';

async function main() {
    try {
        const secret = await getSecret();
        const token = secret.telegramBotToken;
        await createBot(token);
        console.log('Bot created successfully!');
    } catch (error) {
        console.error('Error creating bot:', error);
    }
}

main();