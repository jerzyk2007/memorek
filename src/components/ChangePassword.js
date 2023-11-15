import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import useLogout from "./hooks/useLogout";
import useData from "./hooks/useData";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FiX } from "react-icons/fi";
import './ChangePassword.css';

const ChangePassword = () => {

    const passRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const logout = useLogout();

    const { auth } = useData();

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatchPassword, setValidMatchPassword] = useState(false);
    const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);


    const [errMsg, setErrMsg] = useState('');

    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const v1 = PASSWORD_REGEX.test(password);

            if (!v1) {
                setErrMsg("Invalid entry");
                return;
            }
            await axiosPrivate.patch('/user/change-pass',

                JSON.stringify({ username: auth.username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            setPassword('');
            setMatchPassword('');
            logout();
        }
        catch (err) {
            console.log('erorek');
            if (!err?.response) {
                setErrMsg('No server response.');
            } else if (err.response?.status === 400) {
                setErrMsg('Invalid password.');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized.');
            } else if (err.response?.status === 409) {
                setErrMsg('User is existing in database.');
            } else {
                setErrMsg('Change password failed.');
            }
        }
    };

    useEffect(() => {
        passRef.current.focus();
    }, []);

    useEffect(() => {
        const result = PASSWORD_REGEX.test(password);
        setValidPassword(result);
        const match = password === matchPassword;
        setValidMatchPassword(match);
    }, [password, matchPassword]);

    useEffect(() => {
        setErrMsg('');
    }, [password, matchPassword]);

    return (
        <section className="change_password">
            <p className={errMsg ? "change_password-error-message" : "change_password-error-message--offscreen"} ref={errRef}>{errMsg}</p>
            <h1 className="change_password-title">Change Password</h1>
            <h3 className="change_user_name-info">If the password change is successful, you will be automatically logged out.</h3>
            <form className="change_password__container" onSubmit={handleSubmit}>
                <label htmlFor="password" className="change_password__container-title">
                    Password:
                    <span className={validPassword ? "change_password__container-title--valid" : "change_password__container-title--hide"}><FontAwesomeIcon icon={faCheck} /></span>
                    <span className={validPassword || !password ? "change_password__container-title--hide" : "change_password__container-title--invalid"}><FontAwesomeIcon icon={faTimes} /></span>
                </label>
                <input
                    className="change_password-text"
                    type="password"
                    id="password"
                    autoComplete="off"
                    ref={passRef}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                />
                <p className={passwordFocus && !validPassword ? "change_password__container-instructions" : "change_password-error-message--offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase letters, a number and a special character.<br />
                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </p>
                <label htmlFor="confirm_password" className="change_password__container-title">
                    Confirm Password:
                    <span className={validMatchPassword && matchPassword ? "change_password__container-title--valid" : "change_password__container-title--hide"}><FontAwesomeIcon icon={faCheck} /></span>
                    <span className={validMatchPassword || !matchPassword ? "change_password__container-title--hide" : "change_password__container-title--invalid"}><FontAwesomeIcon icon={faTimes} /></span>
                </label>
                <input
                    className="change_password-text"
                    type="password"
                    id="confirm_password"
                    autoComplete="off"
                    value={matchPassword}
                    onChange={(e) => setMatchPassword(e.target.value)}
                    required
                    onFocus={() => setMatchPasswordFocus(true)}
                    onBlur={() => setMatchPasswordFocus(false)}
                />
                <p className={matchPasswordFocus && !validMatchPassword ? "change_password__container-instructions" : "change_password-error-message--offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                </p>
                <button className="change_password-button" disabled={!validPassword || !validMatchPassword}>Change password</button>
            </form>
            <FiX className='change_password-close-button' onClick={() => navigate(-1)} />
        </section>
    );
};

export default ChangePassword;
