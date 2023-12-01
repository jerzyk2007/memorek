import { useState, useEffect } from 'react';
import api from './api/axios';
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import AddDataPhrase from './AddDataPhrase';
import './AddDataSingle.css';

const AddDataSingle = () => {
    const axiosPrivate = useAxiosPrivate();

    const [selectCollection, setSelectCollection] = useState('');
    const [newCollectionName, setNewCollectionName] = useState('');
    const [checkCollectionName, setCheckCollectionName] = useState(false);
    const [errorName, setErrorName] = useState('');
    const [allCollections, setAllCollections] = useState([]);
    const [collectionName, setCollectionName] = useState('');

    const handleCollection = async (info) => {
        setSelectCollection(info);
        setCollectionName('');
    };



    const handleSelect = (name) => {
        setCollectionName(name);
    };



    const collectionItem = allCollections.map((item, index) =>
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

    useEffect(() => {
        const check = allCollections.map(item => item.name);
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
        const getCollections = async () => {
            try {
                const response = await api.get('/collections');
                setAllCollections(response.data);
            }
            catch (err) {
                console.error(err);
            }
        };
        getCollections();
    }, []);


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
                {selectCollection === "new" && !collectionName && < section className='add_data_single__collections-select'>
                    <label className='add_data_single__collections-select-warning'>{errorName}</label>
                    <input
                        className='add_data_single__collections-select-text'
                        type='text'
                        placeholder='Enter name - min 4 char.'
                        value={newCollectionName}
                        onChange={(e) => { setNewCollectionName(e.target.value); }}
                    />
                    <button className='add_data_single__collections-check' onClick={() => { handleSelect(newCollectionName); }}
                        disabled={!checkCollectionName}
                    >Select</button>
                </section>}
                {selectCollection === "complete" && !collectionName && <section className="add_data_single-collections-list">
                    {collectionItem}
                </section>}

                {collectionName &&
                    <AddDataPhrase
                        collectionName={collectionName}
                        setCollectionName={setCollectionName}
                    />}
            </section>
        </section >
    );
};

export default AddDataSingle;
// import { useState, useEffect } from 'react';
// import api from './api/axios';
// import useAxiosPrivate from "./hooks/useAxiosPrivate";
// import AddDataPhrase from './AddDataPhrase';
// import './AddDataSingle.css';

// const AddDataSingle = () => {
//     const axiosPrivate = useAxiosPrivate();

//     const [selectCollection, setSelectCollection] = useState('');
//     const [newCollectionName, setNewCollectionName] = useState('');
//     const [checkCollectionName, setCheckCollectionName] = useState(false);
//     const [errorName, setErrorName] = useState('');
//     const [allCollections, setAllCollections] = useState([]);
//     const [collectionName, setCollectionName] = useState('');
//     const [newPhrase, setNewPhrase] = useState(
//         {
//             question: '',
//             answer: ''
//         }
//     );


//     const handleCollection = async (info) => {
//         setSelectCollection(info);
//         setCollectionName('');
//     };

//     const handleCancel = () => {
//         setCollectionName('');
//         setNewCollectionName('');
//         setNewPhrase({
//             question: '',
//             answer: ''
//         });
//     };

//     const handleSelect = (name) => {
//         setCollectionName(name);
//     };

//     const handleAdd = async () => {
//         try {

//             const response = await axiosPrivate.post('/add-data/single',
//                 JSON.stringify({ collectionName, newPhrase }),
//                 {
//                     headers: { 'Content-Type': 'application/json' },
//                     withCredentials: true,
//                 }
//             );
//             console.log(response.data);
//             console.log(collectionName);
//             setNewPhrase({
//                 question: '',
//                 answer: ''
//             });
//         }
//         catch (err) {
//             console.error(err);
//         }

//     };

//     const collectionItem = allCollections.map((item, index) =>
//     (
//         <section className="add_data_single__collection-item" key={index}>
//             <span className="add_data_single__collection-item-name">{item.name}</span>
//             <span className="add_data_single__collection-item-count">- {item.count}/50</span>
//             <button className="add_data_single__collection-item-select" disabled={item.count >= 50 ? true : false}
//                 onClick={() => handleSelect(item.name)}
//             >Select</button>
//         </section>
//     )
//     );

