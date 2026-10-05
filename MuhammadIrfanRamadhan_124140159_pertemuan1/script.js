// Mini POS - Kasir Kantin Kampus

const STORAGE_KEY = "pos_cart_124140159";
const BATAS_DISKON = 50000;
const PERSEN_DISKON = 0.1;

let cart = loadCart();

const formBarang = document.getElementById("form-barang");
const inputNama = document.getElementById("nama-barang");
const inputHarga = document.getElementById("harga-barang");
const inputQty = document.getElementById("qty-barang");
const inputBayar = document.getElementById("uang-bayar");

formBarang.addEventListener("submit", function(e) {
  e.preventDefault();
  tambahBarang();
});

document.getElementById("btn-reset").addEventListener("click", function() {
  resetTransaksi();
});

const inputPromo = document.getElementById("kode-promo");
const KODE_PROMO = "HEMAT10";

inputBayar.addEventListener("input", function() {
  renderRingkasan();
});

inputPromo.addEventListener("input", function() {
  renderRingkasan();
});

// ---------- Validasi ----------
function validasiInput(nama, harga, qty) {
  let valid = true;

  // Mereset pesan
  document.getElementById("error-nama").innerText = "";
  document.getElementById("error-harga").innerText = "";
  document.getElementById("error-qty").innerText = "";

  // Nama: min 3 karakter
  if (!nama || nama.trim().length < 3) {
    document.getElementById("error-nama").innerText = "Nama barang wajib diisi, minimal 3 karakter.";
    valid = false;
  }

  // Harga: angka positif, minimal 500
  if (inputHarga.value.trim() === "" || isNaN(harga)) {
    document.getElementById("error-harga").innerText = "Harga satuan wajib diisi dengan angka.";
    valid = false;
  } else if (harga <= 0) {
    document.getElementById("error-harga").innerText = "Harga tidak boleh 0 atau negatif.";
    valid = false;
  } else if (harga < 500) {
    document.getElementById("error-harga").innerText = "Harga minimal Rp500.";
    valid = false;
  }

  // Qty: bilangan bulat minimal 1
  const qtyNum = Number(qty);
  if (inputQty.value.trim() === "" || !Number.isInteger(qtyNum) || qtyNum < 1) {
    document.getElementById("error-qty").innerText = "Qty wajib angka bulat, minimal 1.";
    valid = false;
  }

  return valid;
}

// ---------- Keranjang ----------
function tambahBarang() {
  const nama = inputNama.value;
  const harga = Number(inputHarga.value);
  const qty = Number(inputQty.value);

  if (!validasiInput(nama, harga, qty)) {
    return; // mencegah masuk keranjang jika tidak valid
  }

  cart.push({
    nama: nama.trim(),
    harga: harga,
    qty: qty,
    subtotal: harga * qty
  });

  saveCart();
  renderSemua();

  // Reset form jika berhasil
  formBarang.reset();
  inputNama.focus();
}

function hapusItem(index) {
  cart.splice(index, 1);
  saveCart();
  renderSemua();
}

function resetTransaksi() {
  cart = [];
  localStorage.removeItem(STORAGE_KEY);
  inputBayar.value = "";
  inputPromo.value = "";
  renderSemua();
}

// ---------- Kalkulator ----------
function hitungTotal() {
  return cart.reduce((sum, item) => sum + item.subtotal, 0);
}

function promoValid() {
  return inputPromo.value.trim().toUpperCase() === KODE_PROMO;
}

function hitungDiskon(total) {
  // Diskon 10% jika total >= Rp50.000 atau kode promo HEMAT10 valid
  if (total >= BATAS_DISKON || (total > 0 && promoValid())) {
    return Math.round(total * PERSEN_DISKON);
  }
  return 0;
}

function formatRupiah(n) {
  return "Rp" + Number(n).toLocaleString("id-ID");
}

function renderTabel() {
  const tbody = document.getElementById("keranjang-body");
  tbody.innerHTML = "";

  cart.forEach((item, i) => {
    const tr = document.createElement("tr");
    // textContent agar nama barang tidak dieksekusi sebagai HTML
    [i + 1, item.nama, formatRupiah(item.harga), item.qty, formatRupiah(item.subtotal)].forEach(nilai => {
      const td = document.createElement("td");
      td.textContent = nilai;
      tr.appendChild(td);
    });

    const tdAksi = document.createElement("td");
    const btnHapus = document.createElement("button");
    btnHapus.className = "btn btn-small";
    btnHapus.textContent = "Hapus";
    btnHapus.addEventListener("click", () => hapusItem(i));
    tdAksi.appendChild(btnHapus);
    tr.appendChild(tdAksi);
    tbody.appendChild(tr);
  });

  document.getElementById("keranjang-kosong").style.display = cart.length === 0 ? "block" : "none";
}

function renderRingkasan() {
  const total = hitungTotal();
  const diskon = hitungDiskon(total);
  const totalAkhir = total - diskon;

  document.getElementById("total-belanja").innerText = formatRupiah(total);
  document.getElementById("diskon").innerText = formatRupiah(diskon);
  document.getElementById("total-akhir").innerText = formatRupiah(totalAkhir);

  const bayar = Number(inputBayar.value);
  const info = document.getElementById("info-bayar");

  if (inputBayar.value === "" || isNaN(bayar)) {
    document.getElementById("kembalian").innerText = formatRupiah(0);
    info.innerText = "";
    info.className = "muted";
    return;
  }

  const kembalian = bayar - totalAkhir;
  if (kembalian < 0) {
    document.getElementById("kembalian").innerText = formatRupiah(0);
    info.innerText = "Uang belum mencukupi untuk total akhir.";
    info.className = "info-warn";
  } else {
    document.getElementById("kembalian").innerText = formatRupiah(kembalian);
    info.innerText = "Pembayaran cukup.";
    info.className = "info-ok";
  }
}

function renderSemua() {
  renderTabel();
  renderRingkasan();
}

// ---------- LocalStorage ----------
function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function loadCart() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Gagal memuat cart:", e);
    return [];
  }
}

// Init saat halaman dimuat
renderSemua();
