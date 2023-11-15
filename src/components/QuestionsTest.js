import './QuestionsTest.css';

const QuestionsTest = ({ question }) => {
    return (
        <div className='questions_test'>
            <h1 className='questions_test-title'>{question}</h1>
        </div>
    );
};

export default QuestionsTest;