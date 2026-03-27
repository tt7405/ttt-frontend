import { useState } from 'react';
import { authAPI } from '../api/endpoints';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error messages

    try {
      // Call API to register new user
      await authAPI.register(username, password);

      // Inform user and redirect to login
      alert('Registration successful! Please login.');
      navigate('/login');

    } catch (err) {
      // Log full backend error for debugging
      console.error("Registration Error Detail:", err.response?.data);

      // Show user-friendly message
      const apiMessage = err.response?.data?.message || 'Registration failed';
      setError(apiMessage);
    }
  };

  return (
    <div className="container center-flex">
      <div className="card card-centered">
        <h1 className="page-title">Create Account</h1>
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

          {/* Error message */}
          {error && <div className="error-message">{error}</div>}

          {/* Submit button */}
          <button className="btn btn-primary btn-block mt-4" type="submit">
            Register
          </button>
        </form>

        {/* Link to login */}
        <p className="text-center mt-8">
          Already have an account? <Link className="link" to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}