import useData from './hooks/useData';
import './AnswersLearn.css';

const Answers = ({ phrase, handleDraw, blink }) => {
    const { errorMessage } = useData();
    return (
        <section className="answer" onClick={handleDraw}>
            {!errorMessage && <h1>{phrase.answer ? (blink ? phrase.answer : "") : "Answer - Click and Play"}</h1>}
            {errorMessage && <h1 style={{ color: "red" }}>{errorMessage}</h1>}
        </section>
    );
};

export default Answers;