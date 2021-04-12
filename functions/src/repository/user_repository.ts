import { User } from "../model/user";
import * as admin from "firebase-admin";

export async function saveUser(user: User) {
  const db = admin.firestore();
  const doc = db.collection("users").doc(user.id);
  const snapshot = await doc.get();
  if (!snapshot.exists) {
    doc.set(user);
    db.collection("statistic").doc("users").update({
      "total": admin.firestore.FieldValue.increment(1),
    });
  }
}