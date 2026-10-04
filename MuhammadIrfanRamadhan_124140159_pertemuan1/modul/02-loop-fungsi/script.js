// =======================================
// 1. Menggunakan Loop (materi)
// =======================================

// For loop
let nilaiSiswa = [85, 92, 78, 90, 88];
let total = 0;

document.getElementById("result").innerHTML += `
  <hr>
  <h3 id="daftar-nilai-siswa">Daftar Nilai Siswa:</h3>
  <ul id="daftar-nilai"></ul>
  <p id="rata-rata"></p>
`;

for (let i = 0; i < nilaiSiswa.length; i++) {
  total += nilaiSiswa[i];
  document.getElementById("daftar-nilai").innerHTML += `
    <li>Siswa ${i + 1}: ${nilaiSiswa[i]}</li>
  `;
}

let rataRata = total / nilaiSiswa.length;
document.getElementById("rata-rata").innerHTML = `
  Rata-rata nilai: <strong>${rataRata.toFixed(2)}</strong>
`;

// While loop
document.getElementById("result").innerHTML += `
  <h3 id="countdown-title">Countdown:</h3>
  <div id="countdown"></div>
`;

let hitungMundur = 5;
while (hitungMundur > 0) {
  document.getElementById("countdown").innerHTML += `
    <span class="inline-block bg-blue-100 px-2 py-1 m-1 rounded">${hitungMundur}</span>
  `;
  hitungMundur--;
}

// For...of loop (ES6)
document.getElementById("result").innerHTML += `
  <h3 id="nilai-dengan-forof">Nilai dengan for...of:</h3>
  <div id="nilai-of" class="flex flex-wrap gap-2"></div>
`;

for (let nilai of nilaiSiswa) {
  let statusNilai = nilai >= 80 ? "text-green-600" : "text-red-600";
  document.getElementById("nilai-of").innerHTML += `
    <span class="inline-block bg-gray-100 px-3 py-1 rounded ${statusNilai}">${nilai}</span>
  `;
}

// =======================================
// 2. Fungsi dan Event Handler (materi)
// =======================================

function sapaNama(nama) {
  return `Halo, ${nama}! Selamat belajar JavaScript!`;
}

// Event handler untuk tombol sapa
document.getElementById("sapa-button").addEventListener("click", function() {
  const nama = document.getElementById("nama-input").value;
  if (nama.trim() === "") {
    document.getElementById("sapa-output").innerHTML =
      `<p class="text-red-500">Silakan masukkan nama Kalian terlebih dahulu!</p>`;
  } else {
    const pesan = sapaNama(nama);
    document.getElementById("sapa-output").innerHTML =
      `<p class="text-green-500">${pesan}</p>`;
  }
});

// Fungsi untuk kalkulator
function hitungKalkulator(angka1, angka2, operasi) {
  let hasil = 0;
  switch (operasi) {
    case "tambah":
      hasil = angka1 + angka2;
      break;
    case "kurang":
      hasil = angka1 - angka2;
      break;
    case "kali":
      hasil = angka1 * angka2;
      break;
    case "bagi":
      if (angka2 === 0) {
        return "Error: Pembagian dengan nol tidak diperbolehkan";
      }
      hasil = angka1 / angka2;
      break;
    default:
      return "Operasi tidak valid";
  }
  return hasil;
}

// Event handler untuk tombol operasi matematika
document.getElementById("btn-tambah").addEventListener("click", function() {
  const angka1 = parseFloat(document.getElementById("angka1").value);
  const angka2 = parseFloat(document.getElementById("angka2").value);

  if (isNaN(angka1) || isNaN(angka2)) {
    document.getElementById("hasil-kalkulator").innerHTML =
      `<p class="text-red-500">Masukkan angka yang valid!</p>`;
  } else {
    const hasil = hitungKalkulator(angka1, angka2, "tambah");
    document.getElementById("hasil-kalkulator").innerHTML =
      `<p>Hasil: ${angka1} + ${angka2} = ${hasil}</p>`;
  }
});

document.getElementById("btn-kurang").addEventListener("click", function() {
  const angka1 = parseFloat(document.getElementById("angka1").value);
  const angka2 = parseFloat(document.getElementById("angka2").value);

  if (isNaN(angka1) || isNaN(angka2)) {
    document.getElementById("hasil-kalkulator").innerHTML =
      `<p class="text-red-500">Masukkan angka yang valid!</p>`;
  } else {
    const hasil = hitungKalkulator(angka1, angka2, "kurang");
    document.getElementById("hasil-kalkulator").innerHTML =
      `<p>Hasil: ${angka1} - ${angka2} = ${hasil}</p>`;
  }
});

document.getElementById("btn-kali").addEventListener("click", function() {
  const angka1 = parseFloat(document.getElementById("angka1").value);
  const angka2 = parseFloat(document.getElementById("angka2").value);

  if (isNaN(angka1) || isNaN(angka2)) {
    document.getElementById("hasil-kalkulator").innerHTML =
      `<p class="text-red-500">Masukkan angka yang valid!</p>`;
  } else {
    const hasil = hitungKalkulator(angka1, angka2, "kali");
    document.getElementById("hasil-kalkulator").innerHTML =
      `<p>Hasil: ${angka1} × ${angka2} = ${hasil}</p>`;
  }
});

