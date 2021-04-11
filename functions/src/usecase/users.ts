import * as admin from "firebase-admin";
import { BotContext } from "../core/bot-context";
import * as strings from "../core/strings";

export async function addNewUser(ctx: BotContext) {
    ctx.replyWithMarkdownV2(strings.startReply);
    if (!ctx.userId || !ctx.from) return;

    const db = admin.firestore();
    const doc = db.collection("users").doc(ctx.userId);
    const snapshot = await doc.get();
    if (!snapshot.exists) {
        doc.set(ctx.from);
        db.collection("statistic").doc("users").update({
            "total": admin.firestore.FieldValue.increment(1)
        });
    }
}

// function getUserStatus() {

// }

// function resetUserStatus() {

// }
