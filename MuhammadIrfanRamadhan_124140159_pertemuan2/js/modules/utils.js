// js/modules/utils.js
// Kumpulan fungsi utilitas murni (pure) yang dipakai bersama.
// Semua ditulis sebagai arrow function (memenuhi syarat minimal 3 arrow functions).

// Membuat ID unik stabil (tidak memakai indeks array sebagai identitas).
export const createId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `task-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;

// Menghindari XSS: teks pengguna selalu di-escape sebelum masuk innerHTML.
export const escapeHTML = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

// Format tanggal YYYY-MM-DD / "12 Okt 2026" (id-ID). Aman untuk tanggal invalid.
export const formatTanggal = (isoDate = "") => {
  const d = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(d.getTime())) return isoDate || "-";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
};

// True jika deadline sudah lewat hari ini dan tugas belum selesai.
export const isOverdue = (deadline = "", completed = false) => {
  if (completed || !deadline) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(`${deadline}T00:00:00`);
  return !Number.isNaN(due.getTime()) && due < today;
};
