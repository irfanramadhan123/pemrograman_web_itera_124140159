import { useBooks } from '../../context/BookContext';
import useBookStats, { STATUS_LABELS } from '../../hooks/useBookStats';
import './Stats.css';

function Stats() {
  // Ambil data dari Context, lalu hitung statistiknya dengan custom hook
  const { books } = useBooks();
  const stats = useBookStats(books);

  return (
    <main className="container stats-page">
      <h2>Statistik Koleksi</h2>
      <p>Saat ini Anda memiliki total <strong>{stats.total}</strong> buku tersimpan.</p>

      <div className="stats-grid">
        {Object.keys(STATUS_LABELS).map((key) => (
          <div key={key} className={`stat-card stat-${key}`}>
            <span className="stat-value">{stats.byStatus[key]}</span>
            <span className="stat-label">{STATUS_LABELS[key]}</span>
            <div className="progress">
              <div className="progress-bar" style={{ width: `${stats.percent(key)}%` }} />
            </div>
            <small>{stats.percent(key)}% dari koleksi</small>
          </div>
        ))}
      </div>

      <p className="top-author">Penulis terbanyak: <strong>{stats.topAuthor}</strong></p>
    </main>
  );
}

export default Stats;
