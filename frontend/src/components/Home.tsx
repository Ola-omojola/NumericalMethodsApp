import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const methods = [
    {
      title: 'Bisection Method',
      description: 'Find roots of continuous functions using interval bisection',
      icon: '⊗',
      path: '/bisection',
      color: '#667eea'
    },
    {
      title: 'Newton-Raphson',
      description: 'Fast root finding using derivatives',
      icon: '∇',
      path: '/newton-raphson',
      color: '#f093fb'
    },
    {
      title: 'Finite Differences',
      description: 'Numerical differentiation: forward, backward, central',
      icon: 'Δ',
      path: '/differences',
      color: '#4facfe'
    },
    {
      title: 'Error Calculation',
      description: 'Compute absolute, relative, and percentage errors',
      icon: 'ε',
      path: '/error',
      color: '#43e97b'
    },
    {
      title: 'Newton Forward Diff',
      description: 'Polynomial interpolation using forward differences',
      icon: '∑',
      path: '/newton-forward',
      color: '#fa709a'
    }
  ];

  return (
    <div className="home">
      <div className="hero-section">
        <h1 className="hero-title">
          <span className="gradient-text">Numerical Methods</span> Calculator
        </h1>
        <p className="hero-subtitle">
          Solve complex mathematical problems with elegant, visual solutions
        </p>
      </div>

      <div className="methods-grid">
        {methods.map((method) => (
          <Link 
            key={method.path} 
            to={method.path} 
            className="method-card"
            style={{ '--card-color': method.color } as React.CSSProperties}
          >
            <div className="method-icon">{method.icon}</div>
            <h3 className="method-title">{method.title}</h3>
            <p className="method-description">{method.description}</p>
            <div className="method-arrow">→</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
