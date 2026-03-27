import { useState } from 'react';
import { authAPI } from '../api/endpoints';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuth(); // Function to save token and auth state
  const navigate = useNavigate();

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await authAPI.login(username, password);
      login(response.data.token); // Save token to context & localStorage
      navigate('/lobby'); // Redirect to lobby
    } catch (err) {
      // Show error from backend or fallback message
      setError(err.response?.data?.message || 'Invalid username or password');
    }
  };

  return (
    <div className="container center-flex">
      <div className="card card-centered">
        <h1 className="page-title">Welcome Back</h1>
        <form onSubmit={handleSubmit}>
          {/* Username input */}
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              className="form-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password input */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Display error message */}
          {error && <div className="error-message">{error}</div>}

          {/* Submit button */}
          <button className="btn btn-primary btn-block mt-4" type="submit">
            Login
          </button>
        </form>

        {/* Link to registration */}
        <p className="text-center mt-8">
          Don't have an account? <Link className="link" to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}