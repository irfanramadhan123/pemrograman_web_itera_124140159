import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Test integrasi: alur tambah, cari, dan hapus buku melalui Context
describe('Aplikasi Manajemen Buku', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.spyOn(window, 'confirm').mockReturnValue(true);
  });

  const addBook = (title, author, status = 'milik') => {
    fireEvent.change(screen.getByLabelText('Judul'), { target: { value: title } });
    fireEvent.change(screen.getByLabelText('Penulis'), { target: { value: author } });
    fireEvent.change(screen.getByLabelText('Status'), { target: { value: status } });
    fireEvent.click(screen.getByText('Tambah Buku'));
  };

  test('menambah buku lalu menyimpannya ke localStorage', () => {
    render(<App />);
    addBook('Laskar Pelangi', 'Andrea Hirata');
    expect(screen.getByText('Laskar Pelangi')).toBeInTheDocument();
    expect(window.localStorage.getItem('books_data')).toContain('Laskar Pelangi');
  });

  test('pencarian menyaring buku berdasarkan penulis', () => {
    render(<App />);
    addBook('Laskar Pelangi', 'Andrea Hirata');
    addBook('Bumi', 'Tere Liye', 'beli');
    fireEvent.change(screen.getByLabelText('Cari buku'), { target: { value: 'tere' } });
    expect(screen.getByText('Bumi')).toBeInTheDocument();
    expect(screen.queryByText('Laskar Pelangi')).not.toBeInTheDocument();
  });

  test('menghapus buku dari daftar', () => {
    render(<App />);
    addBook('Bumi', 'Tere Liye');
    fireEvent.click(screen.getByText('Hapus'));
    expect(screen.queryByText('Bumi')).not.toBeInTheDocument();
    expect(screen.getByText('Belum ada buku yang cocok.')).toBeInTheDocument();
  });
});
