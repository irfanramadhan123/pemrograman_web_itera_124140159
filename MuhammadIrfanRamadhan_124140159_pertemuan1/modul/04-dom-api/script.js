// 1. Manipulasi DOM (materi)

// Manipulasi DOM
const domOutput = document.getElementById("dom-output");
let itemCount = 0;

// Fungsi untuk menambahkan item
document.getElementById("btn-tambah-item").addEventListener("click", function() {
  itemCount++;
  const newItem = document.createElement("div");
  newItem.className = "p-2 mb-2 bg-gray-100 rounded";
  newItem.innerText = `Item ${itemCount}`;
  domOutput.appendChild(newItem);
});

// Fungsi untuk menghapus item
document.getElementById("btn-hapus-item").addEventListener("click", function() {
  if (domOutput.lastChild) {
    domOutput.removeChild(domOutput.lastChild);
    itemCount--;
  }
});

// Fungsi untuk mengubah warna background
document.getElementById("btn-ubah-warna").addEventListener("click", function() {
  const colors = ["bg-blue-100", "bg-green-100", "bg-yellow-100", "bg-pink-100"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  domOutput.className = `p-4 mb-3 ${randomColor} rounded`;
});

// 2. Fetch API dan Async/Await (materi)

// Fetch API dengan async/await
let semuaPost = [];

document.getElementById("btn-fetch").addEventListener("click", async function() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    semuaPost = data;
    tampilkanPost(data.slice(0, 5));
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("api-output").innerHTML = `
      <div class="p-3 bg-red-100 text-red-800 rounded">
        Gagal mengambil data: ${error.message}
      </div>
    `;
  }
});

function tampilkanPost(list) {
  const apiOutput = document.getElementById("api-output");
  apiOutput.innerHTML = "<h3 class='font-bold mb-2'>Daftar Post:</h3>";
  list.forEach(post => {
    apiOutput.innerHTML += `
      <div class="p-3 mb-2 bg-gray-100 rounded">
        <h4 class="font-semibold">${post.title}</h4>
        <p class="text-sm">${post.body}</p>
      </div>
    `;
  });
}

// 3. Latihan

const latihanEl = document.getElementById("latihan");
latihanEl.innerHTML = `
<hr><h2>Latihan DOM & API</h2>

<h3>Latihan 1 & 2 - Form Mahasiswa + Validasi + localStorage</h3>
<input type="text" id="lat-nama" placeholder="Nama" class="border p-2 rounded">
<input type="text" id="lat-nim" placeholder="NIM" class="border p-2 rounded">
<button id="lat-tambah-mhs" class="bg-blue-500 text-white px-4 py-2 rounded">Tambah</button>
<div id="lat-error" class="text-red-500 mt-2"></div>
<ul id="lat-list-mhs" class="mt-2"></ul>

<h3 class="mt-4">Latihan 6 - Todo List + localStorage</h3>
<input type="text" id="todo-input" placeholder="Tugas baru" class="border p-2 rounded">
<button id="todo-tambah" class="bg-green-500 text-white px-4 py-2 rounded">Tambah Todo</button>
<ul id="todo-list" class="mt-2"></ul>

<h3 class="mt-4">Latihan 3 - Search Post dari API</h3>
<input type="text" id="search-post" placeholder="Cari title post..." class="border p-2 rounded w-full">
<div class="mt-2"><button id="search-btn" class="bg-purple-500 text-white px-4 py-2 rounded">Cari</button></div>

<h3 class="mt-4">Latihan 4 - Dark Mode Toggle</h3>
<button id="dark-toggle" class="bg-gray-800 text-white px-4 py-2 rounded">Toggle Dark Mode</button>

<h3 class="mt-4">Latihan 5 - Pagination Post</h3>
<div>
  <button id="prev-btn" class="bg-gray-500 text-white px-3 py-1 rounded">Previous</button>
  <span id="page-info" class="mx-2">Hal 1</span>
  <button id="next-btn" class="bg-gray-500 text-white px-3 py-1 rounded">Next</button>
</div>
`;

// Latihan 1: form + validasi
// Latihan 2: data mahasiswa disimpan persisten di localStorage
const KEY_MHS = "mahasiswa_latihan";
let mahasiswaLat = JSON.parse(localStorage.getItem(KEY_MHS) || "[]");

