import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './BookForm.css';

const EMPTY_FORM = { title: '', author: '', status: 'milik' };

// Validasi kolom wajib; mengembalikan objek pesan error per field
export function validateBook(values) {
  const errors = {};
  if (!values.title.trim()) errors.title = 'Judul buku wajib diisi';
  if (!values.author.trim()) errors.author = 'Nama penulis wajib diisi';
  if (!['milik', 'baca', 'beli'].includes(values.status)) errors.status = 'Status tidak valid';
  return errors;
}

// Form reusable untuk menambah maupun mengedit buku
function BookForm({ onSubmit, initialData, onCancel }) {
  const [values, setValues] = useState(initialData || EMPTY_FORM);
  const [errors, setErrors] = useState({});

  // Isi ulang form ketika buku yang diedit berganti
  useEffect(() => {
    setValues(initialData || EMPTY_FORM);
    setErrors({});
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Hilangkan pesan error begitu kolom diperbaiki
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateBook(values);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    onSubmit({ title: values.title.trim(), author: values.author.trim(), status: values.status });
    if (!initialData) setValues(EMPTY_FORM);
  };

  const isEdit = Boolean(initialData);

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <h2>{isEdit ? 'Edit Buku' : 'Tambah Buku Baru'}</h2>

      <label htmlFor="title">Judul</label>
      <input
        id="title"
        name="title"
        value={values.title}
        onChange={handleChange}
        className={errors.title ? 'input-error' : ''}
        placeholder="Contoh: Laskar Pelangi"
      />
      {errors.title && <p className="error-text" role="alert">{errors.title}</p>}

      <label htmlFor="author">Penulis</label>
      <input
        id="author"
        name="author"
        value={values.author}
        onChange={handleChange}
        className={errors.author ? 'input-error' : ''}
        placeholder="Contoh: Andrea Hirata"
      />
      {errors.author && <p className="error-text" role="alert">{errors.author}</p>}

      <label htmlFor="status">Status</label>
      <select id="status" name="status" value={values.status} onChange={handleChange}>
        <option value="milik">Dimiliki</option>
        <option value="baca">Sedang Dibaca</option>
        <option value="beli">Ingin Dibeli</option>
      </select>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {isEdit ? 'Simpan Perubahan' : 'Tambah Buku'}
        </button>
        {isEdit && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Batal
          </button>
        )}
      </div>
    </form>
  );
}

BookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  initialData: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']),
  }),
};

export default BookForm;
