import { classToPlain } from 'class-transformer';
import { firestore } from "firebase-admin";
import { Tilawah } from "../model/tilawah";
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
      const data = classToPlain(tilawah, { exposeUnsetFields: false });
      let doc = await collection.add(Object.assign({}, data));
      await collection.doc(doc.id).update({ "id": doc.id });
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

  const data = classToPlain(tilawah, { exposeUnsetFields: false });
  await collection.doc(tilawah.id).update(data);
}