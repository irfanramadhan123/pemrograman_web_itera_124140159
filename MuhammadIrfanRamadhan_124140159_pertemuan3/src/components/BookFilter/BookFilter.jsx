import PropTypes from 'prop-types';
import './BookFilter.css';

const FILTERS = [
  { value: 'semua', label: 'Semua' },
  { value: 'milik', label: 'Dimiliki' },
  { value: 'baca', label: 'Sedang Dibaca' },
  { value: 'beli', label: 'Ingin Dibeli' },
];

// Komponen reusable: kolom pencarian + tombol filter status
function BookFilter({ search, onSearchChange, status, onStatusChange }) {
  return (
    <div className="book-filter">
      <input
        type="search"
        placeholder="Cari judul atau penulis..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Cari buku"
      />
      <div className="filter-buttons">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            className={status === f.value ? 'active' : ''}
            onClick={() => onStatusChange(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}

BookFilter.propTypes = {
  search: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

export default BookFilter;
