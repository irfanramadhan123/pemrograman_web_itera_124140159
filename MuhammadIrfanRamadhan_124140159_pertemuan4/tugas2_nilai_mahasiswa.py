data_mahasiswa = [
    {"nama": "Muhammad Irfan Ramadhan", "nim": "124140159", "nilai_uts": 85, "nilai_uas": 90, "nilai_tugas": 88},
    {"nama": "Erza Farandi", "nim": "124140102", "nilai_uts": 75, "nilai_uas": 70, "nilai_tugas": 80},
    {"nama": "Muhammad Arfa Raditya", "nim": "124140103", "nilai_uts": 60, "nilai_uas": 65, "nilai_tugas": 70},
    {"nama": "Jeremi Pison Efrat Sianturi", "nim": "124140104", "nilai_uts": 50, "nilai_uas": 55, "nilai_tugas": 60},
    {"nama": "Rajendra", "nim": "124140105", "nilai_uts": 40, "nilai_uas": 45, "nilai_tugas": 50},
    {"nama": "Dimas Alhamdy", "nim": "124140106", "nilai_uts": 78, "nilai_uas": 82, "nilai_tugas": 75},
]


# Menghitung nilai akhir (30% UTS + 40% UAS + 30% Tugas)
def hitung_nilai_akhir(uts: float, uas: float, tugas: float) -> float:
    """Terima nilai uts, uas, tugas, kembalikan nilai akhir berbobot 30/40/30."""
    return 0.3 * uts + 0.4 * uas + 0.3 * tugas


# Menentukan grade dari nilai akhir
def tentukan_grade(nilai: float) -> str:
    """Terima nilai akhir, kembalikan grade huruf A sampai E."""
    if nilai >= 80:
        return "A"
    elif nilai >= 70:
        return "B"
    elif nilai >= 60:
        return "C"
    elif nilai >= 50:
        return "D"
    else:
        return "E"


# Menambahkan nilai akhir dan grade ke setiap mahasiswa
def proses_data(daftar: list) -> list:
    """Terima list mahasiswa, kembalikan list yang sudah ada nilai_akhir dan grade."""
    for mhs in daftar:
        mhs["nilai_akhir"] = hitung_nilai_akhir(
            mhs["nilai_uts"], mhs["nilai_uas"], mhs["nilai_tugas"]
        )
        mhs["grade"] = tentukan_grade(mhs["nilai_akhir"])
    return daftar


# Menampilkan data mahasiswa dalam bentuk tabel
def tampilkan_tabel(daftar: list) -> None:
    """Terima list mahasiswa yang sudah diproses, cetak sebagai tabel (tidak return apa-apa)."""
    garis = "+-----+------------------------------+------------+-----+-----+-------+-------------+-------+"
    print(garis)
    print(f"| {'No':<3} | {'Nama':<28} | {'NIM':<10} | {'UTS':>3} | {'UAS':>3} "
          f"| {'Tugas':>5} | {'Nilai Akhir':>11} | {'Grade':^5} |")
    print(garis)
    for no, mhs in enumerate(daftar, start=1):
        print(f"| {no:<3} | {mhs['nama']:<28} | {mhs['nim']:<10} | {mhs['nilai_uts']:>3} "
              f"| {mhs['nilai_uas']:>3} | {mhs['nilai_tugas']:>5} "
              f"| {mhs['nilai_akhir']:>11.2f} | {mhs['grade']:^5} |")
    print(garis)


# Mencari mahasiswa dengan nilai tertinggi dan terendah
def cari_tertinggi_terendah(daftar: list):
    """Terima list mahasiswa, kembalikan tuple (mahasiswa tertinggi, mahasiswa terendah)."""
    tertinggi = max(daftar, key=lambda m: m["nilai_akhir"])
    terendah = min(daftar, key=lambda m: m["nilai_akhir"])
    return tertinggi, terendah


def main():
    """Jalankan program: proses nilai, cetak tabel, tertinggi, terendah, dan rata-rata."""
    print("=== DATA NILAI MAHASISWA ===")
    print("Bobot: 30% UTS + 40% UAS + 30% Tugas\n")

    hasil = proses_data(data_mahasiswa)
    tampilkan_tabel(hasil)

    tertinggi, terendah = cari_tertinggi_terendah(hasil)
    print("\nNilai akhir tertinggi:")
    print(f"  {tertinggi['nama']} ({tertinggi['nim']}) - "
          f"{tertinggi['nilai_akhir']:.2f} [Grade {tertinggi['grade']}]")
    print("Nilai akhir terendah:")
    print(f"  {terendah['nama']} ({terendah['nim']}) - "
          f"{terendah['nilai_akhir']:.2f} [Grade {terendah['grade']}]")

    rata_rata = sum(m["nilai_akhir"] for m in hasil) / len(hasil)
    print(f"\nRata-rata nilai akhir kelas: {rata_rata:.2f}")


if __name__ == "__main__":
    main()
