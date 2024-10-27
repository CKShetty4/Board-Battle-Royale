// src/App.js
import React from "react";
import Board from "../src/components/board";
import './App.css'; // Import the CSS file

const App = () => {
  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <Board />
    </div>
  );
};

export default App;