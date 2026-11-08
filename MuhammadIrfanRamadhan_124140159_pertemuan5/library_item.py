# Abstract class LibraryItem beserta subclass Book dan Magazine

from abc import ABC, abstractmethod


# Class dasar untuk semua item di perpustakaan
class LibraryItem(ABC):
    def __init__(self, item_id: str, judul: str, tahun: int):
        # Hanya diakses dari class ini dan turunannya
        self._item_id = item_id
        self._judul = judul
        self._tahun = tahun
        # Status pinjam tidak boleh diubah langsung dari luar
        self.__dipinjam = False

    # Id item
    @property
    def item_id(self) -> str:
        return self._item_id

    # Judul item
    @property
    def judul(self) -> str:
        return self._judul

    # True jika item sedang dipinjam
    @property
    def is_dipinjam(self) -> bool:
        return self.__dipinjam

    # Meminjam item jika masih tersedia
    def pinjam(self) -> bool:
        if self.__dipinjam:
            print(f"Gagal: '{self._judul}' sedang dipinjam!")
            return False
        self.__dipinjam = True
        print(f"'{self._judul}' berhasil dipinjam.")
        return True

    # Mengembalikan item yang sedang dipinjam
    def kembalikan(self):
        self.__dipinjam = False
        print(f"'{self._judul}' berhasil dikembalikan.")

    # Detail item dalam bentuk teks, wajib dibuat di subclass
    @abstractmethod
    def get_detail(self) -> str:
        pass

    # Denda keterlambatan, wajib dibuat di subclass
    @abstractmethod
    def hitung_denda(self, hari_terlambat: int) -> float:
        pass

    def __str__(self) -> str:
        status = "Dipinjam" if self.__dipinjam else "Tersedia"
        return f"{self.get_detail()} | Status: {status}"


# Item perpustakaan berupa buku
class Book(LibraryItem):
    def __init__(self, item_id: str, judul: str, tahun: int, penulis: str, jumlah_halaman: int):
        super().__init__(item_id, judul, tahun)
        self.penulis = penulis
        self.jumlah_halaman = jumlah_halaman

    def get_detail(self) -> str:
        return f"[Buku] {self._item_id} - {self._judul} oleh {self.penulis} ({self._tahun}), {self.jumlah_halaman} hal"

    def hitung_denda(self, hari_terlambat: int) -> float:
        # Rp 1.000 per hari
        return max(0, hari_terlambat) * 1000


# Item perpustakaan berupa majalah
class Magazine(LibraryItem):
    def __init__(self, item_id: str, judul: str, tahun: int, edisi: str):
        super().__init__(item_id, judul, tahun)
        self.edisi = edisi

    def get_detail(self) -> str:
        return f"[Majalah] {self._item_id} - {self._judul} Edisi {self.edisi} ({self._tahun})"

    def hitung_denda(self, hari_terlambat: int) -> float:
        # Rp 500 per hari
        return max(0, hari_terlambat) * 500
