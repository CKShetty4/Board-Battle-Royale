const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  export function calcWinner(squares) {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  }
  
  export default function calcBestMove(squares, player) {
    const opponent = player === 'x' ? 'o' : 'x';
    let bestMove = null;
    let bestScore = -Infinity;
  
    for (let i = 0; i < 9; i++) {
      if (squares[i] === '') {
        squares[i] = player;
        let score = minimax(squares, 0, false, player, opponent);
        squares[i] = '';
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
  
    return bestMove;
  }
  
  function minimax(squares, depth, isMaximizing, player, opponent) {
    let winner = calcWinner(squares);
    if (winner) {
      if (winner.winner === player) {
        return 10 - depth;
      } else if (winner.winner === opponent) {
        return depth - 10;
      } else {
        return 0;
      }
    }
  
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (squares[i] === '') {
          squares[i] = player;
          let score = minimax(squares, depth + 1, false, player, opponent);
          squares[i] = '';
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (squares[i] === '') {
          squares[i] = opponent;
          let score = minimax(squares, depth + 1, true, player, opponent);
          squares[i] = '';
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }