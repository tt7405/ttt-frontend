import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/login';
import Lobby from './pages/Lobby';
import GameBoard from './pages/GameBoard';
import Welcome from './pages/Welcome'; 

export default function App() {
  // Get auth token from localStorage
  const token = localStorage.getItem('token');

  return (
    // React Router v6 routing configuration
    <Routes>
      {/* Public welcome page */}
      <Route path="/" element={<Welcome />} />

      {/* Public registration page */}
      <Route path="/register" element={<Register />} />

      {/* Public login page */}
      <Route path="/login" element={<Login />} />

      {/* Protected lobby page: redirect to login if no token */}
      <Route
        path="/lobby"
        element={token ? <Lobby /> : <Navigate to="/login" />}
      />

      {/* Protected game board page: redirect to login if no token */}
      <Route
        path="/game/:id"
        element={token ? <GameBoard /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}