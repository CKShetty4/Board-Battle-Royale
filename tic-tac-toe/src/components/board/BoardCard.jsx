import React, { useContext } from "react";
import { GameContext } from "../../context/GameContext";

const BoardCard = ({ user = "nouser", index }) => {
  const { handleSquareClick } = useContext(GameContext);

  return (
    <div
      className={`card ${user ? "active" : "shadow-gray"}`}
      onClick={() => handleSquareClick(index)} // Handle click
    >
      {user === "x" ? "X" : user === "o" ? "O" : ""}
    </div>
  );
};

export default BoardCard;