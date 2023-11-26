import { useState, useEffect } from 'react';
import api from './api/axios';
import './AddDataSingle.css';

const AddDataSingle = () => {
    const [selectCollection, setSelectCollection] = useState('');
    const [checkCollectionName, setCheckCollectionName] = useState('');
    const [errorName, setErrorName] = useState('');
    const [getCollection, setGetCollection] = useState([]);
    const [collectionsList, setCollectionsList] = useState(false);
    const [collectionsName, setCollectionsName] = useState('');
    const [newPhrase, setNewPhrase] = useState(
        {
            question: '',
            answer: ''
        }
    );

    const handleCollection = async (info) => {
        setSelectCollection(info);
        if (info === "complete") {
            try {
                const response = await api.get('/collections');
                setGetCollection(response.data);
                setCollectionsList(true);
            }
            catch (err) {
                console.error(err);
            }
        }
    };

    const handleSelect = (name) => {
        setCollectionsName(name);
        setCollectionsList(false);

    };

    const collectionItem = getCollection.map((item, index) =>
    (
        <section className="add_data_single__collection-item" key={index}>
            <span className="add_data_single__collection-item-name">{item.name}</span>
            <span className="add_data_single__collection-item-count">- {item.count}/50</span>
            <button className="add_data_single__collection-item-select" disabled={item.count >= 50 ? true : false}
                onClick={() => handleSelect(item.name)}
            >Select</button>
        </section>
    )
    );


    return (
        <section className="add_data_single">
            <section className="add_data_single__collections">
                <h3 className="add_data_single__collections-info">
                    Complete the collection or create a new one.
                </h3>
                <section className='add_data_single__collections-buttons'>
                    <button className='add_data_single__collections-button' onClick={() => { handleCollection('complete'); }}>Complete</button>
                    <button className='add_data_single__collections-button' onClick={() => { handleCollection('new'); }} >New collection</button>
                </section>
                {selectCollection === "new" && < section className='add_data_single__collections-select'>
                    <label className='add_data_single__collections-select-warning'>{errorName}</label>
                    <input
                        className='add_data_single__collections-select-text'
                        type='text'
                        placeholder='Collection name'
                        value={checkCollectionName}
                        onChange={(e) => { setCheckCollectionName(e.target.value); }}
                    />
                    <button className='add_data_single__collections-check'>Check</button>
                </section>}
                {collectionsList && <section className="add_data_single-collections-list">
                    {collectionItem}
                </section>}

                <section className="add_data_single__container">
                    <div className="add_data_single__container-question">
                        <p className="add_data_single__container-title--question">Question:</p>
                        <textarea className='add_data_single__container-add--question'
                            maxLength='150'
                            rows='6'
                            placeholder='Max 150 characters.'
                            value={newPhrase.question}
                            onChange={(e) => {
                                setNewPhrase(prev => ({
                                    ...prev,
                                    question: e.target.value
                                }));
                            }}
                        ></textarea>
                    </div>
                    <div className="add_data_single__container-line"></div>
                    <div className="add_data_single__container-answer">
                        <p className="add_data_single__container-title--answer">Answer:</p>
                        <textarea className='add_data_single__container-add--answer'
                            maxLength='150'
                            rows='6'
                            placeholder='Max 150 characters.'
                            value={newPhrase.answer}
                            onChange={(e) => {
                                setNewPhrase(prev => ({
                                    ...prev,
                                    answer: e.target.value
                                }));
                            }}
                        ></textarea>
                    </div>
                    <div className="add_data_single__container-buttons">
                        <button className='add_data_single__container-buttons--cancel'>Cancel</button>
                        <button className='add_data_single__container-buttons--add' disabled={!newPhrase.question || !newPhrase.answer ? true : false}>Add</button>
                    </div>
                </section>
            </section>
        </section >
    );
};

export default AddDataSingle;