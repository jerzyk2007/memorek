import { useState, useEffect } from 'react';
import useData from './hooks/useData';
import AddDataPhrase from './AddDataPhrase';
import AddDataFile from './AddDataFile';
import './AddData.css';

const AddDataSingle = ({ addType }) => {
    const { collectionsData, fetchCollectionsData } = useData();

    const [selectAddType, setSelectAddType] = useState('');
    const [checkCollectionName, setCheckCollectionName] = useState(false);
    const [errorName, setErrorName] = useState('');
    const [selectCollection, setSelectCollection] = useState({
        name: '',
        count: null,
    });
    const [newCollectionName, setNewCollectionName] = useState('');


    const handleCollection = (info) => {
        setSelectAddType(info);
        setSelectCollection({});
        setNewCollectionName('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSelectCollection({
            name: newCollectionName,
            count: 0,
        });
    };

    const collectionItem = collectionsData.map((item, index) =>
    (
        <section className="add_data__collection-item" key={index}>
            <span className="add_data__collection-item-name">{item.name}</span>
            <span className="add_data__collection-item-count">{item.count}/50</span>
            <button className="add_data__collection-item-select" disabled={item.count >= 50 ? true : false}
                onClick={() => setSelectCollection({
                    name: item.name,
                    count: item.count,
                })}
            >Select</button>
        </section>
    )
    );

    useEffect(() => {
        const check = collectionsData.map(item => item.name);
        if (newCollectionName.length >= 4 && !newCollectionName.endsWith(' ')) {
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
        fetchCollectionsData();
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

                {selectAddType === "new" && !selectCollection.name &&
                    < section className='add_data__collections-select'>
                        <label className='add_data__collections-select-warning'>{errorName}</label>
                        <form onSubmit={handleSubmit}>
                            <input
                                style={!checkCollectionName ? { color: "red" } : null}
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

                {selectAddType === "complete" && !selectCollection.name &&
                    <section className="add_data-collections-list">
                        {collectionItem}
                    </section>}

                {selectCollection.name && addType === "single" &&
                    <AddDataPhrase
                        selectCollection={selectCollection}
                        setSelectCollection={setSelectCollection}
                    />}

                {selectCollection.name && addType === "file" &&
                    <AddDataFile
                        selectCollection={selectCollection}
                        setSelectCollection={setSelectCollection}
                        name={collectionsData.map(colection => colection.name)}
                        fetchCollectionsData={fetchCollectionsData}
                    />}

            </section>
        </section >
    );
};

export default AddDataSingle;
