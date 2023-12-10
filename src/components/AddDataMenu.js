import { Link } from 'react-router-dom';
import './AddDataMenu.css';

const AddData = () => {

    // const information = `Możesz dodać pojedyńcza frazę lub słowo, możesz dodać do istniejącej kolekcji (max 50 elementów) lub założyc nową kolekcję. Słowo, fraza lub odpowiedź nie może mieć więcej niż 200 znaków. <br />
    // Możesz dodać dane z pliku excel. <br />
    // Dodane będą dane tylko z pierwszego arkusza. <br />
    // Jeśli wierszy w excelu będzie wiecej niż 50, zostaniesz zapytany, czy dodane ma być tylko pierwsze 50 wierszy czy mam być dodana automatycznie kolejna kolekcja (o tej samej nazwie, ale z nr 2 lub większym). <br />
    // Możesz również dodać dane z pliku do niepełnych kolekcji, program sprawdzi czy nie będzie duplikatów.
    // Schemat: komórka A1 - question, B1 - answer, A2 - 'your-question', B2 - 'your-answer' itd <br /> <strong>Sugerowana kolejność to question: język, którego się uczysz, answer: język, który znasz.<br /> Możesz wybrac własną kolejność, ale pamiętaj, zeby cała kolekcja była napisana takim schematem.</strong>`;

    return (
        <section className="add_data_menu">
            <h1 className="add_data_menu-title">Add data</h1>
            <section className="add_data_menu__info">
                <span className="add_data_menu__text">
                    You can add a single phrase or word; you can add it to an existing collection (max 50 elements) or create a new collection. A word, phrase, or answer cannot exceed 200 characters. <br />
                    You can add data from an Excel file. <br />
                    Only data from the first sheet will be added. <br />
                    If there are more than 50 rows in the Excel file, you will be asked whether only the first 50 rows should be added or if another collection should be added automatically (with the same name but with number 2 or greater). <br />
                    You can also add data from a file to incomplete collections; the program will check for duplicates.<br />
                    Format: cell A1 - question, cell B1 - answer, cell A2 - 'your-question', B2 - 'your-answer', A3 - 'your-question', B3 - 'your-answer', and so on. <br /> <strong>The suggested order is question: the language you are learning, answer: the language you know. <br /> You can choose your own order, but remember that the entire collection should be written in this format.</strong>
                </span>
                <section className="add_data_menu__buttons">
                    <Link to="/add-data/single" className="add_data_menu-button-link" >
                        <button className="add_data_menu-button">Single</button>
                    </Link>
                    <Link to="/add-data/file" className="add_data_menu-button-link" >
                        <button className="add_data_menu-button">From file</button>
                    </Link>
                </section>
            </section>
        </section>
    );
};

export default AddData;