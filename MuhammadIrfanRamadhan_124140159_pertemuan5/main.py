# Pengujian Sistem Manajemen Perpustakaan Sederhana

from library_item import Book, Magazine
from library import Library


if __name__ == "__main__":
    perpus = Library("Perpustakaan ITERA")

    # Menambahkan item ke perpustakaan
    print("--- 1. Menambahkan Item ---")
    perpus.tambah_item(Book("B001", "Laskar Pelangi", 2005, "Andrea Hirata", 529))
    perpus.tambah_item(Book("B002", "Bumi Manusia", 1980, "Pramoedya Ananta Toer", 535))
    perpus.tambah_item(Magazine("M001", "National Geographic", 2024, "Maret"))
    perpus.tambah_item(Magazine("M002", "Tempo", 2024, "Juni"))
    perpus.tambah_item(Book("B001", "Buku Duplikat", 2020, "Anonim", 100))  # id sudah ada
    print("Jumlah item dalam koleksi:", perpus.jumlah_item)

    # Menampilkan katalog item yang tersedia
    print("\n--- 2. Menampilkan Katalog ---")
    perpus.tampilkan_tersedia()

    # Mencari item berdasarkan id dan judul
    print("\n--- 3. Mencari Item ---")
    hasil_id = perpus.cari_by_id("M001")
    print("Cari id 'M001'      :", hasil_id if hasil_id else "Tidak ditemukan")
    print("Cari id 'X999'      :", perpus.cari_by_id("X999") or "Tidak ditemukan")
    print("Cari judul 'bumi'   :")
    for item in perpus.cari_by_judul("bumi"):
        print(" -", item)

    # Demonstrasi status ketersediaan item
    print("\n--- 4. Status Ketersediaan Item ---")
    buku = perpus.cari_by_id("B001")
    buku.pinjam()
    buku.pinjam()  # gagal karena masih dipinjam
    print("Status B001 dipinjam?:", buku.is_dipinjam)
    perpus.tampilkan_tersedia()

    # Denda berbeda sesuai jenis item
    print("\n--- 5. Hitung Denda (Polymorphism) ---")
    for item_id in ["B001", "M001"]:
        item = perpus.cari_by_id(item_id)
        print(f"Denda '{item.judul}' terlambat 3 hari: Rp {item.hitung_denda(3):,.0f}")

    buku.kembalikan()
    perpus.tampilkan_tersedia()
