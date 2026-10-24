import { render, screen, fireEvent } from '@testing-library/react';
import BookItem from './BookItem';

describe('Komponen BookItem', () => {
  const dummyBook = { id: '1', title: 'Laskar Pelangi', author: 'Andrea Hirata', status: 'milik' };
  const mockEdit = vi.fn();
  const mockDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('merender judul, penulis, dan label status', () => {
    render(<BookItem book={dummyBook} onEdit={mockEdit} onDelete={mockDelete} />);
    expect(screen.getByText('Laskar Pelangi')).toBeInTheDocument();
    expect(screen.getByText('oleh Andrea Hirata')).toBeInTheDocument();
    expect(screen.getByText('Dimiliki')).toBeInTheDocument();
  });

  test('memanggil onDelete dengan id buku saat tombol hapus diklik', () => {
    render(<BookItem book={dummyBook} onEdit={mockEdit} onDelete={mockDelete} />);
    fireEvent.click(screen.getByText('Hapus'));
    expect(mockDelete).toHaveBeenCalledWith('1');
  });

  test('memanggil onEdit dengan objek buku saat tombol edit diklik', () => {
    render(<BookItem book={dummyBook} onEdit={mockEdit} onDelete={mockDelete} />);
    fireEvent.click(screen.getByText('Edit'));
    expect(mockEdit).toHaveBeenCalledWith(dummyBook);
  });
});
