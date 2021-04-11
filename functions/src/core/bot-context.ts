import { Context } from "telegraf";

export interface BotContext extends Context {
    firstName?: string
    userId: string
}