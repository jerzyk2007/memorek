import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "./hooks/useRefreshToken";
import useData from "./hooks/useData";
import PleaseWait from './PleaseWait';
import './PersistLogin.css';




const PersistLogin = () => {
    const refresh = useRefreshToken();


    const { auth, persist } = useData();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                if (localStorage?.getItem("username")) {
                    await refresh();
                }
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        };
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, []);

    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? < PleaseWait />
                    : <Outlet />}
        </>
    );
};

export default PersistLogin;;