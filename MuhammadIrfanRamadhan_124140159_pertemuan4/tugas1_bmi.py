# Menghitung nilai BMI dari berat (kg) dan tinggi (m)
def hitung_bmi(berat: float, tinggi: float) -> float:
    """Hitung BMI dari berat (kg) dan tinggi (m), hasilnya berat / (tinggi * tinggi)."""
    return berat / (tinggi * tinggi)


# Menentukan kategori BMI
def kategori_bmi(bmi: float) -> str:
    """Terima nilai bmi, kembalikan nama kategorinya (kurang/normal/berlebih/obesitas)."""
    if bmi < 18.5:
        return "Berat badan kurang"
    elif bmi < 25:
        return "Berat badan normal"
    elif bmi < 30:
        return "Berat badan berlebih"
    else:
        return "Obesitas"


# Meminta input angka, diulang sampai benar
def input_angka(prompt: str) -> float:
    """Tampilkan prompt, kembalikan angka positif yang diketik pengguna."""
    while True:
        try:
            nilai = float(input(prompt).replace(",", "."))
            if nilai > 0:
                return nilai
            print("  Nilai harus lebih dari 0, coba lagi.")
        except ValueError:
            print("  Input harus berupa angka, coba lagi.")


def main():
    """Jalankan program BMI: minta input, hitung, lalu cetak hasilnya."""
    print("=== PROGRAM PENGHITUNG BMI ===")
    berat = input_angka("Masukkan berat badan (kg)  : ")
    tinggi = input_angka("Masukkan tinggi badan (m)  : ")

    # kalau tinggi diisi dalam cm, ubah ke meter
    if tinggi > 3:
        tinggi = tinggi / 100
        print(f"  (Tinggi dianggap dalam cm, diubah menjadi {tinggi:.2f} m)")

    bmi = hitung_bmi(berat, tinggi)
    kategori = kategori_bmi(bmi)

    print("\n--- HASIL ---")
    print(f"Berat badan : {berat:.1f} kg")
    print(f"Tinggi badan: {tinggi:.2f} m")
    print(f"Nilai BMI   : {bmi:.2f}")
    print(f"Kategori    : {kategori}")


if __name__ == "__main__":
    main()
