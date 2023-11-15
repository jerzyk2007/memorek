import { useNavigate } from "react-router";
import useData from './hooks/useData';
import useLogout from "./hooks/useLogout";
import { Link } from 'react-router-dom';
import { FiX } from "react-icons/fi";
import './UserSettings.css';

const UserSettings = () => {
    const { auth } = useData();
    const navigate = useNavigate();
    const logout = useLogout();

    const handleLogout = async () => {
        await logout();
        navigate('/memorek');
    };

    return (
        <section className='user_settings'>
            {auth?.roles?.includes(200) &&
                <Link to="/memorek/user-settings/register" className="user_settings-link" >
                    <button className="user_settings-button"  >Register new user</button>
                </Link>}
            <Link to="/memorek/user-settings/username" className="user_settings-link" >
                <button className="user_settings-button" >Change user name</button>
            </Link>
            <Link to="/memorek/user-settings/changepass" className="user_settings-link" >
                <button className="user_settings-button" >Change password</button>
            </Link>
            <Link to="/memorek/user-settings/logout" className="user_settings-link" >
                <button className="user_settings-button" onClick={handleLogout}>Log out</button>
            </Link>

            <FiX className='user_settings-close-button' onClick={() => navigate(-1)} />
        </section>
    );
};

export default UserSettings;