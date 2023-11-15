import { useNavigate, Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "./hooks/useData";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        if (!auth?.username) {
            navigate('/memorek/login');
        }
    }, [auth, navigate]);

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : <Navigate to='/memorek/login' />
    );

};

export default RequireAuth;
