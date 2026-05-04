import startCase from 'lodash/startCase';

import { Input } from '@/components/ui/input';

import ErrorsComponent from '../errors/errors-component';
import { IFormCtrl } from '../hooks/interfaces';

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
        <div>
            <label htmlFor={name}>{startCase(label)}</label>
            <Input
                id={name}
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                aria-invalid={Boolean(error)}
            />
            {error ? <ErrorsComponent error={error} /> : null}
        </div>
    );
};

export default InputGroup;
