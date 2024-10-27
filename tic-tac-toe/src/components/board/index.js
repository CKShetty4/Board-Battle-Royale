import React from "react";
import "./Board.css";
import BoardCard from "./BoardCard";

const Board = () => {
  // Create an array to represent the squares on the board
  const squares = new Array(9).fill("");

  return (
    <div className="board">
      <div className="board__body">
        {squares.map((sq, ix) => (
          <BoardCard key={ix} user={sq} index={ix} active={false} />
        ))}
      </div>
    </div>
  );
};

export default Board;