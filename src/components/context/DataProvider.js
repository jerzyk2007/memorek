import { createContext, useState, useEffect } from "react";
import api from '../api/axios';

const DataContext = createContext({});


export const DataProvider = ({ children }) => {
    const [phrases, setPhrases] = useState([]);
    const [test, setTest] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [collectionsData, setCollectionsData] = useState([]);
    const [LearnOrTest, setLearnOrTest] = useState('learn');
    const [languageSwitch, setLanguageSwitch] = useState(true);
    const [auth, setAuth] = useState(localStorage.getItem("menu") === null ? {} : localStorage.getItem("persist") === null || localStorage.getItem("persist") === false ? {} : { username: localStorage.getItem("username") });
    const [changeMenu, setChangeMenu] = useState(localStorage.getItem("persist") === "true" && localStorage.getItem("menu") === "false" ?
        false : true);
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

    const fetchPhrases = async (collection) => {
        try {
            const URL = languageSwitch ? "/phrases/learn/normal/" : "/phrases/learn/reverse/";
            const response = await api.get(`${URL}${collection}`);
            setPhrases(response.data);
        }
        catch (err) {
            console.log(`Error: ${err.message}`);
            setErrorMessage(`Error: ${err.message}`);
        }
    };

    const fetchTestPhrases = async (collection) => {
        try {
            const URL = languageSwitch ? "/phrases/test/normal/" : "/phrases/test/reverse/";
            const response = await api.get(`${URL}${collection}`);
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

    const fetchCollectionsData = async () => {
        try {
            const response = await api.get('/collections');
            setCollectionsData(response.data);
        }
        catch (err) {
            console.log(`Error: ${err.message}`);
            setErrorMessage(`Error: ${err.message}`);
        }
    };

    useEffect(() => {
        fetchCollectionsData();
    }, []);

    useEffect(() => {
        localStorage.setItem("menu", JSON.stringify(changeMenu));
    }, [changeMenu]);


    return (
        <DataContext.Provider value={{ phrases, test, errorMessage, collectionsData, fetchPhrases, fetchTestPhrases, LearnOrTest, setLearnOrTest, languageSwitch, setLanguageSwitch, auth, setAuth, changeMenu, setChangeMenu, persist, setPersist, fetchCollectionsData }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
