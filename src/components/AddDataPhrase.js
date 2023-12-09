import { useState } from "react";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import useData from './hooks/useData';
import './AddDataPhrase.css';

const AddDataPhrase = ({ selectCollection, setSelectCollection }) => {
    const axiosPrivate = useAxiosPrivate();
    const { fetchCollectionsData } = useData();

    const [newPhrase, setNewPhrase] = useState(
        {
            question: '',
            answer: ''
        }
    );
    const [errorMessage, setErrorMessage] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const handleCancel = () => {
        setSelectCollection({
            name: '',
            count: null
        });
    };

    const handleAdd = async () => {
        if (isAdding) {
            return;
        }
        try {
            setIsAdding(true);
            await axiosPrivate.post('/add-data/single',
                JSON.stringify({ collection: selectCollection.name, newPhrase }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            setSelectCollection({
                name: '',
                count: null
            });
            await fetchCollectionsData();
        }
        catch (err) {
            if (err?.response?.status === 507) {
                setErrorMessage(err.response.data.message);
            } else {
                console.error(err);
            }

        }
        finally {
            setIsAdding(false);
        }
    };

    return (
        <section className="add_data_phrase">
            {errorMessage && <label className="add_data_phrase-error">{errorMessage}</label>}
            <section className="add_data_phrase__question">
                <p className="add_data_phrase-title--question">Question:</p>
                <textarea className='add_data_phrase-add--question'
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
            </section>
            <div className="add_data_phrase-line"></div>
            <section className="add_data_phrase__answer">
                <p className="add_data_phrase-title--answer">Answer:</p>
                <textarea className='add_data_phrase-add--answer'
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
            </section>
            <section className="add_data_phrase__buttons">
                <button className='add_data_phrase__buttons--cancel' onClick={handleCancel}>Cancel</button>
                <button className='add_data_phrase__buttons--add' disabled={errorMessage || !newPhrase.question || !newPhrase.answer ? true : false} onClick={handleAdd}>Add</button>
            </section>
        </section>
    );
};

export default AddDataPhrase;