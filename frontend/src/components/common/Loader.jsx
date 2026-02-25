// Loader Component
import './Loader.css';

const Loader = ({ size = 'md', text = 'Loading...' }) => {
    return (
        <div className={`loader-container loader-${size}`}>
            <div className="loader-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            {text && <p className="loader-text">{text}</p>}
        </div>
    );
};

export default Loader;
