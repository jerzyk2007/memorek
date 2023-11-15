import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useData from './hooks/useData';
import Questions from './QuestionsLearn';
import Answers from './AnswersLearn';
import './Learn.css';


const Learn = () => {
    const { phrases } = useData();
    const [phrase, setPhrase] = useState('');
    const [blink, setBlink] = useState(true);
    const navigate = useNavigate();

    const handleDraw = () => {
        if (phrases.length) {
            setBlink(prev => !prev);
            if (blink) {
                const draw = Math.floor(Math.random() * phrases.length);
                setPhrase(phrases[draw]);
            }
        }
    };

    useEffect(() => {
        if (phrases.length === 0) {
            navigate('/memorek/collections');
        }
    }, [phrases, navigate]);

    return (
        <div className='learn'>
            <Questions phrase={phrase} handleDraw={handleDraw} />
            <Answers phrase={phrase} handleDraw={handleDraw} blink={blink} />
        </div>
    );
};

export default Learn;