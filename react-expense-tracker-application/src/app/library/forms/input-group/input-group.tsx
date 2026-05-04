import ErrorsComponent from '../errors/errors-component';
import { IFormCtrl } from '../hooks/interfaces';
import styles from '../errors/errors-component.module.scss';
import startCase from 'lodash/startCase';

const InputGroup = ({
    label,
    value,
    onChange,
    onBlur,
    name,
    type,
    placeholder,
    error,
}: IFormCtrl) => {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">
                {startCase(label)}
            </label>
            <input
                className={`form-control ${error ? styles.error : ''}`}
                name={name}
                type={type}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                id={name} // for testing purposes
                placeholder={placeholder}
            />
            {error && <ErrorsComponent error={error} />}
        </div>
    );
};

export default InputGroup;