document.getElementById("btn-bagi").addEventListener("click", function() {
  const angka1 = parseFloat(document.getElementById("angka1").value);
  const angka2 = parseFloat(document.getElementById("angka2").value);

  if (isNaN(angka1) || isNaN(angka2)) {
    document.getElementById("hasil-kalkulator").innerHTML =
      `<p class="text-red-500">Masukkan angka yang valid!</p>`;
  } else {
    const hasil = hitungKalkulator(angka1, angka2, "bagi");
    document.getElementById("hasil-kalkulator").innerHTML =
      `<p>Hasil: ${angka1} ÷ ${angka2} = ${hasil}</p>`;
  }
});

// =======================================
// 3. Latihan
// =======================================

const latihanEl = document.getElementById("latihan");
latihanEl.innerHTML = `<hr><h2>Latihan</h2>`;

// Latihan 1: tabel perkalian 1-10 untuk angka pilihan
let angkaPerkalian = 7;
let tabelHTML = `<h3>Tabel Perkalian ${angkaPerkalian}:</h3><ul>`;
for (let i = 1; i <= 10; i++) {
  const hasil = angkaPerkalian * i;
  console.log(`${angkaPerkalian} x ${i} = ${hasil}`);
  tabelHTML += `<li>${angkaPerkalian} x ${i} = ${hasil}</li>`;
}
tabelHTML += `</ul>`;
latihanEl.innerHTML += tabelHTML;

// Latihan 2: faktorial
function faktorial(n) {
  if (n < 0) return "Tidak terdefinisi untuk bilangan negatif";
  let hasil = 1;
  for (let i = 1; i <= n; i++) {
    hasil *= i;
  }
  return hasil;
}
let angkaFaktorial = 5;
console.log(`Faktorial ${angkaFaktorial} = ${faktorial(angkaFaktorial)}`);
latihanEl.innerHTML += `<p>Faktorial ${angkaFaktorial} = <strong>${faktorial(angkaFaktorial)}</strong></p>`;

// Latihan 3: bilangan prima
function isPrima(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}
let angkaPrima = 13;
console.log(`${angkaPrima} prima? ${isPrima(angkaPrima)}`);
latihanEl.innerHTML += `<p>${angkaPrima} adalah <strong>${isPrima(angkaPrima) ? "bilangan prima" : "bukan prima"}</strong></p>`;

// Latihan 4: kalkulator BMI dengan fungsi dan event handler
function hitungBMI(berat, tinggi) {
  // berat kg, tinggi meter
  if (tinggi <= 0) return "Tinggi tidak valid";
  const bmi = berat / (tinggi * tinggi);
  let kategori = "";
  if (bmi < 18.5) kategori = "Kurus";
  else if (bmi < 25) kategori = "Normal";
  else if (bmi < 30) kategori = "Overweight";
  else kategori = "Obesitas";
  return { bmi: bmi.toFixed(2), kategori };
}

latihanEl.innerHTML += `
  <h3>Kalkulator BMI</h3>
  <input type="number" id="bmi-berat" placeholder="Berat (kg)" class="border p-2 rounded">
  <input type="number" id="bmi-tinggi" placeholder="Tinggi (m, cth 1.7)" step="0.01" class="border p-2 rounded">
  <button id="bmi-btn" class="bg-blue-500 text-white px-4 py-2 rounded">Hitung BMI</button>
  <div id="bmi-output" class="mt-2"></div>
`;

document.getElementById("bmi-btn").addEventListener("click", function() {
  const berat = parseFloat(document.getElementById("bmi-berat").value);
  const tinggi = parseFloat(document.getElementById("bmi-tinggi").value);
  if (isNaN(berat) || isNaN(tinggi) || berat <= 0 || tinggi <= 0) {
    document.getElementById("bmi-output").innerHTML = `<p class="text-red-500">Masukkan berat & tinggi yang valid!</p>`;
  } else {
    const hasil = hitungBMI(berat, tinggi);
    document.getElementById("bmi-output").innerHTML = `<p>BMI: <strong>${hasil.bmi}</strong> (${hasil.kategori})</p>`;
    console.log(`BMI: ${hasil.bmi} (${hasil.kategori})`);
  }
});

// Latihan 5: FizzBuzz 1-100
let fizzbuzzHTML = `<h3>FizzBuzz 1-100:</h3><div class="flex flex-wrap gap-1">`;
for (let i = 1; i <= 100; i++) {
  let out = "";
  if (i % 3 === 0 && i % 5 === 0) out = "FizzBuzz";
  else if (i % 3 === 0) out = "Fizz";
  else if (i % 5 === 0) out = "Buzz";
  else out = i;
  if (i <= 20) console.log(out);
  fizzbuzzHTML += `<span class="inline-block bg-gray-100 px-2 py-1 rounded text-sm">${out}</span>`;
}
fizzbuzzHTML += `</div>`;
latihanEl.innerHTML += fizzbuzzHTML;
console.log("FizzBuzz 1-100 selesai ditampilkan");
