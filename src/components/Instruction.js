import { SlControlPlay, SlUser, SlBookOpen, SlList, SlGraduation, SlShuffle, SlMagnifier, SlShareAlt, SlActionUndo, SlActionRedo, SlSettings } from "react-icons/sl";
import useData from "./hooks/useData";
import './Instruction.css';

const Instruction = () => {
    const { changeMenu, auth } = useData();

    return (
        <>
            {changeMenu ?
                <div className="instruction">
                    <h2 className="instruction-title">Instruction</h2>
                    <p className='instruction-text'>
                        Memorek is designed for vocabulary and phrase learning. Learning involves displaying a question in the upper window, with the answer hidden, clicking the lower window reveals the answer.
                    </p>
                    <section className='instruction__icon'>
                        <SlBookOpen className="instruction-button" />
                        <span className="instruction-info">Instruction.</span>
                    </section>
                    <section className='instruction__icon'>
                        <SlControlPlay className="instruction-button" />
                        <span className="instruction-info">Learning and knowledge assessment.</span>
                    </section>
                    <section className='instruction__icon'>
                        <SlGraduation className="instruction-button" />
                        <span className="instruction-info">Test your knowledge.</span>
                    </section>
                    <section className='instruction__icon'>
                        <SlList className="instruction-button" />
                        <span className="instruction-info">Select a vocabulary database.</span>
                    </section>
                    <section className='instruction__icon'>
                        <SlShuffle className="instruction-button" />
                        <span className="instruction-info">Language switch.</span>
                    </section>
                    <section className='instruction__icon'>
                        <SlUser className="instruction-button" />
                        <span className="instruction-info">Log in and add new phrases.</span>
                    </section>
                </div> :
                <div className="instruction">
                    <h2 className="instruction-title">Instruction</h2>
                    {!auth?.roles?.includes(200) ? <p className='instruction-text'>
                        As a logged-in user, you have the ability to add new data, make corrections, and delete. Please remember that the maximum collection capacity is 50 items.
                    </p>
                        : <p> As a Admin, you have the ability to add new data, make corrections, and delete. Please remember that the maximum collection capacity is 50 items.
                            You can also add new users.</p>}
                    <section className='instruction__icon'>
                        <SlBookOpen className="instruction-button" />
                        <span className="instruction-info">Instruction.</span>
                    </section>
                    <section className='instruction__icon'>
                        <SlMagnifier className="instruction-button" />
                        <span className="instruction-info">Find and make changes.</span>
                    </section>
                    <section className='instruction__icon'>
                        <SlShareAlt className="instruction-button" />
                        <span className="instruction-info">Load data from a file.</span>
                    </section>
                    {!auth?.roles?.includes(200) && <section className='instruction__icon'>
                        <SlSettings className="instruction-button" />
                        <span className="instruction-info">Log out, change password or edit user name.</span>
                    </section>}
                    {auth?.roles?.includes(200) && <section className='instruction__icon'>
                        <SlSettings className="instruction-button" />
                        <span className="instruction-info">Log out, change password, add new user or edit user name.</span>
                    </section>}
                    <section className='instruction__icon'>
                        <SlActionRedo className="instruction-button" />
                        <SlActionUndo className="instruction-button" />
                        <span className="instruction-info">Switch menu.</span>
                    </section>
                </div>}
        </>
    );
};

export default Instruction;