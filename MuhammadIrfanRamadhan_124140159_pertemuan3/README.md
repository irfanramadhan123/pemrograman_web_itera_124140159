# Aplikasi Manajemen Buku Pribadi

Nama: Muhammad Irfan Ramadhan
NIM: 124140159
Praktikum Pengembangan Aplikasi Web — Pertemuan 3 (React)

## Tentang aplikasi

Aplikasi untuk mencatat buku yang dimiliki, sedang dibaca, atau ingin dibeli.
Dibuat pakai React (Vite).

Fitur:
- Tambah, edit, dan hapus buku (judul, penulis, status)
- Filter buku berdasarkan status
- Cari buku berdasarkan judul atau nama penulis
- Validasi form, kolom kosong ditandai merah dengan pesan error
- Halaman statistik jumlah buku per status
- Data tersimpan di localStorage jadi tidak hilang saat refresh

## Cara menjalankan

1. Buka folder ini di VS Code
2. Buka terminal, lalu jalankan:

```bash
npm install
npm run dev
```

3. Buka `http://localhost:5173` di browser

Untuk menjalankan unit test: `npm test`

## Screenshot

### Halaman beranda
![Beranda](screenshots/01-beranda.png)

### Validasi form
![Validasi](screenshots/02-validasi.png)

### Halaman statistik
![Statistik](screenshots/03-statistik.png)

## Fitur React yang dipakai

| Materi | File |
|---|---|
| useState & useEffect | `pages/Home/Home.jsx`, `components/BookForm/BookForm.jsx`, `hooks/useLocalStorage.js` |
| Komponen reusable | `BookForm`, `BookList`, `BookItem`, `BookFilter`, `Navbar` |
| Context API | `context/BookContext.jsx` |
| React Router | `App.jsx` (halaman `/` dan `/stats`) |
| Custom hooks | `hooks/useLocalStorage.js`, `hooks/useBookStats.js` |
| PropTypes | semua komponen di folder `components/` |

## Laporan testing

Testing pakai Vitest + React Testing Library, total 15 test dan semuanya lolos.

![Hasil test](screenshots/04-hasil-test.png)
