import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './components/context/DataProvider';
import Board from './components/Board';
import UserMenu from './components/UserMenu';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <DataProvider>
          <Board />
          <UserMenu />
        </DataProvider>
      </Router>
    </div>
  );
}

export default App;
