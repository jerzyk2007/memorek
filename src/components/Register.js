import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FiX } from "react-icons/fi";
import './Register.css';

const Register = () => {

    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatchPassword, setValidMatchPassword] = useState(false);
    const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);


    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const USER_REGEX = /^[A-z][A-z0-9-_@]{3,23}$/;
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const v1 = USER_REGEX.test(username);
            const v2 = PASSWORD_REGEX.test(password);

            if (!v1 || !v2) {
                setErrMsg("Invalid entry");
                return;
            }
            await axiosPrivate.post('/user/register',

                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            setSuccess(true);
            setUsername('');
            setPassword('');
            setMatchPassword('');

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

    const handleExit = () => {
        navigate(-1);
    };

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(username);
        setValidUsername(result);
    }, [username]);

    useEffect(() => {
        const result = PASSWORD_REGEX.test(password);
        setValidPassword(result);
        const match = password === matchPassword;
        setValidMatchPassword(match);
    }, [password, matchPassword]);

    useEffect(() => {
        setErrMsg('');
    }, [username, password, matchPassword]);

    return (
        <>
            {success ?
                (<section className="register">
                    <h1 className="register-title">Success!</h1>
                    <button className="register-button" onClick={handleExit}>Exit</button>
                </section>) :
                (<section className="register">
                    <p className={errMsg ? "register-error-message" : "register-error-message--offscreen"} ref={errRef}>{errMsg}</p>
                    <h1 className="register-title">Register</h1>
                    <form className="register__container" onSubmit={handleSubmit}>

                        <label htmlFor="username" className="register__container-title">
                            Username:
                            <span className={validUsername ? "register__container-title--valid" : "register__container-title--hide"}><FontAwesomeIcon icon={faCheck} /></span>
                            <span className={validUsername || !username ? "register__container-title--hide" : "register__container-title--invalid"}><FontAwesomeIcon icon={faTimes} /></span>
                        </label>
                        <input
                            className="register-text"
                            type="text"
                            id="username"
                            autoComplete="off"
                            ref={userRef}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p className={userFocus && username && !validUsername ? "register__container-instructions" : "register-error-message--offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                        <label htmlFor="password" className="register__container-title">
                            Password:
                            <span className={validPassword ? "register__container-title--valid" : "register__container-title--hide"}><FontAwesomeIcon icon={faCheck} /></span>
                            <span className={validPassword || !password ? "register__container-title--hide" : "register__container-title--invalid"}><FontAwesomeIcon icon={faTimes} /></span>
                        </label>
                        <input
                            className="register-text"
                            type="password"
                            id="password"
                            autoComplete="off"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />
                        <p className={passwordFocus && !validPassword ? "register__container-instructions" : "register-error-message--offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
                        <label htmlFor="confirm_password" className="register__container-title">
                            Confirm Password:
                            <span className={validMatchPassword && matchPassword ? "register__container-title--valid" : "register__container-title--hide"}><FontAwesomeIcon icon={faCheck} /></span>
                            <span className={validMatchPassword || !matchPassword ? "register__container-title--hide" : "register__container-title--invalid"}><FontAwesomeIcon icon={faTimes} /></span>
                        </label>
                        <input
                            className="register-text"
                            type="password"
                            id="confirm_password"
                            autoComplete="off"
                            value={matchPassword}
                            onChange={(e) => setMatchPassword(e.target.value)}
                            required
                            onFocus={() => setMatchPasswordFocus(true)}
                            onBlur={() => setMatchPasswordFocus(false)}
                        />
                        <p className={matchPasswordFocus && !validMatchPassword ? "register__container-instructions" : "register-error-message--offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>
                        <button className="register-button" disabled={!validUsername || !validPassword || !validMatchPassword}>Register</button>
                    </form>
                    <FiX className='register-close-button' onClick={() => navigate(-1)} />
                </section>)}
        </>
    );
};

export default Register;
