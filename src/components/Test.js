import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useData from './hooks/useData';
import QuestionsTest from './QuestionsTest';
import AnswersTest from './AnswersTest';
import TestResult from './TestResult';
import './Test.css';

const Test = () => {
    const { test } = useData();
    const [itemTest] = useState(test);
    const [counter, setCounter] = useState(0);
    const [result, setResult] = useState(false);
    const navigate = useNavigate();

    const testResult = () => {
        setResult(true);
    };

    const handleAnswers = async (id) => {
        try {
            itemTest[counter].selected = id;
            setCounter(prev => prev + 1);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (test.length === 0) {
            navigate('/memorek/collections');
        }
    }, [test, navigate]);

    useEffect(() => {
        if (counter !== 0 && counter === test.length) {
            testResult();
        }
    }, [counter, itemTest, test]);

    return (
        <div className='test'>
            {!result && <>
                {itemTest.length > 0 && <h2 className='test-title'>Question  {counter < itemTest.length ? (counter + 1) : itemTest.length}/{itemTest.length}</h2>}
                <QuestionsTest question={itemTest[counter]?.question} />
                <AnswersTest answers={itemTest[counter]?.answers} setCounter={setCounter} counter={counter} handleAnswers={handleAnswers} />
            </>}
            {result && <TestResult itemTest={itemTest} />}
        </div>
    );
};

export default Test;
