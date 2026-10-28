# Cara impor 1: impor seluruh modul dengan alias
import math_operations as mo

# Cara impor 2: impor fungsi/konstanta tertentu langsung
from math_operations import PI, celsius_ke_fahrenheit, celsius_ke_kelvin


# Menampilkan hasil luas dan keliling bangun datar
def tampilkan_geometri() -> None:
    """Cetak tabel luas dan keliling persegi, persegi panjang, lingkaran (tidak return apa-apa)."""
    print("--- 1. GEOMETRI ---")
    print(f"Konstanta PI dari modul: {PI}\n")

    print(f"{'Bentuk':<28} | {'Luas':>10} | {'Keliling':>10}")
    print("-" * 54)

    for sisi in [4, 7.5]:
        print(f"{f'Persegi (sisi={sisi})':<28} | {mo.luas_persegi(sisi):>10.2f} "
              f"| {mo.keliling_persegi(sisi):>10.2f}")

    for panjang, lebar in [(10, 5), (8.5, 3)]:
        print(f"{f'Persegi panjang ({panjang}x{lebar})':<28} "
              f"| {mo.luas_persegi_panjang(panjang, lebar):>10.2f} "
              f"| {mo.keliling_persegi_panjang(panjang, lebar):>10.2f}")

    for r in [7, 10]:
        print(f"{f'Lingkaran (r={r})':<28} | {mo.luas_lingkaran(r):>10.2f} "
              f"| {mo.keliling_lingkaran(r):>10.2f}")


# Menampilkan hasil konversi suhu
def tampilkan_konversi_suhu() -> None:
    """Cetak tabel konversi beberapa suhu celsius ke fahrenheit dan kelvin (tidak return apa-apa)."""
    print("\n--- 2. KONVERSI SUHU ---")
    print(f"{'Celsius':>8} | {'Fahrenheit':>10} | {'Kelvin':>8}")
    print("-" * 32)
    for c in [-40, 0, 25, 37, 100]:
        print(f"{c:>8} | {celsius_ke_fahrenheit(c):>10.2f} | {celsius_ke_kelvin(c):>8.2f}")


if __name__ == "__main__":
    print("=== PROGRAM UTAMA MODUL MATH_OPERATIONS ===\n")
    tampilkan_geometri()
    tampilkan_konversi_suhu()
