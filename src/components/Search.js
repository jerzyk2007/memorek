import { useState, useEffect } from "react";
import useData from "./hooks/useData";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import SearchItem from "./SearchItem";
import { LuLoader } from "react-icons/lu";
import './Search.css';

const Search = () => {
    const { collectionsName } = useData();
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
                <button className="search-button--search">Search</button>
            </form>
            {!isLoading ? (!findPhrases?.length ? <span className="search-warning">No phrases to display</span> : <>{searchPhrases}</>) :
                <div className="search__loading-title">
                    <p className='search__loading-title-text'>Please wait...</p>
                    <LuLoader className='search__loading-title-icon' />
                </div>
            }
        </section>
    );
};

export default Search;