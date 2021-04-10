// The Firebase Admin SDK to access Firestore.
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { Context, Telegraf } from "telegraf";

require('dotenv').config();

admin.initializeApp();

interface MyContext extends Context {
    firstName?: string
    userId?: number
}

const token = process.env.TELEGRAM_TOKEN || functions.config().telegram.token;
const bot = new Telegraf<MyContext>(
    token,
    { telegram: { webhookReply: true } }
);

// Register middleware and launch your bot as usual
bot.use((ctx, next) => {
    ctx.firstName = ctx.from?.first_name;
    ctx.userId = ctx.from?.id;
    return next()
})

// error handling
bot.catch((err, ctx) => {
    functions.logger.error('[Bot] Error', err)
    ctx.reply(`Ooops, encountered an error for ${ctx.updateType}`);
    return;
})

// initialize the commands
bot.command('/start', (ctx) => ctx.reply('Hello! Send any message and I will copy it.'));

// copy every message and send to the user
bot.on('message', (ctx) => ctx.telegram.sendCopy(ctx.chat.id, ctx.message));


// Check for POST request, since telegram will only sent a post req
// so no other source will be handled
// https://core.telegram.org/bots/api#recent-changes
export const webHook = functions.https.onRequest((request, response) => {
    if (request.method !== "POST") {
        response.status(400).send("Please send a POST request");
        return;
    }
    functions.logger.log('Incoming message', request.body)

    bot.handleUpdate(request.body, response)
    response.status(200).send("WebHook accepted!");
});
