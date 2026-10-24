import { useState, useEffect } from 'react';

// Custom hook: state yang otomatis disinkronkan ke localStorage
function useLocalStorage(key, initialValue) {
  // Lazy initializer: baca data tersimpan hanya sekali saat mount
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Simpan ulang setiap kali nilai berubah
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
