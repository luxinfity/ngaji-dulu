import { firestore } from "firebase-admin";

export async function increaseUser() {
  const db = firestore();
  const doc = db.collection("statistic").doc("users");
  if (!(await doc.get()).exists) {
    await doc.set({ "total": 0 });
  }

  await doc.update({
    "total": firestore.FieldValue.increment(1),
  });
}

export async function increaseTilawah() {
  const db = firestore();
  const doc = db.collection("statistic").doc("records");
  if (!(await doc.get()).exists) {
    await doc.set({ "total": 0 });
  }

  await doc.update({
    "total": firestore.FieldValue.increment(1),
  });
}