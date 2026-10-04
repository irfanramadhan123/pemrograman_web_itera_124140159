// =======================================
// 1. Array dan Metode Array (materi)
// =======================================

// Array dan metode array
const buah = ["Apel", "Jeruk", "Mangga", "Pisang", "Anggur"];

document.getElementById("result").innerHTML += `
  <hr>
  <h3 id="manipulasi-array">Manipulasi Array:</h3>
  <div id="array-demo"></div>
`;

// Menampilkan array
document.getElementById("array-demo").innerHTML += `
  <p><strong>Array buah:</strong> ${buah.join(", ")}</p>
`;

// Menambahkan item
buah.push("Durian");
document.getElementById("array-demo").innerHTML += `
  <p><strong>Setelah push Durian:</strong> ${buah.join(", ")}</p>
`;

// Menghapus item terakhir
const itemDihapus = buah.pop();
document.getElementById("array-demo").innerHTML += `
  <p><strong>Setelah pop:</strong> ${buah.join(", ")} (item dihapus: ${itemDihapus})</p>
`;

// Mengurutkan array
buah.sort();
document.getElementById("array-demo").innerHTML += `
  <p><strong>Setelah sort:</strong> ${buah.join(", ")}</p>
`;

// Array map
const hargaBuah = [10000, 8000, 15000, 5000, 20000];
const daftarBuah = buah.map((item, index) => `${item} (Rp${hargaBuah[index].toLocaleString()})`);

document.getElementById("array-demo").innerHTML += `
  <p><strong>Array dengan harga:</strong> ${daftarBuah.join(", ")}</p>
`;

// Array filter
const buahMahal = buah.filter((item, index) => hargaBuah[index] > 10000);
document.getElementById("array-demo").innerHTML += `
  <p><strong>Buah dengan harga > 10.000:</strong> ${buahMahal.join(", ")}</p>
`;

// =======================================
// 2. Bekerja dengan Objek (materi)
// =======================================

// Objek
const mahasiswa = {
  nama: "Budi Santoso",
  nim: "20210001",
  jurusan: "Teknik Informatika",
  nilai: {
    algoritma: 85,
    basis_data: 90,
    web: 88
  },
  hobi: ["Coding", "Membaca", "Futsal"],
  tampilkanInfo: function() {
    return `${this.nama} (${this.nim}) - ${this.jurusan}`;
  },
  hitungRataRata: function() {
    const nilaiArray = Object.values(this.nilai);
    const total = nilaiArray.reduce((sum, nilai) => sum + nilai, 0);
    return (total / nilaiArray.length).toFixed(2);
  }
};

document.getElementById("result").innerHTML += `
  <hr>
  <h3 id="manipulasi-objek">Manipulasi Objek:</h3>
  <div id="objek-demo"></div>
`;

// Menampilkan informasi objek
document.getElementById("objek-demo").innerHTML += `
  <p><strong>Info Mahasiswa:</strong> ${mahasiswa.tampilkanInfo()}</p>
  <p><strong>Rata-rata Nilai:</strong> ${mahasiswa.hitungRataRata()}</p>
  <p><strong>Hobi:</strong> ${mahasiswa.hobi.join(", ")}</p>
`;

// Menambahkan properti baru ke objek
mahasiswa.email = "budi.santoso@example.com";
document.getElementById("objek-demo").innerHTML += `
  <p><strong>Email:</strong> ${mahasiswa.email}</p>
`;

// Mengubah nilai properti
mahasiswa.nilai.web = 92;
document.getElementById("objek-demo").innerHTML += `
  <p><strong>Nilai Web setelah diubah:</strong> ${mahasiswa.nilai.web}</p>
`;

// Menghapus properti
delete mahasiswa.hobi;
document.getElementById("objek-demo").innerHTML += `
  <p><strong>Hobi setelah dihapus:</strong> ${mahasiswa.hobi ? mahasiswa.hobi.join(", ") : "Tidak ada data hobi"}</p>
`;

// =======================================
// 3. Latihan
// =======================================

const latihanEl = document.getElementById("latihan");
latihanEl.innerHTML = `<hr><h2>Latihan</h2><div id="latihan-output"></div>`;
const out = document.getElementById("latihan-output");

// Latihan 1: array 5 objek mahasiswa tampil tabel HTML
let dataMahasiswa = [
  { nama: "Andi", nim: "124140001", jurusan: "Informatika", nilai: 85 },
  { nama: "Budi", nim: "124140002", jurusan: "Informatika", nilai: 92 },
  { nama: "Citra", nim: "124140003", jurusan: "Sistem Informasi", nilai: 78 },
  { nama: "Dewi", nim: "124140004", jurusan: "Teknik Elektro", nilai: 88 },
  { nama: "Eko", nim: "124140005", jurusan: "Informatika", nilai: 70 }
];

function renderTabel(data) {
  let html = `<table border="1" cellpadding="8" cellspacing="0">
    <thead><tr><th>No</th><th>Nama</th><th>NIM</th><th>Jurusan</th><th>Nilai</th><th>Aksi</th></tr></thead><tbody>`;
  data.forEach((m, i) => {
    html += `<tr>
      <td>${i + 1}</td><td>${m.nama}</td><td>${m.nim}</td><td>${m.jurusan}</td><td>${m.nilai}</td>
      <td>
        <button onclick="editMahasiswa(${i})">Edit</button>
        <button onclick="hapusMahasiswa(${i})">Hapus</button>
      </td>
    </tr>`;
  });
  html += `</tbody></table>`;
  return html;
}

