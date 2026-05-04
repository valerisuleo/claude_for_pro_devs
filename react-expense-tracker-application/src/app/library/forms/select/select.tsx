import ErrorsComponent from '../errors/errors-component';
import { IFormCtrl } from '../hooks/interfaces';
import styles from '../errors/errors-component.module.scss';
import startCase from 'lodash/startCase';

const SelectComponent = ({
    options,
    textProp,
    valueProp,
    onChange,
    onBlur,
    label,
    name,
    type,
    value,
    error,
    isDark,
}: IFormCtrl) => {
    return (
        <div className={`${isDark && 'bg-dark text-white'} mb-3`}>
            <label htmlFor={name} className="form-label">
                {startCase(label)}
            </label>

            <select
                className={`form-select ${isDark && 'bg-dark text-white'}  ${
                    error ? styles.error : ''
                }`}
                id={name}
                onChange={onChange}
                onBlur={onBlur}
                value={value || ''}
                name={name}
                data-type={type}
            >
                {options?.map((item) => (
                    <option key={item[valueProp]} value={item[valueProp]}>
                        {startCase(item[textProp])}
                    </option>
                ))}
            </select>
            {error && <ErrorsComponent error={error} />}
        </div>
    );
};

export default SelectComponent;
