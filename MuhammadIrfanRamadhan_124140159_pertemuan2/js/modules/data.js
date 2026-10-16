// js/modules/data.js
// Lapisan data: localStorage + seed awal + fetch async ke API publik.
// Catatan async: fetch JSONPlaceholder adalah request jaringan ASLI (bukan setTimeout
// pura-pura). setTimeout TIDAK dipakai untuk meniru async di sini.

export const STORAGE_KEY = "spd_tasks_v1";
export const SEED_URL = "https://jsonplaceholder.typicode.com/todos?_limit=5";

// Data contoh lokal — dipakai HANYA jika localStorage kosong DAN fetch gagal/offline.
export const localSeedTasks = [
  {
    id: "seed-1",
    title: "Laporan Praktikum PAW 2",
    course: "PAW",
    desc: "Rapikan kode ES6+ dan uji CRUD sebelum screenshot.",
    deadline: "2026-10-16",
    completed: false,
    createdAt: "2026-10-10T08:00:00.000Z",
    updatedAt: "2026-10-10T08:00:00.000Z",
  },
  {
    id: "seed-2",
    title: "Latihan soal Basis Data",
    course: "Basis Data",
    desc: "Normalisasi 1NF–3NF, 10 soal.",
    deadline: "2026-10-12",
    completed: false,
    createdAt: "2026-10-09T08:00:00.000Z",
    updatedAt: "2026-10-09T08:00:00.000Z",
  },
  {
    id: "seed-3",
    title: "Baca materi React props",
    course: "PAW",
    desc: "Persiapan pertemuan 3.",
    deadline: "2026-10-08",
    completed: true,
    createdAt: "2026-10-05T08:00:00.000Z",
    updatedAt: "2026-10-07T08:00:00.000Z",
  },
];

// Muat tugas dari localStorage dengan aman (tahan data rusak).
export const loadTasks = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null; // belum ada data / pemanggil yang memutuskan seed
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed.filter((t) => t && typeof t.id !== "undefined");
  } catch {
    return null; // JSON rusak / anggap belum ada data
  }
};

// Simpan tugas (selalu dipanggil setelah tambah/edit/hapus/toggle).
export const saveTasks = (tasks = []) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

// Hapus seluruh data tersimpan (untuk tombol reset).
export const clearTasks = () => {
  localStorage.removeItem(STORAGE_KEY);
};

// Fetch async ke JSONPlaceholder, dipetakan ke model TaskItem.
// Gagal jaringan / HTTP error / throw agar pemanggil bisa fallback ke seed lokal.
export const fetchSeedTasks = async () => {
  const res = await fetch(SEED_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status} saat mengambil seed`);
  const todos = await res.json();
  const courses = ["PAW", "Basis Data", "Jaringan Komputer", "AI", "RPL"];
  return todos.slice(0, 5).map((todo, i) => {
    const due = new Date();
    due.setDate(due.getDate() + (i - 1)); // sengaja ada yang lampau/dekat agar statistik hidup
    return {
      id: `api-${todo.id}`,
      title: todo.title ? String(todo.title).slice(0, 80) : `Tugas contoh ${i + 1}`,
      course: courses[i % courses.length],
      desc: "Data contoh dari JSONPlaceholder (seed awal).",
      deadline: due.toISOString().slice(0, 10),
      completed: Boolean(todo.completed),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });
};
