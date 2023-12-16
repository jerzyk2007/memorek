import './AddedPhraseInformation.css';

const AddedPhraseInformation = ({ message, handleAddInformation }) => {
    return (
        <section className="added_phrase_information">
            <section className="added_phrase_information__container">
                <p className='added_phrase_information__container-text'>{message}</p>
                <button className='added_phrase_information__container-button' onClick={handleAddInformation}>OK</button>
            </section>
        </section>
    );
};

export default AddedPhraseInformation;