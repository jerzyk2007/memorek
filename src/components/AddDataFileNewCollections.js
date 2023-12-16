import './AddDataFileNewCollections.css';

const AddDataFileNewCollections = ({ index, name, count, newPhraseCollection, setNewPhraseCollection, allCollections }) => {
    // console.log(allCollections);
    // console.log(index);
    console.log(newPhraseCollection[index]);
    return (
        <section className="add_data_file_new_collections__options-name-count" >
            <input
                type="text"
                className="add_data_file_new_collections__options-name-count--name"
                value={name}
            />
            <span className="add_data_file_new_collections__options-name-count--count" >{count}</span>
        </section>
    );
};

export default AddDataFileNewCollections;