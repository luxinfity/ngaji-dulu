import { Tilawah } from "../model/tilawah";
import { firestore } from "firebase-admin";
import { logger } from "firebase-functions";
import * as stat from "./statistic_repository";

/**
 * create new tilawah record if the id is still undefined
 * @param {Tilawah} tilawah record data
 * @return {Promise<void>}
 */
export async function createTilawah(tilawah: Tilawah): Promise<void> {
  const db = firestore();
  const collection = db.collection("records");

  try {
    if (!tilawah.id) {
      // create new instance
      let doc = await collection.add(tilawah);
      tilawah.id = doc.id;
      await collection.doc(tilawah.id).update({ "id": tilawah.id });
      stat.increaseTilawah();
    } else {
      logger.error(`record with ${tilawah.id} is already exist, consider using editTilawah()`);
    }
  } catch (error) {
    logger.error(error);
  }
}

/**
 * edit tilawah record
 * @param {Tilawah} tilawah record data
 * @return {Promise<void>}
 */
export async function editTilawah(tilawah: Tilawah): Promise<void> {
  const db = firestore();
  const collection = db.collection("records");

  if (!tilawah.id) {
    logger.error(`record not found`);
    return;
  }

  await collection.doc(tilawah.id).update(tilawah);
}