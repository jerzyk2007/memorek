import { useState, useEffect } from 'react';
import useData from './hooks/useData';
import AddDataPhrase from './AddDataPhrase';
import './AddDataSingle.css';

const AddDataSingle = () => {
    const { collectionsData } = useData();

    const [selectAddType, setSelectAddType] = useState('');
    const [checkCollectionName, setCheckCollectionName] = useState(false);
    const [errorName, setErrorName] = useState('');
    const [nameCollection, setNameCollection] = useState('');
    const [newCollectionName, setNewCollectionName] = useState('');


    const handleCollection = (info) => {
        setSelectAddType(info);
        setNameCollection('');
        setNewCollectionName('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setNameCollection(newCollectionName);
    };

    const collectionItem = collectionsData.map((item, index) =>
    (
        <section className="add_data_single__collection-item" key={index}>
            <span className="add_data_single__collection-item-name">{item.name}</span>
            <span className="add_data_single__collection-item-count">- {item.count}/50</span>
            <button className="add_data_single__collection-item-select" disabled={item.count >= 50 ? true : false}
                onClick={() => setNameCollection(item.name)}
            >Select</button>
        </section>
    )
    );

    useEffect(() => {
        const check = collectionsData.map(item => item.name);
        if (newCollectionName.length >= 4) {
            if (check.some(item => item.toLowerCase() === newCollectionName.toLowerCase())) {
                setErrorName("The name is occupied.");
                setCheckCollectionName(false);

            } else {
                setCheckCollectionName(true);
                setErrorName("");
            }
        } else {
            setCheckCollectionName(false);
        }
    }, [newCollectionName]);

    useEffect(() => {
        setNewCollectionName('');
    }, [nameCollection, selectAddType]);


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
                {selectAddType === "new" && !nameCollection && < section className='add_data_single__collections-select'>
                    <label className='add_data_single__collections-select-warning'>{errorName}</label>
                    <form onSubmit={handleSubmit}>
                        <input
                            className='add_data_single__collections-select-text'
                            type='text'
                            placeholder='Enter name - min 4 char.'
                            value={newCollectionName}
                            onChange={(e) => { setNewCollectionName(e.target.value); }}
                        />
                        <button
                            className='add_data_single__collections-check'
                            type='submit'
                            disabled={!checkCollectionName}
                        >Select</button>
                    </form>
                </section>}
                {selectAddType === "complete" && !nameCollection && <section className="add_data_single-collections-list">
                    {collectionItem}
                </section>}

                {nameCollection &&
                    <AddDataPhrase
                        nameCollection={nameCollection}
                        setNameCollection={setNameCollection}
                    />}
            </section>
        </section >
    );
};

export default AddDataSingle;
