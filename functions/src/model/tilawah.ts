import { firestore } from "firebase-admin";

export class Tilawah {
  userId: string;
  timestamp: firestore.Timestamp;
  id?: string;
  voiceFileId?: string;
  surahStart?: string;
  surahEnd?: string;
  ayatStart?: number;
  ayatEnd?: number;

  constructor(
    userId: string,
    timestamp: firestore.Timestamp,
    id?: string,
    voiceFileId?: string,
    surahStart?: string,
    surahEnd?: string,
    ayatStart?: number,
    ayatEnd?: number
  ) {
    this.userId = userId;
    this.timestamp = timestamp;
    this.id = id;
    this.voiceFileId = voiceFileId;
    this.surahStart = surahStart;
    this.surahEnd = surahEnd;
    this.ayatStart = ayatStart;
    this.ayatEnd = ayatEnd;
  }
}