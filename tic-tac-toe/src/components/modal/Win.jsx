import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../../context/GameContext";
import Oicon from "../icons/Oicon";
import Xicon from "../icons/Xicon";
import Confetti from "react-confetti";
import './Win.css';

const Win = () => {
  const { winner, handleNextRound, handleReset } = useContext(GameContext);
  const [showConfetti, setShowConfetti] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (winner && winner !== "no") {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setShowConfetti(false);
          setFadeOut(false);
        }, 1000); 
      }, 2000); 

      return () => clearTimeout(timer);
    }
  }, [winner]);

  return (
    <div className="score">
      {winner && winner !== "no" ? (
        <>
          {showConfetti && (
            <div className={`confetti-container ${fadeOut ? 'fade-out' : ''}`}>
              <Confetti width={window.innerWidth} height={window.innerHeight} />
            </div>
          )}
          <p>We have a winner!!</p>
          <h3
            className={`score__title ${
              winner === "o" ? "text-yellow" : "text-blue"
            } `}
          >
            {winner === "x" && <Xicon />}
            {winner === "o" && <Oicon />}
            Takes the round
          </h3>
        </>
      ) : (
        <h3 className="score__title text-yellow">No Winner !</h3>
      )}
      <div className="score__btns">
        <button className="btn btn-sm" onClick={handleReset}>
          Quit
        </button>
        <button
          className={`btn btn-sm ${
            winner === "x" ? "btn-yellow" : "btn-blue"
          }`}
          onClick={handleNextRound}
        >
          Next Round
        </button>
      </div>
    </div>
  );
};

export default Win;