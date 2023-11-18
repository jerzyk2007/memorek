import { Link } from 'react-router-dom';
import useData from './hooks/useData';
import { SlControlPlay, SlUser, SlBookOpen, SlList, SlGraduation, SlShuffle, SlActionUndo, SlActionRedo, SlMagnifier, SlShareAlt, SlSettings } from "react-icons/sl";

import './UserMenu.css';

const UserMenu = () => {
    const { LearnOrTest, languageSwitch, setLanguageSwitch, changeMenu, setChangeMenu, auth } = useData();

    return (
        <div className="user_menu">
            <Link to="/" className="user_menu-link">
                <SlBookOpen />
            </Link>
            {LearnOrTest === 'learn' && changeMenu && <Link to="/learn" className="user_menu-link" >
                <SlControlPlay />
            </Link>}
            {LearnOrTest === 'test' && changeMenu && <Link to="/test" className="user_menu-link" >
                <SlGraduation />
            </Link>}
            {!changeMenu && <Link to="/search" className="user_menu-link" >
                <SlMagnifier />
            </Link>}
            {changeMenu ? <Link to="/collections" className="user_menu-link" >
                <SlList />
            </Link> : <Link to="/add-data" className="user_menu-link" >
                <SlShareAlt />
            </Link>}
            {changeMenu
                ?
                <Link className={languageSwitch
                    ? "user_menu-link" : "user_menu-link user_menu-link--active"} >
                    <SlShuffle onClick={() => setLanguageSwitch(prev => !prev)} />
                </Link>
                :
                <Link to="/user-settings" className="user_menu-link" >
                    <SlSettings />
                </Link>}
            {!auth?.username
                ? < Link to="/login" className="user_menu-link" >
                    <SlUser />
                </Link>
                : changeMenu
                    ?
                    < Link className="user_menu-link" >
                        <SlActionUndo onClick={() => setChangeMenu(!changeMenu)} />
                    </Link>
                    :
                    < Link className="user_menu-link" >
                        <SlActionRedo onClick={() => setChangeMenu(!changeMenu)} />
                    </Link>
            }
        </div >
    );
};

export default UserMenu;