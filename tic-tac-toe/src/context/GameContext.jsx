import { createContext, useEffect, useState } from "react";

const GameContext = createContext();
const GameState = (props) => {
  const [squares, setSquares] = useState(new Array(9).fill(""));
  const [xnext, setXnext] = useState(false);

    useEffect(() => {
const handleSquareClick = (ix) => {
    if (squares[ix]) {
      return;
    }
    let currentUser  = xnext ? "o" : "x";
    let ns = [...squares];
    ns[ix] = currentUser ; // Set the current user's mark on the square
  };
}, []);
};

export { GameContext };
