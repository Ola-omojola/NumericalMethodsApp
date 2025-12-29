import { useState } from 'react';
import { numericalAPI } from '../api';
import './MethodPage.css';

const FiniteDifferences = () => {
  const [mode, setMode] = useState<'function' | 'data'>('function');
  const [formData, setFormData] = useState({
    function: 'exp(x)',
    x_value: '1',
    h: '0.1',
    x_values: '0, 1, 2, 3, 4',
    y_values: '0, 1, 4, 9, 16'
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
      let data: any = {};
      
      if (mode === 'function') {
        data = {
          function: formData.function,
          x_value: parseFloat(formData.x_value),
          h: parseFloat(formData.h)
        };
      } else {
        data = {
          x_values: formData.x_values.split(',').map(v => parseFloat(v.trim())),
          y_values: formData.y_values.split(',').map(v => parseFloat(v.trim())),
          h: formData.h ? parseFloat(formData.h) : undefined
        };
      }
      
      const response = await numericalAPI.finiteDifferences(data);
      setResult(response);
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="method-page">
      <div className="method-header">
        <h1>Finite Differences</h1>
        <p className="method-intro">
          Numerical differentiation using forward, backward, and central difference formulas.
        </p>
      </div>

      <div className="mode-selector">
        <button 
          className={mode === 'function' ? 'mode-btn active' : 'mode-btn'}
          onClick={() => setMode('function')}
        >
          Function Mode
        </button>
        <button 
          className={mode === 'data' ? 'mode-btn active' : 'mode-btn'}
          onClick={() => setMode('data')}
        >
          Data Mode
        </button>
      </div>

      <div className="formula-card">
        <h3>Formulas</h3>
        <div className="formula-list">
          <div className="formula-item">
            <strong>Forward:</strong> <span className="formula">f'(x) ≈ (f(x+h) - f(x)) / h</span>
          </div>
          <div className="formula-item">
            <strong>Backward:</strong> <span className="formula">f'(x) ≈ (f(x) - f(x-h)) / h</span>
          </div>
          <div className="formula-item">
            <strong>Central:</strong> <span className="formula">f'(x) ≈ (f(x+h) - f(x-h)) / (2h)</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="input-form">
        {mode === 'function' ? (
          <>
            <div className="form-group">
              <label>Function f(x)</label>
              <input
                type="text"
                value={formData.function}
                onChange={(e) => setFormData({ ...formData, function: e.target.value })}
                placeholder="exp(x), sin(x), x**2"
              />
              <span className="input-hint">Use exp() for e^x, ** for exponents</span>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>x value</label>
                <input
                  type="number"
                  step="any"
                  value={formData.x_value}
                  onChange={(e) => setFormData({ ...formData, x_value: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Step size (h)</label>
                <input
                  type="number"
                  step="any"
                  value={formData.h}
                  onChange={(e) => setFormData({ ...formData, h: e.target.value })}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="form-group">
              <label>X Values (comma separated)</label>
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
                placeholder="0, 1, 4, 5, 6"
              />
            </div>
          </>
        )}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate'}
        </button>
      </form>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {result && !result.error && mode === 'function' && (
        <div className="result-card">
          <h3>Results</h3>
          <div className="result-summary">
            <div className="result-item">
              <span className="result-label">Function:</span>
              <span className="result-value">{result.function}</span>
            </div>
            <div className="result-item">
              <span className="result-label">x:</span>
              <span className="result-value">{result.x}</span>
            </div>
            <div className="result-item">
              <span className="result-label">h:</span>
              <span className="result-value">{result.h}</span>
            </div>
            <div className="result-item">
              <span className="result-label">True Derivative:</span>
              <span className="result-value">{result.true_derivative.toFixed(8)}</span>
            </div>
          </div>

          <h4>All Difference Types</h4>
          <div className="table-container">
            <table className="results-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Formula</th>
                  <th>Value</th>
                  <th>Error</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Forward</td>
                  <td>{result.forward.formula}</td>
                  <td>{result.forward.value.toFixed(8)}</td>
                  <td>{result.forward.error.toFixed(8)}</td>
                </tr>
                <tr>
                  <td>Backward</td>
                  <td>{result.backward.formula}</td>
                  <td>{result.backward.value.toFixed(8)}</td>
                  <td>{result.backward.error.toFixed(8)}</td>
                </tr>
                <tr>
                  <td>Central</td>
                  <td>{result.central.formula}</td>
                  <td>{result.central.value.toFixed(8)}</td>
                  <td>{result.central.error.toFixed(8)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {result && !result.error && mode === 'data' && result.results && (
        <div className="result-card">
          <h3>Results</h3>
          <div className="result-summary">
            <div className="result-item">
              <span className="result-label">Step size (h):</span>
              <span className="result-value">{result.h}</span>
            </div>
          </div>

          <h4>Derivatives at Each Point</h4>
          <div className="table-container">
            <table className="results-table">
              <thead>
                <tr>
                  <th>x</th>
                  <th>Forward</th>
                  <th>Backward</th>
                  <th>Central</th>
                </tr>
              </thead>
              <tbody>
                {result.results.map((point: any, idx: number) => (
                  <tr key={idx}>
                    <td>{point.x.toFixed(2)}</td>
                    <td>{point.forward !== undefined ? point.forward.toFixed(6) : '-'}</td>
                    <td>{point.backward !== undefined ? point.backward.toFixed(6) : '-'}</td>
                    <td>{point.central !== undefined ? point.central.toFixed(6) : '-'}</td>
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

export default FiniteDifferences;
