

Tic-Tac-Toe Frontend
Project Overview

This is a React-based frontend for a Tic-Tac-Toe game. It includes user registration, login, lobby management, and game board functionality. The project uses React Router for page navigation and a context provider for authentication state management.

Features
Welcome Page – Introductory landing page for users.
Registration & Login – Users can create an account and log in; authentication state is persisted in localStorage.
Lobby – Shows available games or allows creating a new game. Accessible only if logged in.
Game Board – Interactive Tic-Tac-Toe board. Users play against other users (or local game).
Protected Routes – Pages like Lobby and GameBoard redirect to login if the user is not authenticated.
Project Structure
src/
 ├─ App.jsx           # Main routing logic
 ├─ main.jsx          # Entry point; renders <App /> inside BrowserRouter and AuthProvider
 ├─ index.css         # Global styles
 ├─ context/
 │    └─ AuthContext.jsx  # Provides authentication state across the app
 └─ pages/
      ├─ Welcome.jsx
      ├─ Register.jsx
      ├─ Login.jsx
      ├─ Lobby.jsx
      └─ GameBoard.jsx