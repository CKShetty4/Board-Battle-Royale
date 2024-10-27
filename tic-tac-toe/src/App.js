import { useContext } from "react";
import Board from "./components/board";
import { GameContext } from "./context/GameContext";

function App() {
  // const { screen } = useContext(GameContext);
  return (
    <div className="App">
      <div className="container">
        <Board />
      </div>
    </div>
  );
}

export default App;
