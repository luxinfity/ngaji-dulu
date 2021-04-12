// The Firebase Admin SDK to access Firestore.
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { Telegraf } from "telegraf";
import * as dotenv from "dotenv";
import { BotContext } from "./core/bot-context";
import * as strings from "./core/strings";
import * as User from "./usecase/users";
import * as Tilawah from "./usecase/tilawah";

dotenv.config();
admin.initializeApp();

const token = process.env.TELEGRAM_TOKEN || functions.config().telegram.token;
const bot = new Telegraf<BotContext>(
  token,
  { telegram: { webhookReply: true } }
);

// Register middleware and launch your bot as usual
bot.use((ctx, next) => {
  ctx.firstName = ctx.from?.first_name;
  ctx.userId = ctx.from?.id.toString() ?? "";
  return next();
});

// error handling
bot.catch((err, ctx) => {
  functions.logger.error("[Bot] Error", err);
  ctx.reply(`Ooops, encountered an error for ${ctx.updateType}`);
});

// Listen for surah query
bot.on("inline_query", (ctx) => Tilawah.querySurah(ctx));

// Listen for basic command
bot.command("/start", (ctx) => User.addNewUser(ctx));
bot.command("/help", (ctx) => ctx.replyWithMarkdownV2(strings.startReply));
bot.command("/read", (ctx) => Tilawah.start(ctx));
bot.command("/profile", (ctx) => ctx.replyWithMarkdownV2(strings.profileReply));
bot.command("/reset", (ctx) => ctx.reply(strings.resetReply));
bot.command("/quit", (ctx) => {
  ctx.reply(strings.quitReply);
  ctx.leaveChat();
});

// Tilawah session command
bot.command("/read_start", (ctx) => Tilawah.selectAyat(ctx, ctx.message.text));
// bot.command("/read_stop", (ctx) => Tilawah.selectAyat(ctx, ctx.message.text));
bot.on("text", (ctx) => {
  if (ctx.message.reply_to_message
    // && ctx.message.text.includes(strings.pleaseSelectAyat) // TODO: replace to check user state
  ) {
    Tilawah.selectNextSurah(ctx, ctx.message.text);
  }
});

// TODO: default handler
// receive message with type text
// bot.on("text", (ctx) => ctx.reply("recieve message text"));
bot.on("voice", (ctx) => ctx.reply("recieve voice message"));
// copy every message and send to the user
bot.on("message", (ctx) => ctx.copyMessage(ctx.chat.id));

// Check for POST request, since telegram will only sent a post req
// so no other source will be handled
// https://core.telegram.org/bots/api#recent-changes
export const webHook = functions.https.onRequest((request, response) => {
  if (request.method !== "POST") {
    response.status(400).send("Please send a POST request");
    return;
  }

  functions.logger.info(
    "Incoming message", { data: request.body }
  );

  bot.handleUpdate(request.body, response);
  response.status(200).send("WebHook accepted!");
});
