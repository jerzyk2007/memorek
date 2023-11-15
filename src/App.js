import { DataProvider } from './components/context/DataProvider';
import Memorek from './components/Memorek';
import Board from './components/Board';
import UserMenu from './components/UserMenu';
import './App.css';

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Board />
        <UserMenu />
      </DataProvider>
    </div>
  );
}

export default App;