//     useEffect(() => {
//         const check = allCollections.map(item => item.name);
//         if (newCollectionName.length >= 4) {
//             if (check.some(item => item.toLowerCase() === newCollectionName.toLowerCase())) {
//                 setErrorName("The name is occupied.");
//                 setCheckCollectionName(false);

//             } else {
//                 setCheckCollectionName(true);
//                 setErrorName("");
//             }
//         } else {
//             setCheckCollectionName(false);
//         }
//     }, [newCollectionName]);

//     useEffect(() => {
//         const getCollections = async () => {
//             try {
//                 const response = await api.get('/collections');
//                 setAllCollections(response.data);
//             }
//             catch (err) {
//                 console.error(err);
//             }
//         };
//         getCollections();
//     }, []);


//     return (
//         <section className="add_data_single">
//             <section className="add_data_single__collections">
//                 <h3 className="add_data_single__collections-info">
//                     Complete the collection or create a new one.
//                 </h3>
//                 <section className='add_data_single__collections-buttons'>
//                     <button className='add_data_single__collections-button' onClick={() => { handleCollection('complete'); }}>Complete</button>
//                     <button className='add_data_single__collections-button' onClick={() => { handleCollection('new'); }} >New collection</button>
//                 </section>
//                 {selectCollection === "new" && !collectionName && < section className='add_data_single__collections-select'>
//                     <label className='add_data_single__collections-select-warning'>{errorName}</label>
//                     <input
//                         className='add_data_single__collections-select-text'
//                         type='text'
//                         placeholder='Enter name - min 4 char.'
//                         value={newCollectionName}
//                         onChange={(e) => { setNewCollectionName(e.target.value); }}
//                     />
//                     <button className='add_data_single__collections-check' onClick={() => { handleSelect(newCollectionName); }}
//                         disabled={!checkCollectionName}
//                     >Select</button>
//                 </section>}
//                 {selectCollection === "complete" && !collectionName && <section className="add_data_single-collections-list">
//                     {collectionItem}
//                 </section>}

//                 {collectionName && <AddDataPhrase />
//                     // <section className="add_data_single__container">
//                     //     <div className="add_data_single__container-question">
//                     //         <p className="add_data_single__container-title--question">Question:</p>
//                     //         <textarea className='add_data_single__container-add--question'
//                     //             maxLength='150'
//                     //             rows='6'
//                     //             placeholder='Max 150 characters.'
//                     //             value={newPhrase.question}
//                     //             onChange={(e) => {
//                     //                 setNewPhrase(prev => ({
//                     //                     ...prev,
//                     //                     question: e.target.value
//                     //                 }));
//                     //             }}
//                     //         ></textarea>
//                     //     </div>
//                     //     <div className="add_data_single__container-line"></div>
//                     //     <div className="add_data_single__container-answer">
//                     //         <p className="add_data_single__container-title--answer">Answer:</p>
//                     //         <textarea className='add_data_single__container-add--answer'
//                     //             maxLength='150'
//                     //             rows='6'
//                     //             placeholder='Max 150 characters.'
//                     //             value={newPhrase.answer}
//                     //             onChange={(e) => {
//                     //                 setNewPhrase(prev => ({
//                     //                     ...prev,
//                     //                     answer: e.target.value
//                     //                 }));
//                     //             }}
//                     //         ></textarea>
//                     //     </div>
//                     //     <div className="add_data_single__container-buttons">
//                     //         <button className='add_data_single__container-buttons--cancel' onClick={handleCancel}>Cancel</button>
//                     //         <button className='add_data_single__container-buttons--add' disabled={!newPhrase.question || !newPhrase.answer ? true : false} onClick={handleAdd}>Add</button>
//                     //     </div>
//                     // </section>
//                 }
//             </section>
//         </section >
//     );
// };

// export default AddDataSingle;