import './AnswersTest.css';

const AnswersTest = ({ answers, handleAnswers }) => {

    const answerItem = answers?.map((answer, index) => (
        <span className='answers_test-item' onClick={() => handleAnswers(index)} key={index}>{answer}</span>
    ));

    return (
        <div className='answers_test' >
            {answerItem}
        </div>
    );
};

export default AnswersTest;