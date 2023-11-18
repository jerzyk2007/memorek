import { useEffect, useState } from "react";
import './TestResult.css';

const TestResult = ({ itemTest }) => {
    const [result, setResult] = useState(0);

    const showAnswers = itemTest.map((item, index) => item.correct === item.selected ? <section key={index} className="test_result__container">
        <p className="test_result-question">{item.question}</p>
        <p className="test_result-answer--correct">{item.answers[item.correct]}</p>
    </section> :
        <section key={index} className="test_result__container">
            <p className="test_result-question">{item.question}</p>
            <p className="test_result-answer--correct">{item.answers[item.correct]}</p>
            <p className="test_result-answer">{item.answers[item.selected]}</p>
        </section>
    );

    useEffect(() => {
        const newResult = itemTest.reduce((acc, item) => {
            if (item.correct === item.selected) {
                return acc + 1;
            }
            return acc;
        }, 0);
        setResult(newResult);
    }, [itemTest]);

    return (
        <div className="test_result">
            <h2 className="test_result-title">Twój wynik {result}/{itemTest.length}</h2>
            <section className="test_result-answers">
                {showAnswers}

            </section>
        </div>
    );
};

export default TestResult;