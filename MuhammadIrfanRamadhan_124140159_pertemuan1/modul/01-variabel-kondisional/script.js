// 1. Mengenal Variabel dan Output

// Mendeklarasikan variabel dengan var, let, dan const
var nama = "Budi";
let usia = 20;
const TAHUN_LAHIR = 2004;

// Menampilkan output ke konsol
console.log("Nama: " + nama);
console.log("Usia: " + usia);
console.log("Tahun Lahir: " + TAHUN_LAHIR);

// Menampilkan output ke halaman HTML
document.getElementById("result").innerHTML = `
  <p>Nama: <strong>${nama}</strong></p>
  <p>Usia: <strong>${usia}</strong></p>
  <p>Tahun Lahir: <strong>${TAHUN_LAHIR}</strong></p>
`;

// 2. Implementasi Struktur Kondisional

// Struktur kondisional
let nilai = 85;
let grade = "";

// If-else if-else
if (nilai >= 90) {
  grade = "A";
} else if (nilai >= 80) {
  grade = "B";
} else if (nilai >= 70) {
  grade = "C";
} else if (nilai >= 60) {
  grade = "D";
} else {
  grade = "E";
}

console.log("Nilai: " + nilai + ", Grade: " + grade);

document.getElementById("result").innerHTML += `
  <hr>
  <p>Nilai: <strong>${nilai}</strong></p>
  <p>Grade: <strong>${grade}</strong></p>
`;

// Ternary operator
let status = nilai >= 60 ? "Lulus" : "Tidak Lulus";
console.log("Status: " + status);

document.getElementById("result").innerHTML += `
  <p>Status: <strong>${status}</strong></p>
`;

// Switch case
let hari = new Date().getDay();
let namaHari = "";

switch (hari) {
  case 0:
    namaHari = "Minggu";
    break;
  case 1:
    namaHari = "Senin";
    break;
  case 2:
    namaHari = "Selasa";
    break;
  case 3:
    namaHari = "Rabu";
    break;
  case 4:
    namaHari = "Kamis";
    break;
  case 5:
    namaHari = "Jumat";
    break;
  case 6:
    namaHari = "Sabtu";
    break;
  default:
    namaHari = "Hari tidak valid";
}

console.log("Hari ini adalah: " + namaHari);

document.getElementById("result").innerHTML += `
  <p>Hari ini adalah: <strong>${namaHari}</strong></p>
`;

// 3. Latihan

document.getElementById("result").innerHTML += `<hr><h2>Latihan</h2>`;

// Latihan 1: variabel data diri dengan const dan let
const namaSaya = "Muhammad Irfan Ramadhan";
let umurSaya = 20;
let kotaAsalSaya = "Bandar Lampung";

console.log("Latihan 1 - Nama: " + namaSaya + ", Umur: " + umurSaya + ", Kota: " + kotaAsalSaya);

document.getElementById("result").innerHTML += `
  <p>Data Diri - Nama: <strong>${namaSaya}</strong>, Umur: <strong>${umurSaya}</strong>, Kota Asal: <strong>${kotaAsalSaya}</strong></p>
`;

// Latihan 2: pengecekan kelulusan nilai >= 70
let nilaiUjian = 75;
let kelulusan = "";

if (nilaiUjian >= 70) {
  kelulusan = "Lulus";
} else {
  kelulusan = "Tidak Lulus";
}

console.log("Latihan 2 - Nilai: " + nilaiUjian + ", " + kelulusan);

document.getElementById("result").innerHTML += `
  <p>Latihan 2 - Nilai: <strong>${nilaiUjian}</strong>, Keterangan: <strong>${kelulusan}</strong></p>
`;

// Latihan 3: kategori umur
let umurKategori = 20;
let kategori = "";

if (umurKategori < 12) {
  kategori = "Anak";
} else if (umurKategori >= 12 && umurKategori <= 17) {
  kategori = "Remaja";
} else if (umurKategori >= 18 && umurKategori <= 59) {
  kategori = "Dewasa";
} else {
  kategori = "Lansia";
}

console.log("Latihan 3 - Umur: " + umurKategori + ", Kategori: " + kategori);

document.getElementById("result").innerHTML += `
  <p>Latihan 3 - Umur: <strong>${umurKategori}</strong>, Kategori: <strong>${kategori}</strong></p>
`;

// Latihan 4: switch-case angka hari (1-7) ke nama hari bahasa Inggris
let angkaHari = 3;
let namaHariInggris = "";

switch (angkaHari) {
  case 1:
    namaHariInggris = "Sunday";
    break;
  case 2:
    namaHariInggris = "Monday";
    break;
  case 3:
    namaHariInggris = "Tuesday";
    break;
  case 4:
    namaHariInggris = "Wednesday";
    break;
  case 5:
    namaHariInggris = "Thursday";
    break;
  case 6:
    namaHariInggris = "Friday";
    break;
  case 7:
    namaHariInggris = "Saturday";
    break;
  default:
    namaHariInggris = "Invalid day";
}

console.log("Latihan 4 - Angka hari: " + angkaHari + ", Hari: " + namaHariInggris);

document.getElementById("result").innerHTML += `
  <p>Latihan 4 - Angka Hari: <strong>${angkaHari}</strong>, Hari (Inggris): <strong>${namaHariInggris}</strong></p>
`;

// Latihan 5: kalkulator grade nilai dengan ternary operator
let nilaiAkhir = 85;
let gradeAkhir =
  nilaiAkhir >= 90 ? "A"
  : nilaiAkhir >= 80 ? "B"
  : nilaiAkhir >= 70 ? "C"
  : nilaiAkhir >= 60 ? "D"
  : "E";

console.log("Latihan 5 - Nilai: " + nilaiAkhir + ", Grade: " + gradeAkhir);

document.getElementById("result").innerHTML += `
  <p>Latihan 5 - Nilai: <strong>${nilaiAkhir}</strong>, Grade (ternary): <strong>${gradeAkhir}</strong></p>
`;
