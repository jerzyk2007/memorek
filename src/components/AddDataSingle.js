import { useState } from 'react';
import './AddDataSingle.css';

const AddDataSingle = () => {
    const [selectCollection, setSelectCollection] = useState('');
    const [collectionName, setCollectionName] = useState('');
    const [errorName, setErrorName] = useState('');

    const handleCollection = async (info) => {
        console.log(info);
        setSelectCollection(info);

        if (info === "complete") {

        }
    };
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
                        value={collectionName}
                        onChange={(e) => { setCollectionName(e.target.value); }}
                    />
                    <button className='add_data_single__collections-check'>Check</button>
                </section>}
            </section>
        </section >
    );
};

export default AddDataSingle;