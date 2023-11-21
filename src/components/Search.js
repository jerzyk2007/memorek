import { useState } from "react";
import useData from "./hooks/useData";
import './Search.css';

const Search = () => {
    const { collectionsName, phrases } = useData();

    const [search, setSearch] = useState('');
    const [findPhrases, setFindPhrases] = useState(phrases);

    const searchPhrases = findPhrases.map((phrase, index) => {
        return (
            <section className="search__container" key={phrase.index}>
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

            </section>);
    });

    return (
        <section className="search">
            <form className="search-form">
                <input
                    className="search-text"
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            {searchPhrases}
        </section>
    );
};

export default Search;