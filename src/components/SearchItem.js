import { useState, useRef, useEffect } from "react";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
// import { useParams } from 'react-router-dom';
import { LuLoader } from "react-icons/lu";
import './SearchItem.css';

const SearchItem = ({ phrase, editPhrase, setEditPhrase, findPhrases, setFindPhrases, updatePhrase }) => {
    const [editActive, setEditActive] = useState(false);
    const [deleteActive, setDeleteActive] = useState(false);
    const [changePhrase, setChangePhrase] = useState(phrase);
    const [rowsTextArea, setRowsText] = useState(
        {
            rowsQuestion: 1,
            rowsAnswer: 1
        }
    );
    const [confirmChange, setConfirmChange] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const spanQuestionRef = useRef(null);
    const spanAnswerRef = useRef(null);
    const axiosPrivate = useAxiosPrivate();
    // const { id } = useParams();

    const handleButton = (info) => {
        if (!editPhrase && info === 'edit') {
            setEditActive(true);
        } else if (!editPhrase && info === 'delete') {
            setDeleteActive(true);
        }
        setEditPhrase(true);
    };

    const handleCancel = (info) => {
        if (info === 'edit') {
            setEditActive(false);
        } else if (info === 'delete') {
            setDeleteActive(false);
        }
        setEditPhrase(false);
    };

    const handleChange = async (id) => {
        try {
            setIsLoading(true);
            const response = await axiosPrivate.patch(`/search/change`,
                JSON.stringify({
                    id: changePhrase._id,
                    question: changePhrase.question,
                    answer: changePhrase.answer,
                    collection: changePhrase.collection

                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            setEditActive(false);
            setEditPhrase(false);
            setIsLoading(false);
            updatePhrase(changePhrase);
        }
        catch (err) {
            console.log(err);
        }
    };

    const handleDelete = () => {
        console.log('delete');
        setDeleteActive(false);
        setEditPhrase(false);
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
    }, [changePhrase]);

    useEffect(() => {
        if (phrase.question !== changePhrase.question || phrase.answer !== changePhrase.answer) {
            setConfirmChange(true);
        } else {
            setConfirmChange(false);
        }

    }, [changePhrase, updatePhrase]);

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
                        value={changePhrase.question}
                        onChange={(e) => setChangePhrase(prev => ({
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

                    >{phrase.answer}</span>
                }
                {editActive &&
                    <textarea
                        className="search_item-answer-edit"
                        value={changePhrase.answer}
                        onChange={(e) => setChangePhrase(prev => ({
                            ...prev,
                            answer: e.target.value
                        }))}
                        rows={rowsTextArea.rowsAnswer}
                    />
                }
            </p>
            {!editActive && !deleteActive &&
                <section className="search_item-button__container">
                    <button
                        className="search_item-button search_item-button--edit"
                        onClick={() => handleButton('edit')}
                    >Edit</button>
                    <button
                        className="search_item-button search_item-button--delete"
                        onClick={() => handleButton('delete')}
                    >Delete</button>
                </section>}
            {editActive && <section className="search_item-button__container">
                <button
                    className="search_item-button search_item-button--cancel"
                    onClick={() => handleCancel('edit')}
                >Cancel</button>
                <button
                    className="search_item-button search_item-button--change"
                    onClick={() => handleChange(changePhrase._id)}
                    disabled={!confirmChange}
                    style={!confirmChange ? { backgroundColor: "white" } : {}}
                >Change</button>
            </section>}
            {deleteActive && <section className="search_item-button__container">
                <button
                    className="search_item-button search_item-button--cancel"
                    onClick={() => handleCancel('delete')}
                >Cancel</button>
                <button className="search_item-button search_item-button--delete"
                    onClick={handleDelete}
                >Confirm Delete</button>
            </section>}
        </section>
    );
};

export default SearchItem;