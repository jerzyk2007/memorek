import { useState, useEffect } from 'react';
import { read, utils } from "xlsx";
import './AddDataFile.css';

const AddDataFile = ({ selectCollection, setSelectCollection, name }) => {
    const [phrases, setPhrases] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [checkAdd, setCheckAdd] = useState(false);
    const [collectionsName, setCollections] = useState(selectCollection.name);
    const [createCollections, setCreateCollections] = useState(false);

    const handleCancel = () => {
        console.log(phrases.length);
        setSelectCollection({
            name: '',
            count: null
        });
    };
    const handleAddFewer = () => {
        const newPhrases = phrases.slice(0, 50 - selectCollection.count);
        setPhrases(newPhrases);
        setCheckAdd(true);
    };

    const handleCreateCollections = () => {
        setCreateCollections(true);
        console.log(selectCollection.name);
        console.log(name);
    };

    const handleAddPhrase = () => {
        console.log(phrases);
        console.log(collectionsName);
    };

    const handleReadExcelFile = async (e) => {
        setErrorMessage('');
        const file = e.target.files[0];

        if (!file.name.endsWith('.xlsx')) {
            setErrorMessage('The accepted files are only Excel files in the .xlsx format.');
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            const arrayBuffer = event.target.result;
            const data = new Uint8Array(arrayBuffer);
            if (!isExcelFile(data)) {
                setErrorMessage('Invalid content in the Excel file.');
                return;
            }

            const workBook = read(arrayBuffer, { type: "array" });
            const workSheetName = workBook.SheetNames[0];
            const workSheet = workBook.Sheets[workSheetName];

            const excelData = utils.sheet_to_json(workSheet, { header: 1 }).map(row => {
                return {
                    question: row[0],
                    answer: row[1]
                };
            });

            setPhrases(excelData);
        };

        reader.readAsArrayBuffer(file);
    };

    function isExcelFile(data) {
        const excelSignature = [0x50, 0x4B, 0x03, 0x04];
        for (let i = 0; i < excelSignature.length; i++) {
            if (data[i] !== excelSignature[i]) {
                return false;
            }
        }
        return true;
    }

    useEffect(() => {
        if (50 - selectCollection.count < phrases.length || phrases.length === 0) {
            setCheckAdd(false);
        } else {
            setCheckAdd(true);
        }
    }, [phrases]);

    return (
        <section className="add_data_file">
            <section className="add_data_file-file">
                <input type="file" name="uploadfile" id="xlsx" style={{ display: "none" }} onChange={handleReadExcelFile} />
                <label htmlFor="xlsx" className="add_data_file-click-me">Click me to upload xlsx file</label>
                {errorMessage.length === 0 ?
                    <>
                        <p className="add_data_file-info">Collection
                            <span style={{ fontWeight: "bold" }}> {selectCollection.name} </span>
                            has
                            <span style={{ fontWeight: "bold" }}> {50 - selectCollection.count} </span>
                            available
                            {50 - selectCollection.count > 1 ? <span> slots.</span> : <span> slot.</span>}
                        </p>

                        <p className="add_data_file-info">Uploading phrases: <span style={{ fontWeight: "bold" }}>{phrases.length}</span></p>
                    </>
                    : <p className="add_data_file-error">{errorMessage}</p>
                }
                <section className="add_data_file-result">
                    {50 - selectCollection.count < phrases.length && !errorMessage && !createCollections &&
                        <>
                            < section className="add_data_file__options">
                                <p className='add_data_file-result-warning'>Only <span style={{ color: "red" }}>{50 - selectCollection.count}</span> <span >{50 - selectCollection.count > 1 ? "phrases" : "phrase"}</span> will be created in the <span style={{ color: "red" }}>{selectCollection.name}</span> collection.</p>
                                <section className="add_data_file__options-buttons">
                                    <button className="add_data_file__options-buttons--ok" onClick={handleAddFewer}>OK, I want only {50 - selectCollection.count}.</button>
                                    <button className="add_data_file__options-buttons--create" onClick={handleCreateCollections}>Create additional collections.</button>
                                </section>
                            </section>
                        </>}
                    <section className='add_data_file__buttons'>
                        <button className="add_data_file__buttons--cancel" onClick={handleCancel}>Cancel</button>
                        <button className="add_data_file__buttons--add" disabled={!checkAdd} onClick={handleAddPhrase}>Add</button>
                    </section>
                </section>
            </section>

        </section >
    );
};

export default AddDataFile;