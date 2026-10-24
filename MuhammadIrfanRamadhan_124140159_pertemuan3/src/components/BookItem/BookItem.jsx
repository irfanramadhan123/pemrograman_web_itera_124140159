import PropTypes from 'prop-types';
import { STATUS_LABELS } from '../../hooks/useBookStats';
import './BookItem.css';

// Kartu satu buku dengan tombol edit & hapus
function BookItem({ book, onEdit, onDelete }) {
  return (
    <li className="book-item">
      <div>
        <h3>{book.title}</h3>
        <p className="book-author">oleh {book.author}</p>
        <span className={`badge badge-${book.status}`}>{STATUS_LABELS[book.status]}</span>
      </div>
      <div className="book-actions">
        <button type="button" className="btn btn-secondary" onClick={() => onEdit(book)}>
          Edit
        </button>
        <button type="button" className="btn btn-danger" onClick={() => onDelete(book.id)}>
          Hapus
        </button>
      </div>
    </li>
  );
}

BookItem.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookItem;
