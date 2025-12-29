import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Bisection from './components/Bisection';
import NewtonRaphson from './components/NewtonRaphson';
import FiniteDifferences from './components/FiniteDifferences';
import ErrorCalculation from './components/ErrorCalculation';
import NewtonForward from './components/NewtonForward';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bisection" element={<Bisection />} />
            <Route path="/newton-raphson" element={<NewtonRaphson />} />
            <Route path="/differences" element={<FiniteDifferences />} />
            <Route path="/error" element={<ErrorCalculation />} />
            <Route path="/newton-forward" element={<NewtonForward />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


