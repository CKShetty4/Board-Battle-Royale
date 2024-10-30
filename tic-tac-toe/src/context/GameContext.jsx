import { createContext, useEffect, useState, useContext } from "react";
import calcBestMove, { calcWinner } from "../helpers/calcSquares";
import { ModalContext } from "./ModalContext";

const GameContext = createContext();

const GameState = (props) => {
  const [screen, setScreen] = useState("start"); // start || game
  const [playMode, setPlayMode] = useState("user"); // user || cpu
  const [activeUser , setActiveUser ] = useState("x"); // x || o
  const [squares, setSquares] = useState(new Array(9).fill(""));
  const [xnext, setXnext] = useState(false);
  const [winner, setWinner] = useState(null);
  const [winnerLine, setWinnerLine] = useState(null);
  const [ties, setTies] = useState({ x: 0, o: 0, no:0 });
  const [cpuFirstMove, setCpuFirstMove] = useState(true); 

  const { showModal, hideModal, setModalMode } = useContext(ModalContext);

  useEffect(() => {
    // Check if it's CPU's turn
    let currentUser  = xnext ? "o" : "x";
    if (playMode === "cpu" && currentUser  !== activeUser  && !winner) {
      cpuNextMove(squares);
    }
    checkNoWinner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xnext, winner, screen]);

  const handleStart = (player) => {
    setPlayMode(player);
    setScreen("game");
    setCpuFirstMove(true); 
  };

  const handleSquareClick = (ix) => {
    if (squares[ix] || winner) {
      return;
    }
    let currentUser  = xnext ? "o" : "x";
    if (playMode === "cpu" && currentUser  !== activeUser ) {
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
      
      // Update only the winner's score
      if (isWinner.winner === 'x') {
        nties.x += 1;
      } else if (isWinner.winner === 'o') {
        nties.o += 1;
      }
      
      setTies(nties);
      showModal();
      setModalMode("winner");
    } else {
      // Check for a tie if there's no winner
      checkNoWinner();
    }
  };

  const cpuNextMove = (sqrs) => {
    const cpuPlayer = activeUser  === "x" ? "o" : "x"; 
  
    setTimeout(() => {
      if (cpuFirstMove) {
        const randomIndex = Math.floor(Math.random() * 9);
        let ns = [...squares];
        ns[randomIndex] = cpuPlayer;
        setSquares(ns);
        setXnext(!xnext);
        checkWinner(ns);
        setCpuFirstMove(false); 
      } else {
        const bestMove = calcBestMove(squares, cpuPlayer);
        if (bestMove !== null) {
          let ns = [...squares];
          ns[bestMove] = cpuPlayer; 
          setSquares(ns);
          setXnext(!xnext);
          checkWinner(ns);
        }
      }
    }, 100); 
  };

  const handleReset = () => {
    setSquares(new Array(9).fill(""));
    setXnext(false);
    setWinner(null);
    setWinnerLine(null);
    setActiveUser ("x");
    setTies({ x: 0, o: 0 });
    hideModal();
    setScreen("start");
    setCpuFirstMove(true); 
  };

  const handleNextRound = () => {
    setSquares(new Array(9).fill(""));
    setXnext(winner === "x");
    setWinner(null);
    setWinnerLine(null);
    hideModal();
    setCpuFirstMove(true); 
  };

  const checkNoWinner = () => {
    const moves = squares.filter((sq) => sq === "");
    if (moves.length === 0 && !winner) {
      setWinner("no");
      const nties = { ...ties };
      nties.no += 1;
      setTies(nties);
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