import React from "react";

const BoardCard = ({ user = "nouser", index }) => {
  return (
    <div className={`card ${user ? "active" : "shadow-gray"}`}>
      {user === "x" ? "X" : user === "o" ? "O" : ""}
    </div>
  );
};

export default BoardCard;