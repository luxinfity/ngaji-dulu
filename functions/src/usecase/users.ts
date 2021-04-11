import * as admin from "firebase-admin";
import { BotContext } from "../core/bot-context";
import * as strings from "../core/strings";

export function addNewUser(ctx: BotContext) {
    ctx.replyWithMarkdownV2(strings.startReply);
    if (!ctx.userId || !ctx.from) return;

    const db = admin.firestore();
    const collection = db.collection("users");
    collection.doc(ctx.userId).set(ctx.from);
}

// function getUserStatus() {

// }

// function resetUserStatus() {

// }
