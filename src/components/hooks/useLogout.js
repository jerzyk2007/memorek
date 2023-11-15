import axios from "../api/axios";
import useData from "./useData";

const useLogout = () => {
    const { setAuth, setChangeMenu } = useData();

    const logout = async () => {
        setAuth({});
        await setChangeMenu(true);
        localStorage.removeItem("menu");
        localStorage.removeItem("username");
        try {
            const response = await axios('/logout', {
                withCredentials: true
            });
        }
        catch (err) {
            console.error(err);
        }
    };
    return logout;
};

export default useLogout;