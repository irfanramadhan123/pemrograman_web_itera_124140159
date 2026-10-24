import { useState, useEffect } from 'react';
import BookForm from '../../components/BookForm/BookForm';
import BookFilter from '../../components/BookFilter/BookFilter';
import BookList from '../../components/BookList/BookList';
import { useBooks } from '../../context/BookContext';
import './Home.css';

function Home() {
  const { books, addBook, updateBook, deleteBook } = useBooks();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('semua');
  const [editingBook, setEditingBook] = useState(null);

  // Perbarui judul tab browser sesuai jumlah buku
  useEffect(() => {
    document.title = `Rak Buku (${books.length})`;
  }, [books.length]);

  // Filter berdasarkan status, lalu cari di judul / penulis
  const keyword = search.trim().toLowerCase();
  const filteredBooks = books.filter((book) => {
    const matchStatus = status === 'semua' || book.status === status;
    const matchSearch =
      book.title.toLowerCase().includes(keyword) || book.author.toLowerCase().includes(keyword);
    return matchStatus && matchSearch;
  });

  // Satu handler untuk dua mode: edit (jika ada buku dipilih) atau tambah baru
  const handleSubmit = (data) => {
    if (editingBook) {
      updateBook(editingBook.id, data);
      setEditingBook(null);
    } else {
      addBook(data);
    }
  };

  // Minta konfirmasi dulu sebelum menghapus agar tidak terhapus tanpa sengaja
  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus buku ini?')) {
      deleteBook(id);
      if (editingBook?.id === id) setEditingBook(null);
    }
  };

  return (
    <main className="home container">
      <section>
        <BookForm
          onSubmit={handleSubmit}
          initialData={editingBook}
          onCancel={() => setEditingBook(null)}
        />
      </section>
      <section>
        <h2 className="section-title">Koleksi Buku ({filteredBooks.length})</h2>
        <BookFilter
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
        />
        <BookList books={filteredBooks} onEdit={setEditingBook} onDelete={handleDelete} />
      </section>
    </main>
  );
}

export default Home;
