import startCase from 'lodash/startCase';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import ErrorsComponent from '../errors/errors-component';
import { IFormCtrl } from '../hooks/interfaces';
import styles from '../errors/errors-component.module.scss';

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
            <label
                htmlFor={name}
                className="mb-1.5 block text-sm font-medium text-foreground"
            >
                {startCase(label)}
            </label>
            <Input
                id={name}
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                aria-invalid={Boolean(error)}
                className={cn(error && styles.error)}
            />
            {error && <ErrorsComponent error={error} />}
        </div>
    );
};

export default InputGroup;
