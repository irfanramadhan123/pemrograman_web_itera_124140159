import { render, screen, fireEvent } from '@testing-library/react';
import BookForm, { validateBook } from './BookForm';

describe('Komponen BookForm', () => {
  test('menampilkan pesan error jika judul dan penulis kosong', () => {
    const onSubmit = vi.fn();
    render(<BookForm onSubmit={onSubmit} />);

    fireEvent.click(screen.getByText('Tambah Buku'));

    expect(screen.getByText('Judul buku wajib diisi')).toBeInTheDocument();
    expect(screen.getByText('Nama penulis wajib diisi')).toBeInTheDocument();
    expect(screen.getByLabelText('Judul')).toHaveClass('input-error');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('memanggil onSubmit dengan data yang benar jika form valid', () => {
    const onSubmit = vi.fn();
    render(<BookForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText('Judul'), { target: { value: '  Laskar Pelangi ' } });
    fireEvent.change(screen.getByLabelText('Penulis'), { target: { value: 'Andrea Hirata' } });
    fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'baca' } });
    fireEvent.click(screen.getByText('Tambah Buku'));

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Laskar Pelangi',
      author: 'Andrea Hirata',
      status: 'baca',
    });
  });

  test('mengisi form dengan data awal saat mode edit', () => {
    render(
      <BookForm
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
        initialData={{ title: 'Bumi', author: 'Tere Liye', status: 'beli' }}
      />
    );

    expect(screen.getByText('Edit Buku')).toBeInTheDocument();
    expect(screen.getByLabelText('Judul')).toHaveValue('Bumi');
    expect(screen.getByText('Simpan Perubahan')).toBeInTheDocument();
  });

  test('validateBook mengembalikan objek kosong untuk data valid', () => {
    expect(validateBook({ title: 'A', author: 'B', status: 'milik' })).toEqual({});
  });
});
