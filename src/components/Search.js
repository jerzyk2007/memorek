import { useState } from "react";
const Search = () => {
    const [search, setSearch] = useState('');
    const [findPhrases, setFindPhrases] = useState([]);

    return (
        <section className="search">
            <form className="serach-form">
                <input
                    className="search-text"
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
        </section>
    );
};

export default Search;