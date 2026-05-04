import { IBtn } from './interfaces';

const Button = ({ label, type, classes, onEmitEvent, className, isDarkMode }: IBtn) => {
    const getClasses = () => {
        let result = `btn btn-${classes.size} `;
        result += !isDarkMode ? `btn-${classes.contextual}` : `btn-${className}`;

        return result;
    };

    return (
        <button onClick={() => onEmitEvent()} type={type} className={getClasses()}>
            {label}
        </button>
    );
};

export default Button;
