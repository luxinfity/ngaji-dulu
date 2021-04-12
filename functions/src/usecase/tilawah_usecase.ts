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
  ctx.reply(strings.readStartReply, keyboard);
  // TODO: SAVE EMPTY STATE to DB
  // {
  //    userId: <>,
  //    date: now(),
  //    recordingId: <>, https://stackoverflow.com/questions/63436620/how-to-download-an-audio-message-from-a-user-in-a-telegram-bot
  //    surah_start: <>,
  //    ayat_start: <>,
  //    surah_end: <>,
  //    ayat_end: <>,
  //  }
  // TODO: check hari sama hari
  //
}

/**
 * Search surah name by user query, then select one
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
    const shortDesc = `${data.translated_name.name}, ${data.verses_count} ayat, ${data.revelation_place}`;
    // TODO: check user state, did user already select start surah
    const actionText = `/read_start ${data.name_simple}`
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

/**
 * Select surah ayat
 * and reply user chat with welcome message
 * @param {BotContext} ctx context of the current chat event
 * @param {string} text in format <command> <surah name>
 * @return {Promise<void>}
 */
export async function selectAyat(ctx: BotContext, text: string): Promise<void> {
  const surahName = text.substring(12);
  const keyboard = tt.Markup.forceReply();
  // TODO: check user state, did user already select start surah
  ctx.reply(strings.selectAyatReply(surahName, true), keyboard);
}

/**
 * Select next surah
 * and reply user chat with welcome message
 * @param {BotContext} ctx context of the current chat event
 * @param {string} text in format <command> <surah name>
 * @return {Promise<void>}
 */
export async function selectNextSurah(ctx: BotContext, text: string): Promise<void> {
  const number = Number(text);
  if (!number) return;

  const keyboard = tt.Markup.inlineKeyboard([
    tt.Markup.button.switchToCurrentChat("Ketik surah akhir", ""),
  ]);
  ctx.reply(strings.readEndReply, keyboard);
  // TODO: UPDATE STATE to DB
}