import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gamesAPI } from '../api/endpoints';

export default function GameBoard() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch current game state from server
  const fetchGame = async () => {
    try {
      const response = await gamesAPI.getGameDetails(id);
      setGame(response.data);
    } catch (err) {
      setError("Could not load game.");
    }
  };

  // Poll game every 3 seconds to see opponent moves
  useEffect(() => {
    fetchGame();
    const interval = setInterval(fetchGame, 3000);
    return () => clearInterval(interval);
  }, [id]);

  // Show error if fetch fails
  if (error) return (
    <div className="error-screen">
      <span>⚠ {error}</span>
    </div>
  );

  // Show loading spinner until game data is ready
  if (!game) return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <span>Loading Game #{id}...</span>
    </div>
  );

  // Handle player making a move
  const handleMove = async (row, col) => {
    try {
      await gamesAPI.makeMove(id, row, col);
      fetchGame();
    } catch (err) {
      alert(err.response?.data?.errors?.[0] || "Invalid move! Is it your turn?");
    }
  };

  const isInProgress = game.status === 'progress';
  const p2Name = game.second_player?.username || 'Waiting...';

  return (
    <div className="container game-board-container">

      {/* Info panel with game ID, title, status, and players */}
      <div className="game-info-panel">
        <span className="game-id-label">Game #{id}</span>
        <h2 className="game-title">Tic-Tac-Toe</h2>

        {/* Status pill */}
        <div className={`status-pill ${isInProgress ? 'status-progress' : ''}`}>
          {isInProgress && <span className="live-dot"></span>}
          <span className={`badge badge-${game.status}`} style={{ padding: '0.2rem 0.6rem' }}>
            {game.status}
          </span>
        </div>

        {/* Player info */}
        <div className="game-versus-row">
          <div className="game-player-chip">
            <span className="chip-mark-x">✕</span>
            <span>{game.first_player.username}</span>
          </div>
          <span className="chip-vs">VS</span>
          <div className="game-player-chip">
            <span className="chip-mark-o">○</span>
            <span>{p2Name}</span>
          </div>
        </div>
      </div>

      {/* Game board grid */}
      <div className="board-wrapper">
        <div className="board-grid">
          {game.board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                className={`board-cell ${cell === 1 ? 'cell-x' : cell === 2 ? 'cell-o' : ''}`}
                disabled={cell !== 0 || game.status !== 'progress'}
                onClick={() => handleMove(rowIndex, colIndex)}
              >
                {cell === 1 ? 'X' : cell === 2 ? 'O' : ''}
              </button>
            ))
          )}
        </div>
      </div>

      <button className="btn btn-glass" onClick={() => navigate('/lobby')}>
        ← Back to Lobby
      </button>
    </div>
  );
}