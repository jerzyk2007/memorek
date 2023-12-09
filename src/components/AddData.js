import { useState, useEffect } from 'react';
import useData from './hooks/useData';
import AddDataPhrase from './AddDataPhrase';
import AddDataFile from './AddDataFile';
import './AddData.css';

const AddDataSingle = ({ addType }) => {
    const { collectionsData } = useData();

    const [selectAddType, setSelectAddType] = useState('');
    const [checkCollectionName, setCheckCollectionName] = useState(false);
    const [errorName, setErrorName] = useState('');
    const [selectCollection, setSelectCollection] = useState('');
    const [newCollectionName, setNewCollectionName] = useState('');


    const handleCollection = (info) => {
        setSelectAddType(info);
        setSelectCollection('');
        setNewCollectionName('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSelectCollection(newCollectionName);
    };

    const collectionItem = collectionsData.map((item, index) =>
    (
        <section className="add_data__collection-item" key={index}>
            <span className="add_data__collection-item-name">{item.name}</span>
            <span className="add_data__collection-item-count">{item.count}/50</span>
            <button className="add_data__collection-item-select" disabled={item.count >= 50 ? true : false}
                onClick={() => setSelectCollection(item.name)}
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
    }, [selectCollection, selectAddType]);


    return (
        <section className="add_data">
            <section className="add_data__collections">

                <h3 className="add_data__collections-info">
                    Complete the collection or create a new one.
                </h3>

                <section className='add_data__collections-buttons'>
                    <button className='add_data__collections-button' onClick={() => { handleCollection('complete'); }}>Complete</button>
                    <button className='add_data__collections-button' onClick={() => { handleCollection('new'); }} >New collection</button>
                </section>

                {selectAddType === "new" && !selectCollection &&
                    < section className='add_data__collections-select'>
                        <label className='add_data__collections-select-warning'>{errorName}</label>
                        <form onSubmit={handleSubmit}>
                            <input
                                className='add_data__collections-select-text'
                                type='text'
                                placeholder='Enter name - min 4 char.'
                                value={newCollectionName}
                                onChange={(e) => { setNewCollectionName(e.target.value); }}
                            />
                            <button
                                className='add_data__collections-check'
                                type='submit'
                                disabled={!checkCollectionName}
                            >Select</button>
                        </form>
                    </section>}

                {selectAddType === "complete" && !selectCollection &&
                    <section className="add_data-collections-list">
                        {collectionItem}
                    </section>}

                {selectCollection && addType === "single" &&
                    <AddDataPhrase
                        nameCollection={selectCollection}
                        setNameCollection={setSelectCollection}
                    />}

                {selectCollection && addType === "file" &&
                    <AddDataFile
                        nameCollection={selectCollection}
                        setNameCollection={setSelectCollection}
                    />}

            </section>
        </section >
    );
};

export default AddDataSingle;
