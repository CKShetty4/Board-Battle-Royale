import './App.css';
import Oicon from "../src/components/icons/Oicon";
import Xicon from "../src/components/icons/Xicon";
import Board from './components/board';

function App() {
  return (
    <div className="App">
      <Xicon />
      <Board/>
       <header className="App-header">
        This is a Tic Tac Toe game project modified.
      </header>
      <Oicon />
    </div>
  );
}

export default App;
