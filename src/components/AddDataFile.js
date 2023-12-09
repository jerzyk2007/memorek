import { useState } from 'react';
import { read, utils, writeFileXLSX } from "xlsx";
import './AddDataFile.css';

const AddDataFile = () => {
    const [phrase, setPhrase] = useState([]);
    const [phraseCount, setPhraseCount] = useState(0);


    const handleReadExcelFile = async (e) => {
        const file = e.target.files[0];

        // Sprawdzenie rozszerzenia pliku
        if (!file.name.endsWith('.xlsx')) {
            console.error('Akceptowane są tylko pliki Excel w formacie .xlsx');
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            const arrayBuffer = event.target.result;
            const data = new Uint8Array(arrayBuffer);
            if (!isExcelFile(data)) {
                console.error('Nieprawidłowa zawartość pliku Excel.');
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

            setPhraseCount(excelData.length);
            setPhrase(excelData);
            console.log(excelData);
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

    return (
        <section className="add_data_file">
            <h3 className="add_data_file-title">Complete the collection or create a new one.</h3>
            <section className="add_data_file-file">
                <input type="file" name="uploadfile" id="xlsx" style={{ display: "none" }} onChange={handleReadExcelFile} />
                <label htmlFor="xlsx" className="add_data_file-click-me">Click me to upload xlsx or xls</label>
                <p>Uploading phrases: {phraseCount}</p>
            </section>
            <section className="add_data_file-upload">

            </section>
        </section>
    );
};

export default AddDataFile;