out.innerHTML += `<h3>Latihan 1 - Tabel Mahasiswa:</h3><div id="tabel-mhs"></div>`;
document.getElementById("tabel-mhs").innerHTML = renderTabel(dataMahasiswa);

// Latihan 2: nilai tertinggi dengan method array
function cariNilaiTertinggi(data) {
  return data.reduce((max, m) => (m.nilai > max.nilai ? m : max), data[0]);
}
const terbaik = cariNilaiTertinggi(dataMahasiswa);
console.log("Nilai tertinggi:", terbaik);
out.innerHTML += `<p>Latihan 2 - Nilai tertinggi: <strong>${terbaik.nama} (${terbaik.nilai})</strong></p>`;

// Latihan 3: filter di atas rata-rata
function hitungRataRataNilai(data) {
  const total = data.reduce((sum, m) => sum + m.nilai, 0);
  return total / data.length;
}
const rata2 = hitungRataRataNilai(dataMahasiswa);
const diAtasRata = dataMahasiswa.filter(m => m.nilai > rata2);
out.innerHTML += `<p>Latihan 3 - Rata-rata: <strong>${rata2.toFixed(2)}</strong>, Di atas rata-rata: <strong>${diAtasRata.map(m => m.nama).join(", ")}</strong></p>`;

// Latihan 4: sort nama ascending/descending
function urutkanNama(data, arah = "asc") {
  const salin = [...data];
  salin.sort((a, b) => arah === "asc" ? a.nama.localeCompare(b.nama) : b.nama.localeCompare(a.nama));
  return salin;
}
out.innerHTML += `
  <p>Latihan 4 - Asc: <strong>${urutkanNama(dataMahasiswa, "asc").map(m => m.nama).join(", ")}</strong></p>
  <p>Latihan 4 - Desc: <strong>${urutkanNama(dataMahasiswa, "desc").map(m => m.nama).join(", ")}</strong></p>
`;

// Latihan 5: CRUD sederhana dengan event handler
out.innerHTML += `
  <h3>Latihan 5 - CRUD Mahasiswa:</h3>
  <input type="text" id="mhs-nama" placeholder="Nama" class="border p-2 rounded">
  <input type="text" id="mhs-nim" placeholder="NIM" class="border p-2 rounded">
  <input type="number" id="mhs-nilai" placeholder="Nilai" class="border p-2 rounded">
  <button id="mhs-tambah" class="bg-blue-500 text-white px-4 py-2 rounded">Tambah</button>
  <div id="crud-info" class="mt-2"></div>
`;

let indexEdit = -1; // -1 = mode tambah, selain itu = index yang sedang diedit

function resetFormMahasiswa() {
  document.getElementById("mhs-nama").value = "";
  document.getElementById("mhs-nim").value = "";
  document.getElementById("mhs-nilai").value = "";
  document.getElementById("mhs-tambah").innerText = "Tambah";
  indexEdit = -1;
}

document.getElementById("mhs-tambah").addEventListener("click", function() {
  const nama = document.getElementById("mhs-nama").value.trim();
  const nim = document.getElementById("mhs-nim").value.trim();
  const nilai = parseFloat(document.getElementById("mhs-nilai").value);
  if (nama === "" || nim === "" || isNaN(nilai)) {
    document.getElementById("crud-info").innerHTML = `<p style="color:red">Lengkapi nama, NIM, dan nilai!</p>`;
    return;
  }

  if (indexEdit === -1) {
    // Create
    dataMahasiswa.push({ nama, nim, jurusan: "Informatika", nilai });
    document.getElementById("crud-info").innerHTML = `<p style="color:green">Data ${nama} ditambahkan.</p>`;
  } else {
    // Update
    dataMahasiswa[indexEdit] = { ...dataMahasiswa[indexEdit], nama, nim, nilai };
    document.getElementById("crud-info").innerHTML = `<p style="color:green">Data ${nama} diperbarui.</p>`;
  }

  // Read (render ulang tabel)
  document.getElementById("tabel-mhs").innerHTML = renderTabel(dataMahasiswa);
  resetFormMahasiswa();
});

// Update: isi form dengan data yang dipilih
function editMahasiswa(index) {
  const m = dataMahasiswa[index];
  document.getElementById("mhs-nama").value = m.nama;
  document.getElementById("mhs-nim").value = m.nim;
  document.getElementById("mhs-nilai").value = m.nilai;
  document.getElementById("mhs-tambah").innerText = "Simpan Perubahan";
  indexEdit = index;
}

// Delete (dipakai tombol Hapus di tabel)
function hapusMahasiswa(index) {
  const dihapus = dataMahasiswa.splice(index, 1)[0];
  document.getElementById("tabel-mhs").innerHTML = renderTabel(dataMahasiswa);
  document.getElementById("crud-info").innerHTML = `<p>Data ${dihapus.nama} dihapus.</p>`;
  resetFormMahasiswa();
}
