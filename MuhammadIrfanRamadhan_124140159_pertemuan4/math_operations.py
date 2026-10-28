PI = 3.14159


# Geometri: Persegi
# Menghitung luas persegi
def luas_persegi(sisi: float) -> float:
    """Hitung luas persegi dari panjang sisi, hasilnya sisi * sisi."""
    return sisi * sisi


# Menghitung keliling persegi
def keliling_persegi(sisi: float) -> float:
    """Hitung keliling persegi dari panjang sisi, hasilnya 4 * sisi."""
    return 4 * sisi


# Geometri: Persegi Panjang
# Menghitung luas persegi panjang
def luas_persegi_panjang(panjang: float, lebar: float) -> float:
    """Hitung luas persegi panjang dari panjang dan lebar, hasilnya panjang * lebar."""
    return panjang * lebar


# Menghitung keliling persegi panjang
def keliling_persegi_panjang(panjang: float, lebar: float) -> float:
    """Hitung keliling persegi panjang dari panjang dan lebar, hasilnya 2 * (panjang + lebar)."""
    return 2 * (panjang + lebar)


# Geometri: Lingkaran
# Menghitung luas lingkaran
def luas_lingkaran(jari_jari: float) -> float:
    """Hitung luas lingkaran dari jari-jari, hasilnya PI * r * r."""
    return PI * jari_jari * jari_jari


# Menghitung keliling lingkaran
def keliling_lingkaran(jari_jari: float) -> float:
    """Hitung keliling lingkaran dari jari-jari, hasilnya 2 * PI * r."""
    return 2 * PI * jari_jari


# Konversi Suhu
# Mengonversi suhu Celsius ke Fahrenheit
def celsius_ke_fahrenheit(celsius: float) -> float:
    """Ubah suhu celsius ke fahrenheit, hasilnya celsius * 9/5 + 32."""
    return celsius * 9 / 5 + 32


# Mengonversi suhu Celsius ke Kelvin
def celsius_ke_kelvin(celsius: float) -> float:
    """Ubah suhu celsius ke kelvin, hasilnya celsius + 273.15."""
    return celsius + 273.15


if __name__ == "__main__":
    print("[TEST MODUL] math_operations")
    print("Luas persegi sisi 4 =", luas_persegi(4))
    print("100 C ke F =", celsius_ke_fahrenheit(100))
    print("100 C ke K =", celsius_ke_kelvin(100))
