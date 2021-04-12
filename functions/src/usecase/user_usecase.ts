import { BotContext } from "../core/bot-context";
import * as strings from "../core/strings";
import { User } from "../model/user";
import * as userRepo from "../repository/user_repository";

/**
 * Add a new user to firestore database.
 * and reply user chat with welcome message
 * @param {BotContext} ctx context of the current chat event
 * @return {Promise<void>}
 */
export async function addNewUser(ctx: BotContext): Promise<void> {
  if (!ctx.userId || !ctx.from) return;
  const user = new User(
    ctx.userId,
    ctx.from.is_bot,
    ctx.from.first_name,
    ctx.from.username,
    ctx.from.last_name
  );
  await userRepo.saveUser(user);
  ctx.replyWithMarkdownV2(strings.startReply);
}

// function getUserStatus() {

// }

// function resetUserStatus() {

// }
