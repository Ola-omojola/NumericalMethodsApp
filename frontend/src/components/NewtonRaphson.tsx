import { useState } from 'react';
import { numericalAPI } from '../api';
import './MethodPage.css';

const NewtonRaphson = () => {
  const [formData, setFormData] = useState({
    function: 'x**3 - x - 2',
    x0: '1.5',
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
      const data = await numericalAPI.newtonRaphson({
        function: formData.function,
        x0: parseFloat(formData.x0),
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
        <h1>Newton-Raphson Method</h1>
        <p className="method-intro">
          A fast iterative method for finding roots using the function and its derivative. Provides quadratic convergence.
        </p>
      </div>

      <div className="formula-card">
        <h3>Formula</h3>
        <div className="formula">
          x<sub>n+1</sub> = x<sub>n</sub> - f(x<sub>n</sub>) / f'(x<sub>n</sub>)
        </div>
        <p className="formula-note">
          Derivative is computed automatically
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
          <span className="input-hint">Use ** for exponents</span>
        </div>

        <div className="form-group">
          <label>Initial guess (x₀)</label>
          <input
            type="number"
            step="any"
            value={formData.x0}
            onChange={(e) => setFormData({ ...formData, x0: e.target.value })}
          />
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
                  <th>x<sub>n</sub></th>
                  <th>f(x<sub>n</sub>)</th>
                  <th>f'(x<sub>n</sub>)</th>
                  <th>x<sub>n+1</sub></th>
                  <th>Error</th>
                </tr>
              </thead>
              <tbody>
                {result.steps.map((step: any) => (
                  <tr key={step.iteration}>
                    <td>{step.iteration}</td>
                    <td>{step.x_n.toFixed(6)}</td>
                    <td>{step.f_x.toFixed(6)}</td>
                    <td>{step.df_x.toFixed(6)}</td>
                    <td>{step.x_next.toFixed(6)}</td>
                    <td>{step.error.toFixed(8)}</td>
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

export default NewtonRaphson;
