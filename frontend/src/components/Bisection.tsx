import { useState } from 'react';
import { numericalAPI } from '../api';
import './MethodPage.css';

const Bisection = () => {
  const [formData, setFormData] = useState({
    function: 'x**3 - x - 2',
    a: '1',
    b: '2',
    tolerance: '0.000001'
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await numericalAPI.bisection({
        function: formData.function,
        a: parseFloat(formData.a),
        b: parseFloat(formData.b),
        tolerance: parseFloat(formData.tolerance)
      });
      setResult(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="method-page">
      <div className="method-header">
        <h1>Bisection Method</h1>
        <p className="method-intro">
          The bisection method finds roots by repeatedly bisecting an interval and selecting the subinterval where the function changes sign.
        </p>
      </div>

      <div className="formula-card">
        <h3>Formula</h3>
        <div className="formula">
          c = (a + b) / 2
        </div>
        <p className="formula-note">
          Where f(a) and f(b) must have opposite signs
        </p>
      </div>

      <form onSubmit={handleSubmit} className="input-form">
        <div className="form-group">
          <label>Function f(x)</label>
          <input
            type="text"
            value={formData.function}
            onChange={(e) => setFormData({ ...formData, function: e.target.value })}
            placeholder="x**3 - x - 2"
          />
          <span className="input-hint">Use ** for exponents, e.g., x**2</span>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Lower bound (a)</label>
            <input
              type="number"
              step="any"
              value={formData.a}
              onChange={(e) => setFormData({ ...formData, a: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Upper bound (b)</label>
            <input
              type="number"
              step="any"
              value={formData.b}
              onChange={(e) => setFormData({ ...formData, b: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Tolerance</label>
          <input
            type="number"
            step="any"
            value={formData.tolerance}
            onChange={(e) => setFormData({ ...formData, tolerance: e.target.value })}
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate'}
        </button>
      </form>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {result && !result.error && (
        <div className="result-card">
          <h3>Results</h3>
          <div className="result-summary">
            <div className="result-item">
              <span className="result-label">Root:</span>
              <span className="result-value">{result.root.toFixed(8)}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Iterations:</span>
              <span className="result-value">{result.iterations}</span>
            </div>
          </div>

          <h4>Iteration Steps</h4>
          <div className="table-container">
            <table className="results-table">
              <thead>
                <tr>
                  <th>Iteration</th>
                  <th>a</th>
                  <th>b</th>
                  <th>c</th>
                  <th>f(c)</th>
                  <th>Error</th>
                </tr>
              </thead>
              <tbody>
                {result.steps.map((step: any) => (
                  <tr key={step.iteration}>
                    <td>{step.iteration}</td>
                    <td>{step.a.toFixed(6)}</td>
                    <td>{step.b.toFixed(6)}</td>
                    <td>{step.c.toFixed(6)}</td>
                    <td>{step.f_c.toFixed(6)}</td>
                    <td>{step.error.toFixed(6)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bisection;
