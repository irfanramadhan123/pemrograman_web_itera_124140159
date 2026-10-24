import { NavLink } from 'react-router-dom';
import './Navbar.css';

// NavLink otomatis memberi class "active" pada halaman yang sedang dibuka
function Navbar() {
  return (
    <nav className="navbar">
      <span className="navbar-brand">Muhammad Irfan Ramadhan - 124140159</span>
      <div className="navbar-links">
        <NavLink to="/" end>Beranda</NavLink>
        <NavLink to="/stats">Statistik</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
