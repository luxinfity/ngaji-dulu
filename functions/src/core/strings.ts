export const startReply = `
Bot ini berfungsi untuk membantu kamu,
melakukan pengukuran terhadap kebiasaan tilawah mu\\.
Guna meningkatkan kebiasaan positif bertilawah selama bulan Ramadan ini\\.
 
Baca tutorial lengkap di [sini](https://luxinfity\\.github\\.io/ngaji\\-dulu/)\\.

Ketikkan
/help \\- Untuk memunculkan kembali pesan ini
/read \\- Untuk mulai mengaji
/profile \\- Untuk melihat progress kamu
/reset \\- Untuk merestart progress kamu
/quit \\- Untuk berhenti menggunakan bot

Jika ada saran dan masukan silahkan [chat](t\\.me/alifgiant) admin kami
`;

export const readStartReply = `
Agar bot ini dapat mencatat tilawah mu, kamu perlu mengirimkan rekaman kepada bot ini.

Bisa dengan merekam menggunakan aplikai voice recorder di hp mu lalu share ke bot,
ataupun menggunakan voice message (tekan dan tahan tombol mic lalu geser ke ikon gembok). 

Sesi tilawah bisa dimulai dengan mengirimkan rekaman telebih dahulu ataupun memilih surah dahulu dengan klik tombol dibawah.
`;

export const readEndReply = `
Kamu sudah memilih posisi mulai, silahkan pilih posisi akhir bacaaan dengan mengklik tombol dibawah.
`;

export const pleaseSelectAyat = "silahkan reply chat ini dan tuliskan ayat";
export function selectAyatReply(surahName: string, isStart: boolean): string {
  const flag = isStart ? "mulai" : "akhir";
  return `Kamu memilih ${surahName}, ${pleaseSelectAyat} ${flag}`;
}

export const profileReply = `
Kamu sudah menyelesaikan membaca quran xx%
Minggu ini kamu mengaji total x jam nn menit\\.
Silahkan klik [disini](https://google\\.com) untuk melihat lebih banyak statistik\\.
`;

export const resetReply = "progress mu telah di reset";

export const quitReply = `
Semoga amal ibadah kita diterima disisinya, sampai berjumpa lagi
`;
