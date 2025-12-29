import { useState } from 'react';
import { numericalAPI } from '../api';
import './MethodPage.css';

const ErrorCalculation = () => {
  const [formData, setFormData] = useState({
    true_value: '3.141592653',
    approximate_value: '3.14'
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
      const data = await numericalAPI.errorCalculation({
        true_value: parseFloat(formData.true_value),
        approximate_value: parseFloat(formData.approximate_value)
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
        <h1>Error Calculation</h1>
        <p className="method-intro">
          Calculate absolute, relative, and percentage errors between true and approximate values.
        </p>
      </div>

      <div className="formula-card">
        <h3>Formulas</h3>
        <div className="formula-list">
          <div className="formula-item">
            <strong>Absolute Error:</strong> <span className="formula">|true - approximate|</span>
          </div>
          <div className="formula-item">
            <strong>Relative Error:</strong> <span className="formula">|true - approximate| / |true|</span>
          </div>
          <div className="formula-item">
            <strong>Percentage Error:</strong> <span className="formula">relative_error × 100%</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="input-form">
        <div className="form-group">
          <label>True Value</label>
          <input
            type="number"
            step="any"
            value={formData.true_value}
            onChange={(e) => setFormData({ ...formData, true_value: e.target.value })}
            placeholder="3.141592653"
          />
        </div>

        <div className="form-group">
          <label>Approximate Value</label>
          <input
            type="number"
            step="any"
            value={formData.approximate_value}
            onChange={(e) => setFormData({ ...formData, approximate_value: e.target.value })}
            placeholder="3.14"
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
          <div className="error-results">
            <div className="error-result-item">
              <div className="error-label">Absolute Error</div>
              <div className="error-value">{result.absolute_error.toFixed(10)}</div>
              <div className="error-formula">{result.formulas.absolute}</div>
            </div>

            <div className="error-result-item">
              <div className="error-label">Relative Error</div>
              <div className="error-value">
                {result.relative_error === Infinity ? '∞' : result.relative_error.toFixed(10)}
              </div>
              <div className="error-formula">{result.formulas.relative}</div>
            </div>

            <div className="error-result-item">
              <div className="error-label">Percentage Error</div>
              <div className="error-value">
                {result.percentage_error === Infinity ? '∞' : result.percentage_error.toFixed(8) + '%'}
              </div>
              <div className="error-formula">{result.formulas.percentage}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ErrorCalculation;
