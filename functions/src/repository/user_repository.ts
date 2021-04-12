import { logger } from "firebase-functions";
import { firestore } from "firebase-admin";
import { User } from "../model/user";
import * as stat from "./statistic_repository";

/**
 * Add a new user to firestore database.
 * @param {User} user user data
 * @return {Promise<void>}
 */
export async function saveUser(user: User): Promise<void> {
  try {
    const db = firestore();
    const doc = db.collection("users").doc(user.id);
    const snapshot = await doc.get();
    if (!snapshot.exists) {
      doc.set(Object.assign({}, user));
      stat.increaseUser();
    }
  } catch (error) {
    logger.error(error);
  }
}