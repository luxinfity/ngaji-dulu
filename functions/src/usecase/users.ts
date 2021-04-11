import { BotContext } from "../core/shared";
import * as strings from "../core/strings";

export function addNewUser(ctx: BotContext) {
    ctx.replyWithMarkdownV2(strings.startReply);
}

function getUserStatus() {

}

function resetUserStatus() {

}
