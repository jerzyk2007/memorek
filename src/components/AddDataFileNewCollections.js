import { useEffect, useState } from 'react';
import './AddDataFileNewCollections.css';

const AddDataFileNewCollections = ({ index, name, count, newPhraseCollection, setNewPhraseCollection, allCollections, setCheckAdd }) => {
    const [errorName, setErrorName] = useState(false);
    const COLLECTION_NAME_REGEX = /^[a-zA-Z0-9_@ ]{4,23}$/;

    const checkCollectionName = (newName) => {
        const checkName = COLLECTION_NAME_REGEX.test(newName);
        if (checkName && newName.length >= 4 && !newName.endsWith(' ')) {
            setErrorName(false);
            if (allCollections.includes(newName.toLowerCase())) {
                setErrorName(true);
            }
            const newCollectionNames = newPhraseCollection.map(phrase => phrase.name);
            const filteredCollections = newCollectionNames.filter(name => name.toLowerCase() === newName.toLowerCase()).length;
            if (filteredCollections > 1) {
                setErrorName(true);
            }
        } else {
            setErrorName(true);
        }
    };

    const handleChangeName = (text) => {
        const newCollections = [...newPhraseCollection];
        newCollections[index].name = text;
        setNewPhraseCollection(newCollections);
        checkCollectionName(text);
    };
    useEffect(() => {
        if (errorName) {
            setCheckAdd(false);
        } else {
            setCheckAdd(true);
        }

    }, [errorName]);
    return (
        <section className="add_data_file_new_collections__options-name-count">
            <input
                style={errorName ? { color: 'red' } : null}
                type="text"
                className="add_data_file_new_collections__options-name-count--name"
                value={name}
                onChange={(e) => handleChangeName(e.target.value)}
            />
            <span className="add_data_file_new_collections__options-name-count--count">{count}</span>
        </section>
    );
};

export default AddDataFileNewCollections;
