import { useState } from 'react';
import { numericalAPI } from '../api';
import './MethodPage.css';

const NewtonForward = () => {
  const [formData, setFormData] = useState({
    x_values: '0, 1, 2, 3, 4',
    y_values: '1, 2, 5, 10, 17',
    x_target: '2.5'
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
      const x_vals = formData.x_values.split(',').map(v => parseFloat(v.trim()));
      const y_vals = formData.y_values.split(',').map(v => parseFloat(v.trim()));
      
      const data = await numericalAPI.newtonForwardDiff({
        x_values: x_vals,
        y_values: y_vals,
        x_target: parseFloat(formData.x_target)
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
        <h1>Newton's Forward Difference Interpolation</h1>
        <p className="method-intro">
          Polynomial interpolation using forward difference tables. Best for equally spaced data points.
        </p>
      </div>

      <div className="formula-card">
        <h3>Formula</h3>
        <div className="formula">
          f(x) = f(x₀) + uΔf(x₀) + u(u-1)/2! Δ²f(x₀) + ...
        </div>
        <p className="formula-note">
          where u = (x - x₀) / h
        </p>
      </div>

      <form onSubmit={handleSubmit} className="input-form">
        <div className="form-group">
          <label>X Values (equally spaced, comma separated)</label>
          <input
            type="text"
            value={formData.x_values}
            onChange={(e) => setFormData({ ...formData, x_values: e.target.value })}
            placeholder="0, 1, 2, 3, 4"
          />
        </div>

        <div className="form-group">
          <label>Y Values (comma separated)</label>
          <input
            type="text"
            value={formData.y_values}
            onChange={(e) => setFormData({ ...formData, y_values: e.target.value })}
            placeholder="1, 2, 5, 10, 17"
          />
        </div>

        <div className="form-group">
          <label>Target X value</label>
          <input
            type="number"
            step="any"
            value={formData.x_target}
            onChange={(e) => setFormData({ ...formData, x_target: e.target.value })}
            placeholder="2.5"
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Interpolate...' : 'Interpolate'}
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
              <span className="result-label">Interpolated Value f(x):</span>
              <span className="result-value">{result.interpolated_value.toFixed(8)}</span>
            </div>
            <div className="result-item">
              <span className="result-label">First Derivative f'(x):</span>
              <span className="result-value">{result.first_derivative.toFixed(8)}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Second Derivative f''(x):</span>
              <span className="result-value">{result.second_derivative.toFixed(8)}</span>
            </div>
            <div className="result-item">
              <span className="result-label">u:</span>
              <span className="result-value">{result.u.toFixed(6)}</span>
            </div>
            <div className="result-item">
              <span className="result-label">h:</span>
              <span className="result-value">{result.h.toFixed(4)}</span>
            </div>
          </div>

          <h4>Formulas Used</h4>
          <div className="formula-card">
            <div className="formula-list">
              <div className="formula-item">
                <strong>Interpolation:</strong> <span className="formula">{result.formulas.interpolation}</span>
              </div>
              <div className="formula-item">
                <strong>1st Derivative:</strong> <span className="formula">{result.formulas.first_derivative}</span>
              </div>
              <div className="formula-item">
                <strong>2nd Derivative:</strong> <span className="formula">{result.formulas.second_derivative}</span>
              </div>
            </div>
          </div>

          <h4>Forward Difference Table</h4>
          <div className="table-container">
            <table className="results-table">
              <thead>
                <tr>
                  <th>x</th>
                  {Object.keys(result.difference_table[0])
                    .filter(key => key !== 'x')
                    .map((key, idx) => <th key={idx}>{key}</th>)}
                </tr>
              </thead>
              <tbody>
                {result.difference_table.map((row: any, idx: number) => (
                  <tr key={idx}>
                    <td>{row.x.toFixed(2)}</td>
                    {Object.entries(row)
                      .filter(([key]) => key !== 'x')
                      .map(([, val]: [string, any], i) => (
                        <td key={i}>{val.toFixed(6)}</td>
                      ))}
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

export default NewtonForward;
