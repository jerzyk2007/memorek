import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Instruction from './Instruction';
import './Board.css';

const Board = () => {
    return (
        <div className='board'>
            <Router>
                <Routes>
                    {/* public routes*/}
                    <Route path='/' element={<Instruction />} />
                </Routes>
            </Router>
        </div>
    );
};

export default Board;