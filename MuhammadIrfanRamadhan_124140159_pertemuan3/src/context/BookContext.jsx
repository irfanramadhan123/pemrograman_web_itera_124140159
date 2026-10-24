import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';

const BookContext = createContext(null);

// Consumer hook agar komponen tidak perlu memanggil useContext langsung
export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks harus digunakan di dalam BookProvider');
  }
  return context;
}

// Provider menyimpan state global buku beserta seluruh aksi CRUD
export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('books_data', []);

  const addBook = (book) =>
    setBooks((prev) => [...prev, { ...book, id: Date.now().toString() }]);

  const updateBook = (id, data) =>
    setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, ...data } : b)));

  const deleteBook = (id) => setBooks((prev) => prev.filter((b) => b.id !== id));

  return (
    <BookContext.Provider value={{ books, addBook, updateBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
