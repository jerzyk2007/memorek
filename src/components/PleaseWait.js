import { LuLoader } from "react-icons/lu";
import './PleaseWait.css';

const PleaseWait = () => {
    return (
        <section className="please-wait">
            <div className="please-wait__container">
                <p className='please-wait__container-text'>Please wait...</p>
                <LuLoader className='please-wait__container-icon' />
            </div>
        </section>
    );
};

export default PleaseWait;