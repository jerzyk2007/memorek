import useData from './hooks/useData';
import './QuestionsLearn.css';

const Questions = ({ phrase }) => {
    const { errorMessage } = useData();
    return (
        <section className="questions">
            {!errorMessage && <h1>{phrase.question ? phrase.question : "Question"}</h1>}
        </section>
    );
};

export default Questions;