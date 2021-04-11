// import * as admin from "firebase-admin";
import * as tt from "telegraf";
import { BotContext } from "../core/bot-context";
import * as strings from "../core/strings";
import info from "../raw_data/quran-info.json";

/**
 * Add a new user to firestore database.
 * and reply user chat with welcome message
 * @param {BotContext} ctx context of the current chat event
 * @return {Promise<void>}
 */
export async function start(ctx: BotContext): Promise<void> {
  const keyboard = tt.Markup.inlineKeyboard([
    tt.Markup.button.switchToCurrentChat("Ketik surah mulai", ""),
  ]);
  ctx.reply(strings.readReply, keyboard);
  // TODO: SAVE EMPTY STATE to DB
}

/**
 * Search surah name by user query
 * and reply user chat with welcome message
 * @param {BotContext} ctx context of the current chat event
 * @return {Promise<void>}
 */
export async function querySurah(ctx: BotContext): Promise<void> {
  const query = ctx.inlineQuery?.query.toLocaleLowerCase();
  if (!query) return;

  const result = info.chapters.filter((data) => {
    return data.name_simple.toLocaleLowerCase().includes(query);
  }).map((data) => {
    const shortDesc = `${data.translated_name.name} ${data.verses_count} ayat, ${data.revelation_place}`;
    // TODO: check user state, did user already select start surah
    const actionText = `/read_start@ngajidulubot ${data.name_simple}`
    return {
      type: "article",
      id: data.id,
      title: data.name_simple,
      description: shortDesc,
      input_message_content: {
        message_text: actionText,
      }
    };
  }).slice(0, 50);

  // @ts-ignore
  ctx.answerInlineQuery(result);
}
