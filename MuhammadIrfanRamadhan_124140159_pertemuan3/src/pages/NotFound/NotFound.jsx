import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <main className="container" style={{ textAlign: 'center' }}>
      <h2>404 - Halaman tidak ditemukan</h2>
      <Link to="/">Kembali ke Beranda</Link>
    </main>
  );
}

export default NotFound;
