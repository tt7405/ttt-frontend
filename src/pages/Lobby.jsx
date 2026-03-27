import { useEffect, useState } from 'react';
import { gamesAPI } from '../api/endpoints';
import { useNavigate } from 'react-router-dom';

export default function Lobby() {
  const [games, setGames] = useState([]);
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const navigate = useNavigate();

  // Fetch paginated list of games from backend
  const fetchGames = async () => {
    try {
      const response = await gamesAPI.getGames(limit, offset);
      setGames(response.data.results);
      setCount(response.data.count);
    } catch (err) {
      console.error("Failed to fetch games", err);
    }
  };

  // Create a new game and navigate to it
  const handleCreateGame = async () => {
    try {
      const response = await gamesAPI.createGame();
      navigate(`/game/${response.data.id}`);
    } catch (err) {
      console.error("Failed to create game", err);
      alert("Could not create game. Check console.");
    }
  };

  // Poll the lobby every 5 seconds to update game list
  useEffect(() => {
    fetchGames();
    const interval = setInterval(fetchGames, 5000);
    return () => clearInterval(interval);
  }, [offset]);

  return (
    <div className="container">
      {/* Lobby header */}
      <div className="lobby-header">
        <h1 className="page-title" style={{ marginBottom: 0, textAlign: 'left' }}>Game Lobby</h1>
        <button className="btn btn-success" onClick={handleCreateGame}>
          + New Game
        </button>
      </div>

      {/* List of game cards */}
      <div className="game-list">
        {games.map((game) => {
          const p2Name = game.second_player?.username || 'Waiting...';
          const p1Name = game.first_player.username;

          return (
            <div key={game.id} className="game-card">
              <div className="game-card-top">
                <span className="game-card-id">Game #{game.id}</span>
                <span className={`badge badge-${game.status}`}>{game.status}</span>
              </div>

              {/* Mini-board preview */}
              <div className="mini-board-container">
                <div className="mini-board">
                  {game.board.map((row, rIdx) => 
                    row.map((cell, cIdx) => (
                      <div key={`${rIdx}-${cIdx}`} className={`mini-cell ${cell === 1 ? 'x' : cell === 2 ? 'o' : ''}`}>
                        {cell === 1 ? 'X' : cell === 2 ? 'O' : ''}
                      </div>
                    ))
                  )}
                </div>

                {/* Player info */}
                <div className="player-info-stacked">
                  <div className="player-row x">
                    <div className="symbol">X</div>
                    <span className="player-name" title={p1Name}>{p1Name}</span>
                  </div>
                  <div className="player-row o">
                    <div className="symbol">O</div>
                    <span className="player-name" title={p2Name}>{p2Name}</span>
                  </div>
                </div>
              </div>

              {/* Action button: join or view */}
              <div className="game-card-footer">
                {game.status === 'open' ? (
                  <button
                    className="btn btn-primary btn-block"
                    onClick={async () => {
                      try {
                        await gamesAPI.joinGame(game.id);
                        navigate(`/game/${game.id}`);
                      } catch (err) {
                        alert("Could not join: " + (err.response?.data?.message || err.message));
                      }
                    }}
                  >
                    Join Game →
                  </button>
                ) : (
                  <button
                    className="btn btn-glass btn-block"
                    onClick={() => navigate(`/game/${game.id}`)}
                  >
                    View Game
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination controls */}
      <div className="pagination">
        <button
          className="btn btn-glass btn-sm"
          disabled={offset === 0}
          onClick={() => setOffset(offset - limit)}
        >
          ← Prev
        </button>
        <span className="pagination-label">Page {Math.floor(offset / limit) + 1}</span>
        <button
          className="btn btn-glass btn-sm"
          disabled={offset + limit >= count}
          onClick={() => setOffset(offset + limit)}
        >
          Next →
        </button>
      </div>
    </div>
  );
}