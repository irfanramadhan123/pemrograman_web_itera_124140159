import { render, screen, fireEvent } from '@testing-library/react';
import BookFilter from './BookFilter';

describe('Komponen BookFilter', () => {
  test('memanggil onSearchChange saat pengguna mengetik', () => {
    const onSearchChange = vi.fn();
    render(
      <BookFilter search="" onSearchChange={onSearchChange} status="semua" onStatusChange={vi.fn()} />
    );
    fireEvent.change(screen.getByLabelText('Cari buku'), { target: { value: 'tere' } });
    expect(onSearchChange).toHaveBeenCalledWith('tere');
  });

  test('memanggil onStatusChange dan menandai tombol aktif', () => {
    const onStatusChange = vi.fn();
    render(
      <BookFilter search="" onSearchChange={vi.fn()} status="baca" onStatusChange={onStatusChange} />
    );
    expect(screen.getByText('Sedang Dibaca')).toHaveClass('active');
    fireEvent.click(screen.getByText('Ingin Dibeli'));
    expect(onStatusChange).toHaveBeenCalledWith('beli');
  });
});
