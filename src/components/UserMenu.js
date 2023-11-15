import { Link } from 'react-router-dom';
import useData from './hooks/useData';
import { SlControlPlay, SlUser, SlBookOpen, SlList, SlGraduation, SlShuffle, SlActionUndo, SlActionRedo, SlMagnifier, SlShareAlt, SlSettings } from "react-icons/sl";

import './UserMenu.css';

const UserMenu = () => {
    // const { LearnOrTest, languageSwitch, setLanguageSwitch, changeMenu, setChangeMenu, auth } = useData();

    return (
        <div className="user_menu">
            {/* <Link to="/" className="user_menu-link"> */}
            <SlBookOpen />
            {/* </Link> */}
            {/* <Link to="/memorek/" className="user_menu-link">
                <SlBookOpen />
            </Link>
            {LearnOrTest === 'learn' && changeMenu && <Link to="/memorek/learn" className="user_menu-link" >
                <SlControlPlay />
            </Link>}
            {LearnOrTest === 'test' && changeMenu && <Link to="/memorek/test" className="user_menu-link" >
                <SlGraduation />
            </Link>}
            {!changeMenu && <Link to="/memorek/search" className="user_menu-link" >
                <SlMagnifier />
            </Link>}
            {changeMenu ? <Link to="/memorek/collections" className="user_menu-link" >
                <SlList />
            </Link> : <Link to="/memorek/add-data" className="user_menu-link" >
                <SlShareAlt />
            </Link>}
            {changeMenu
                ? <SlShuffle className={languageSwitch
                    ? "user_menu-button" : "user_menu-button user_menu-button--active"} onClick={() => setLanguageSwitch(!languageSwitch)} />
                :
                <Link to="/memorek/user-settings" className="user_menu-link" >
                    <SlSettings />
                </Link>}
            {!auth?.username
                ? < Link to="/memorek/login" className="user_menu-link" >
                    <SlUser />
                </Link>
                : changeMenu
                    ? <SlActionUndo className="user_menu-button" onClick={() => setChangeMenu(!changeMenu)} />
                    : <SlActionRedo className="user_menu-button" onClick={() => setChangeMenu(!changeMenu)} />} */}
        </div >
    );
};

export default UserMenu;