import { useState } from "react";
import useData from "./hooks/useData";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import './Search.css';

const Search = () => {
    const { collectionsName, phrases, auth } = useData();
    const axiosPrivate = useAxiosPrivate();

    const [search, setSearch] = useState('test');
    const [findPhrases, setFindPhrases] = useState(phrases);

    const searchPhrases = findPhrases.map((phrase, index) =>
    (
        <section className="search__container" key={index}>
            <p className="search-phrase">
                <span className="search-question">Question:</span> <span className="search-question-item">{phrase.question}</span>
            </p>
            <div className="search-line"></div>
            <p className="search-phrase">
                <span className="search-answer">Answer:</span>
                <span className="search-answer-item">{phrase.answer}</span>
            </p>
            <section className="search-button__container">
                <button className="search-button">Edit</button>
                <button className="search-button">Delete</button>
            </section>

        </section>)
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosPrivate.get('/search/test',

                JSON.stringify({
                    username: auth.username,
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            console.log(response.data);
        }
        catch (err) {
            console.log(err);
        }
    };
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
            </form>
            {!findPhrases?.length ? <span className="search-warning">No phrases to display</span> : <>{searchPhrases}</>
            }
        </section>
    );
};

export default Search;