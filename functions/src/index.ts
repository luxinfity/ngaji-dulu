// The Firebase Admin SDK to access Firestore.
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {Context, Telegraf} from "telegraf";
import * as dotenv from "dotenv";
import * as strings from "./strings";

dotenv.config();

admin.initializeApp();

interface MyContext extends Context {
    firstName?: string
    userId?: number
}

const token = process.env.TELEGRAM_TOKEN || functions.config().telegram.token;
const bot = new Telegraf<MyContext>(
    token,
    {telegram: {webhookReply: true}}
);

// Register middleware and launch your bot as usual
bot.use((ctx, next) => {
  ctx.firstName = ctx.from?.first_name;
  ctx.userId = ctx.from?.id;
  return next();
});

// error handling
bot.catch((err, ctx) => {
  functions.logger.error("[Bot] Error", err);
  ctx.reply(`Ooops, encountered an error for ${ctx.updateType}`);
  return;
});

// Listen for basic command
bot.command("/start", (ctx) => ctx.reply(strings.startReply));
bot.command("/help", (ctx) => ctx.reply(strings.startReply));
bot.command("/read", (ctx) => ctx.reply(strings.readReply));
bot.command("/profile", (ctx) => ctx.reply(strings.profileReply));
bot.command("/reset", (ctx) => ctx.reply(strings.resetReply));
bot.command("/quit", (ctx) => {
  ctx.reply(strings.quitReply);
  ctx.leaveChat();
});

// receive message with type text
bot.on("text", (ctx) => ctx.reply("recieve message text"));

// receive message with type text
bot.on("voice", (ctx) => ctx.reply("recieve voice message"));

// copy every message and send to the user
bot.on("message", (ctx) => ctx.telegram.sendCopy(ctx.chat.id, ctx.message));

// Check for POST request, since telegram will only sent a post req
// so no other source will be handled
// https://core.telegram.org/bots/api#recent-changes
export const webHook = functions.https.onRequest((request, response) => {
  if (request.method !== "POST") {
    response.status(400).send("Please send a POST request");
    return;
  }

  functions.logger.info(
      "Incoming message", {data: request.body}
  );

  bot.handleUpdate(request.body, response);
  response.status(200).send("WebHook accepted!");
});
