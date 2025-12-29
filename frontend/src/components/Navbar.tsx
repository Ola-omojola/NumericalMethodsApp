import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">∂</span>
          <span>Numerical Methods</span>
        </Link>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/bisection" className="nav-link">
              Bisection
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/newton-raphson" className="nav-link">
              Newton-Raphson
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/differences" className="nav-link">
              Differences
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/error" className="nav-link">
              Error Calc
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/newton-forward" className="nav-link">
              Newton Forward
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