function renderMahasiswaLat() {
  const ul = document.getElementById("lat-list-mhs");
  ul.innerHTML = "";
  mahasiswaLat.forEach((m, i) => {
    const li = document.createElement("li");
    li.innerText = `${m.nama} (${m.nim}) `;
    const btn = document.createElement("button");
    btn.innerText = "Hapus";
    btn.addEventListener("click", function() {
      mahasiswaLat.splice(i, 1);
      simpanMahasiswaLat();
    });
    li.appendChild(btn);
    ul.appendChild(li);
  });
}

function simpanMahasiswaLat() {
  localStorage.setItem(KEY_MHS, JSON.stringify(mahasiswaLat));
  renderMahasiswaLat();
}

document.getElementById("lat-tambah-mhs").addEventListener("click", function() {
  const nama = document.getElementById("lat-nama").value.trim();
  const nim = document.getElementById("lat-nim").value.trim();
  const err = document.getElementById("lat-error");
  if (nama.length < 3) {
    err.innerText = "Nama minimal 3 karakter!";
    return;
  }
  if (!/^[0-9]{9}$/.test(nim)) {
    err.innerText = "NIM wajib 9 digit angka!";
    return;
  }
  err.innerText = "";
  mahasiswaLat.push({ nama, nim });
  simpanMahasiswaLat();
  document.getElementById("lat-nama").value = "";
  document.getElementById("lat-nim").value = "";
});
renderMahasiswaLat();

// Latihan 6: Todo + localStorage
let todos = JSON.parse(localStorage.getItem("todos_latihan") || "[]");
function renderTodos() {
  const ul = document.getElementById("todo-list");
  ul.innerHTML = "";
  todos.forEach((t, i) => {
    const li = document.createElement("li");
    li.innerHTML = `<span style="${t.selesai ? "text-decoration:line-through" : ""}">${t.teks}</span>
      <button onclick="toggleTodo(${i})">Selesai</button>
      <button onclick="hapusTodo(${i})">Hapus</button>`;
    ul.appendChild(li);
  });
  localStorage.setItem("todos_latihan", JSON.stringify(todos));
}
function toggleTodo(i) { todos[i].selesai = !todos[i].selesai; renderTodos(); }
function hapusTodo(i) { todos.splice(i, 1); renderTodos(); }
document.getElementById("todo-tambah").addEventListener("click", function() {
  const v = document.getElementById("todo-input").value.trim();
  if (v === "") return;
  todos.push({ teks: v, selesai: false });
  document.getElementById("todo-input").value = "";
  renderTodos();
});
renderTodos();

// Latihan 3: search/filter title
document.getElementById("search-btn").addEventListener("click", function() {
  const key = document.getElementById("search-post").value.toLowerCase();
  const hasil = semuaPost.filter(p => p.title.toLowerCase().includes(key)).slice(0, 5);
  if (hasil.length === 0) {
    document.getElementById("api-output").innerHTML = `<p>Klik "Ambil Data" dulu, lalu cari lagi. Tidak ada hasil untuk "${key}".</p>`;
  } else {
    tampilkanPost(hasil);
  }
});

// Latihan 4: dark mode toggle via class
document.getElementById("dark-toggle").addEventListener("click", function() {
  document.body.classList.toggle("dark-mode");
});

// Latihan 5: pagination sederhana
let halaman = 1;
const perHalaman = 5;
function renderHalaman() {
  if (semuaPost.length === 0) {
    document.getElementById("page-info").innerText = "Klik Ambil Data dulu";
    return;
  }
  const mulai = (halaman - 1) * perHalaman;
  tampilkanPost(semuaPost.slice(mulai, mulai + perHalaman));
  document.getElementById("page-info").innerText = `Hal ${halaman}`;
}
document.getElementById("prev-btn").addEventListener("click", function() {
  if (halaman > 1) { halaman--; renderHalaman(); }
});
document.getElementById("next-btn").addEventListener("click", function() {
  const maxHal = Math.ceil(semuaPost.length / perHalaman);
  if (halaman < maxHal) { halaman++; renderHalaman(); }
});
