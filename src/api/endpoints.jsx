import api from './axios';

// Authentication-related API calls
export const authAPI = {
  // Register a new user
  register: (username, password) => api.post('/register/', { username, password }),

  // Log in an existing user
  login: (username, password) => api.post('/login/', { username, password }),
};

// Game-related API calls
export const gamesAPI = {
  // Get a list of games with pagination
  getGames: (limit = 10, offset = 0) => 
    api.get('/games/', { params: { limit, offset } }),

  // Create a new game
  createGame: () => api.post('/games/'),

  // Join an existing game by ID
  joinGame: (id) => api.post(`/games/${id}/join/`),

  // Fetch details of a specific game
  getGameDetails: (id) => api.get(`/games/${id}/`),

  // Make a move in a game at the given row and column
  makeMove: (id, row, col) => 
    api.post(`/games/${id}/move/`, { row, col }),
};