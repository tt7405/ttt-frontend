import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div className="center-flex container text-center">
      
      {/* Main title */}
      <h1 className="hero-title">🎮 Tic-Tac-Toe</h1>
      
      {/* Subtitle / description */}
      <p className="hero-subtitle">
        Challenge your friends in real-time multiplayer matches with a modern, fast, and competitive experience.
      </p>
      
      {/* Navigation buttons */}
      <div className="flex-row mt-4">
        <Link to="/login">
          <button className="btn btn-glass">Login</button>
        </Link>
        <Link to="/register">
          <button className="btn btn-primary">Register</button>
        </Link>
      </div>
    </div>
  );
}