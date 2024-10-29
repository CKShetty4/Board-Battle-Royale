import { createContext, useEffect, useState, useContext } from "react";
import calcBestMove, { calcWinner } from "../helpers/calcSquares";
import { ModalContext } from "./ModalContext";

const GameContext = createContext();

const GameState = (props) => {
  const [screen, setScreen] = useState("start"); // start || game
  const [playMode, setPlayMode] = useState("user"); // user || cpu
  const [activeUser, setActiveUser] = useState("x"); // x || o
  const [squares, setSquares] = useState(new Array(9).fill(""));
  const [xnext, setXnext] = useState(false);
  const [winner, setWinner] = useState(null);
  const [winnerLine, setWinnerLine] = useState(null);
  const [ties, setTies] = useState({ x: 0, o: 0 });

  const { showModal, hideModal, setModalMode } = useContext(ModalContext);

  useEffect(() => {
    //check if cpu turn
    let currentUser = xnext ? "o" : "x";
    if (playMode === "cpu" && currentUser !== activeUser && !winner) {
      cpuNextMove(squares);
    }
    checkNoWinner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xnext, winner, screen]);

  const handleStart = (player) => {
    setPlayMode(player);
    setScreen("game");
  };

  const handleSquareClick = (ix) => {
    if (squares[ix] || winner) {
      return;
    }
    let currentUser = xnext ? "o" : "x";
    if (playMode === "cpu" && currentUser !== activeUser) {
      return;
    }
    let ns = [...squares];
    ns[ix] = !xnext ? "x" : "o";
    setSquares(ns);
    setXnext(!xnext);
    checkWinner(ns);
  };

  const checkWinner = (ns) => {
    const isWinner = calcWinner(ns);
    if (isWinner) {
      setWinner(isWinner.winner);
      setWinnerLine(isWinner.line);
      const nties = { ...ties };
      nties[isWinner.winner] += 1;
      setTies(nties);
      showModal();
      setModalMode("winner");
    }
  };

  const cpuNextMove = (sqrs) => {
    const cpuPlayer = activeUser  === "x" ? "o" : "x";

    // Check if it's the first move for the CPU
    const isFirstMove = squares.every(square => square === "");
    console.log("Current Squares:", squares);
    console.log("Is First Move for CPU:", isFirstMove);

    // If it's not the first move, we need to select from available squares
    if (!isFirstMove) {
        // Create an array of available square indices
        const availableSquares = squares.map((square, index) => (square === "" ? index : null)).filter(index => index !== null);
        console.log("Available Squares for Random Move:", availableSquares);

        // Select a random index from available squares
        if (availableSquares.length > 0) {
            const randomIndex = availableSquares[Math.floor(Math.random() * availableSquares.length)];

            // Make the CPU's random move
            if (randomIndex !== undefined) {
                let ns = [...squares];
                ns[randomIndex] = cpuPlayer; // Make the CPU's random move
                setSquares(ns);
                setXnext(!xnext);
                checkWinner(ns);
            }
        }
    } else {
        // If it's the first move for the CPU, select a random square
        const randomIndex = Math.floor(Math.random() * 9);
        let ns = [...squares];
        ns[randomIndex] = cpuPlayer; // Make the CPU's random move
        setSquares(ns);
        setXnext(!xnext);
        checkWinner(ns);
    }
};

  const handleReset = () => {
    setSquares(new Array(9).fill(""));
    setXnext(false);
    setWinner(null);
    setWinnerLine(null);
    setActiveUser("x");
    setTies({ x: 0, o: 0 });
    hideModal();
    setScreen("start");
  };

  const handleNextRound = () => {
    setSquares(new Array(9).fill(""));
    setXnext(winner === "x");
    setWinner(null);
    setWinnerLine(null);
    hideModal();
  };

  const checkNoWinner = () => {
    const moves = squares.filter((sq) => sq === "");
    if (moves.length === 0) {
      setWinner("no");
      showModal();
      setModalMode("winner");
    }
  };

  return (
    <GameContext.Provider
      value={{
        squares,
        winner,
        winnerLine,
        xnext,
        ties,
        screen,
        activeUser,
        playMode,
        handleStart,
        setActiveUser,
        setPlayMode,
        setTies,
        handleSquareClick,
        handleReset,
        handleNextRound,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export { GameContext, GameState };
