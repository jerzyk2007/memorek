import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import useData from "./hooks/useData";
import useLogout from "./hooks/useLogout";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FiX } from "react-icons/fi";
import './ChangeUserName.css';

const ChangeUserName = () => {
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const logout = useLogout();

    const { auth } = useData();

    const [newUsername, setNewUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    const USER_REGEX = /^[A-z][A-z0-9-_@]{3,23}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const v1 = USER_REGEX.test(newUsername);

            if (!v1) {
                setErrMsg("Invalid entry");
                return;
            }
            await axiosPrivate.patch('/user/change-name',

                JSON.stringify({
                    username: auth.username,
                    newUsername
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            setNewUsername('');
            logout();

        }
        catch (err) {
            if (!err?.response) {
                setErrMsg('No server response.');
            } else if (err.response?.status === 400) {
                setErrMsg('Invalid username or password.');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized.');
            } else if (err.response?.status === 409) {
                setErrMsg('User is existing in database.');
            } else {
                setErrMsg('Register failed.');
            }
        }
    };

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(newUsername);
        setValidUsername(result);
    }, [newUsername]);

    useEffect(() => {
        setErrMsg('');
    }, [newUsername]);
    return (
        <>
            <section className="change_user_name">
                <p className={errMsg ? "change_user_name-error-message" : "change_user_name-error-message--offscreen"} ref={errRef}>{errMsg}</p>
                <h1 className="change_user_name-title">Change username</h1>
                <h3 className="change_user_name-info">If the username change is successful, you will be automatically logged out.</h3>
                <form className="change_user_name__container" onSubmit={handleSubmit}>

                    <label htmlFor="username" className="change_user_name__container-title">
                        Username:
                        <span className={validUsername ? "change_user_name__container-title--valid" : "change_user_name__container-title--hide"}><FontAwesomeIcon icon={faCheck} /></span>
                        <span className={validUsername || !newUsername ? "change_user_name__container-title--hide" : "change_user_name__container-title--invalid"}><FontAwesomeIcon icon={faTimes} /></span>
                    </label>
                    <input
                        className="change_user_name-text"
                        type="text"
                        id="username"
                        autoComplete="off"
                        placeholder={auth.username}
                        ref={userRef}
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        required
                    // onFocus={() => setUserFocus(true)}
                    // onBlur={() => setUserFocus(false)}
                    />
                    <p className={newUsername && !validUsername ? "change_user_name__container-instructions" : "change_user_name-error-message--offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>

                    <button className="change_user_name-button" disabled={!validUsername}>Change</button>
                </form>
                <FiX className='change_user_name-close-button' onClick={() => navigate(-1)} />
            </section>
        </>
    );
};

export default ChangeUserName;