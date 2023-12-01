import { useState } from "react";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import './AddDataPhrase.css';

const AddDataPhrase = ({ collectionName, setCollectionName }) => {
    const axiosPrivate = useAxiosPrivate();

    const [newPhrase, setNewPhrase] = useState(
        {
            question: '',
            answer: ''
        }
    );

    const handleCancel = () => {
        console.log('cancel');
        setCollectionName('');
    };

    const handleAdd = async () => {
        try {

            const response = await axiosPrivate.post('/add-data/single',
                JSON.stringify({ collectionName, newPhrase }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            console.log(response.data);
        }
        catch (err) {
            console.error(err);
        }

    };
    return (
        <section className="add_data_phrase">
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
                <button className='add_data_phrase__buttons--add' disabled={!newPhrase.question || !newPhrase.answer ? true : false} onClick={handleAdd}>Add</button>
            </section>
        </section>
    );
};

export default AddDataPhrase;