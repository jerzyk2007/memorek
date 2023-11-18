import { createContext, useState, useEffect } from "react";
import api from '../api/axios';

const DataContext = createContext({});


export const DataProvider = ({ children }) => {
    const [phrases, setPhrases] = useState([]);
    const [test, setTest] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [collectionsName, setCollectionsName] = useState([]);
    const [LearnOrTest, setLearnOrTest] = useState('learn');
    const [languageSwitch, setLanguageSwitch] = useState(true);
    const [auth, setAuth] = useState(localStorage.getItem("menu") === null ? {} : localStorage.getItem("persist") === null || localStorage.getItem("persist") === false ? {} : { username: localStorage.getItem("username") });
    const [changeMenu, setChangeMenu] = useState(localStorage.getItem("menu") === null ? true : JSON.parse(localStorage.getItem("menu")));


    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

    const fetchPhrases = async (collections) => {
        try {
            const URL = languageSwitch ? "/phrases/learn/normal/" : "/phrases/learn/reverse/";
            const response = await api.get(`${URL}${collections}`);
            setPhrases(response.data);
        }
        catch (err) {
            console.log(`Error: ${err.message}`);
            setErrorMessage(`Error: ${err.message}`);
        }
    };

    const fetchTestPhrases = async (collections) => {
        try {
            const URL = languageSwitch ? "/phrases/test/normal/" : "/phrases/test/reverse/";
            const response = await api.get(`${URL}${collections}`);
            setTest(response.data);
        }
        catch (err) {
            console.log(`Error: ${err.message}`);
            setErrorMessage(`Error: ${err.message}`);
        }
    };

    useEffect(() => {
        setPhrases([]);
        setTest([]);
    }, [languageSwitch]);

    useEffect(() => {
        const fetchCollectionsName = async () => {
            try {
                const response = await api.get('/collections');
                setCollectionsName(response.data);
            }
            catch (err) {
                console.log(`Error: ${err.message}`);
                setErrorMessage(`Error: ${err.message}`);
            }
        };
        fetchCollectionsName();

    }, []);

    useEffect(() => {
        localStorage.setItem("menu", JSON.stringify(changeMenu));
    }, [changeMenu]);


    return (
        <DataContext.Provider value={{ phrases, test, errorMessage, collectionsName, fetchPhrases, fetchTestPhrases, LearnOrTest, setLearnOrTest, languageSwitch, setLanguageSwitch, auth, setAuth, changeMenu, setChangeMenu, persist, setPersist }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
