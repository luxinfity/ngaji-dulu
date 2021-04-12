import { firestore } from "firebase-admin";

export class Tilawah {
  id: string;
  timestamp: firestore.Timestamp;
  userId: string;
  voiceFileId?: string;
  surahStart?: string;
  surahEnd?: string;
  ayatStart?: number;
  ayatEnd?: number;

  constructor(
    id: string,
    timestamp: firestore.Timestamp,
    userId: string,
    voiceFileId?: string,
    surahStart?: string,
    surahEnd?: string,
    ayatStart?: number,
    ayatEnd?: number
  ) {
    this.id = id;
    this.timestamp = timestamp;
    this.userId = userId;
    this.voiceFileId = voiceFileId;
    this.surahStart = surahStart;
    this.surahEnd = surahEnd;
    this.ayatStart = ayatStart;
    this.ayatEnd = ayatEnd;
  }
}