import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useData from './hooks/useData';
import PleaseWait from './PleaseWait';
import './CollectionName.css';

const CollectionName = ({ name, count }) => {
    const { fetchPhrases, setLearnOrTest, fetchTestPhrases } = useData();
    const [isLoading, setIseLoading] = useState(false);
    const navigate = useNavigate();

    const handleLearn = async () => {
        try {
            await fetchPhrases(name);
            setLearnOrTest('learn');
            navigate('/learn');
        } catch (err) {
            console.log(err);
        }
    };

    const handleTest = async () => {
        try {
            setIseLoading(true);
            await fetchTestPhrases(name);
            setLearnOrTest('test');
            navigate('/test');
        }
        catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <section className="collection_name">
                <p className='collection_name-title'>{name}</p>
                <span className='collection_name-counter'>{count}/50</span>
                <button className='collection_name-button' onClick={handleLearn}>Learn</button>
                <button className='collection_name-button collection_name-button--test' onClick={handleTest} disabled={count < 4 ? true : false} style={count < 4 ? { background: "#fff" } : null}>Test</button>
                {isLoading && <PleaseWait />}
            </section >
        </>
    );
};

export default CollectionName;;