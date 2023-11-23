import { useState, useRef, useEffect } from "react";
import './SearchItem.css';

const SearchItem = ({ phrase }) => {
    const [editActive, setEditActive] = useState(false);
    const [editQuestion, setEditQuestion] = useState(phrase);
    const [rowsTextArea, setRowsText] = useState(
        {
            rowsQuestion: 1,
            rowsAnswer: 1
        }
    );
    const spanQuestionRef = useRef(null);
    const spanAnswerRef = useRef(null);

    const handleEdit = () => {
        setEditActive(true);
        console.log(editQuestion);
    };

    useEffect(() => {
        if (spanQuestionRef.current && spanAnswerRef.current) {
            const spanQuestionHeight = spanQuestionRef.current.getBoundingClientRect().height;
            const spanAnswerHeight = spanAnswerRef.current.getBoundingClientRect().height;
            const fontSizeQuestion = parseInt(window.getComputedStyle(spanQuestionRef.current).fontSize, 10);
            const fontSizeAnswer = parseInt(window.getComputedStyle(spanAnswerRef.current).fontSize, 10);
            const rowsQuestion = Math.floor(spanQuestionHeight / fontSizeQuestion);
            const rowsAnswer = Math.floor(spanAnswerHeight / fontSizeAnswer);
            setRowsText({ rowsQuestion, rowsAnswer });
        }
    }, [editQuestion]);




    return (
        <section className="search_item__container" >
            <p className="search_item-phrase">
                <span className="search_item-question">Question:</span>
                {!editActive && <span className="search_item-question-item"
                    ref={spanQuestionRef}
                >{phrase.question}</span>}
                {editActive &&
                    <textarea
                        className="search_item-answer-edit"
                        value={editQuestion.question}
                        onChange={(e) => setEditQuestion(prev => ({
                            ...prev,
                            question: e.target.value
                        }))}
                        rows={rowsTextArea.rowsQuestion}
                    />
                }
            </p>
            <div className="search_item-line"></div>
            <p className="search_item-phrase">
                <span className="search_item-answer">Answer:</span>
                {!editActive &&
                    <span className="search_item-answer-item"
                        ref={spanAnswerRef}
                    // ref={textareaRef}

                    >{phrase.answer}</span>
                }
                {editActive &&
                    <textarea
                        className="search_item-answer-edit"
                        value={editQuestion.answer}
                        onChange={(e) => setEditQuestion(prev => ({
                            ...prev,
                            answer: e.target.value
                        }))}
                        rows={rowsTextArea.rowsAnswer}
                    />
                }
            </p>
            <section className="search_item-button__container">
                <button className="search_item-button" onClick={handleEdit}>Edit</button>
                <button className="search_item-button">Delete</button>
            </section>

        </section>
    );
};

export default SearchItem;