# Class Library untuk menyimpan dan mengelola koleksi item

from library_item import LibraryItem


# Mengelola koleksi item perpustakaan
class Library:
    def __init__(self, nama: str):
        self.nama = nama
        # Koleksi hanya bisa diubah lewat method di class ini
        self.__koleksi = []

    # Jumlah seluruh item dalam koleksi
    @property
    def jumlah_item(self) -> int:
        return len(self.__koleksi)

    # Menambahkan item ke koleksi, id tidak boleh sama
    def tambah_item(self, item: LibraryItem):
        if not isinstance(item, LibraryItem):
            print("Gagal: objek bukan item perpustakaan!")
            return
        if self.cari_by_id(item.item_id):
            print(f"Gagal: id {item.item_id} sudah terdaftar!")
            return
        self.__koleksi.append(item)
        print(f"Item '{item.judul}' berhasil ditambahkan.")

    # Menampilkan item yang tidak sedang dipinjam
    def tampilkan_tersedia(self):
        print(f"\n=== KATALOG ITEM TERSEDIA - {self.nama} ===")
        tersedia = [item for item in self.__koleksi if not item.is_dipinjam]
        if not tersedia:
            print("Tidak ada item yang tersedia.")
        for item in tersedia:
            # get_detail() menyesuaikan jenis item masing-masing
            print(" -", item.get_detail())

    # Mencari item berdasarkan id, None jika tidak ada
    def cari_by_id(self, item_id: str):
        for item in self.__koleksi:
            if item.item_id == item_id:
                return item
        return None

    # Mencari item yang judulnya mengandung kata kunci
    def cari_by_judul(self, kata_kunci: str) -> list:
        return [item for item in self.__koleksi if kata_kunci.lower() in item.judul.lower()]
