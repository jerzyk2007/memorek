import { useState, useEffect } from "react";
import useData from "./hooks/useData";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import SearchItem from "./SearchItem";
import PleaseWait from "./PleaseWait";
import './Search.css';

const Search = () => {
    const { collectionsData, fetchCollectionsData } = useData();
    const axiosPrivate = useAxiosPrivate();

    const [search, setSearch] = useState('');
    const [findPhrases, setFindPhrases] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [editPhrase, setEditPhrase] = useState(false);

    const updatePhrase = (updatedPhrase) => {
        const updatedIndex = findPhrases.findIndex((phrase) => phrase._id === updatedPhrase._id);
        setFindPhrases((prevPhrases) => {
            const newPhrases = [...prevPhrases];
            newPhrases[updatedIndex] = updatedPhrase;
            return newPhrases;
        });
    };

    const deletePhrase = (id) => {
        const updatedIndex = findPhrases.filter(phrase => phrase._id !== id);
        setFindPhrases(updatedIndex);
        fetchCollectionsData();
    };

    const searchPhrases = findPhrases.map((phrase, index) =>
        <SearchItem
            key={index}
            phrase={phrase}
            editPhrase={editPhrase}
            setEditPhrase={setEditPhrase}
            findPhrases={findPhrases}
            setFindPhrases={setFindPhrases}
            updatePhrase={updatePhrase}
            deletePhrase={deletePhrase}
        />
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        const collectionsName = collectionsData.map(obj => obj.name);
        try {
            if (search) {
                setIsLoading(true);
                const response = await axiosPrivate.get('/search/phrases',
                    {
                        params: { collections: collectionsName, search },
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true,
                    }
                );
                setFindPhrases(response.data);
            }
            setIsLoading(false);
            setEditPhrase(false);
        }
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (!search) {
            setFindPhrases([]);
        }
    }, [search]);

    return (
        <section className="search">
            <form className="search-form" onSubmit={handleSubmit}>
                <input
                    className="search-text"
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="search-button--search" type="submit">Search</button>
            </form>
            {!isLoading ? (!findPhrases?.length ? <span className="search-warning">No phrases to display</span> : <>{searchPhrases}</>) :
                <PleaseWait />
            }
        </section>
    );
};

export default Search;