import UserMenu from "./UserMenu";
import Board from "./Board";
import './Memorek.css';

const Memorek = () => {

    return (
        <div className='memorek'>
            <Board />
            <UserMenu />
        </div>
    );
};

export default Memorek;