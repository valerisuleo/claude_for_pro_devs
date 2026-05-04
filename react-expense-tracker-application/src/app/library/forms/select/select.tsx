/* eslint-disable @typescript-eslint/no-explicit-any */
import ErrorsComponent from '../errors/errors-component';
import { IFormCtrl } from '../hooks/interfaces';
import startCase from 'lodash/startCase';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

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
        <div>
            <label htmlFor={name}>{startCase(label)}</label>
            <Select
                value={value || ''}
                onValueChange={(val) =>
                    onChange?.({
                        target: { value: val, name, type },
                    } as any)
                }
                name={name}
            >
                <SelectTrigger
                    id={name}
                    onBlur={() =>
                        onBlur?.({
                            target: { name, value: value || '', type },
                        } as any)
                    }
                    data-type={type}
                    aria-invalid={Boolean(error)}
                    className="w-full max-w-48"
                >
                    <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel></SelectLabel>
                        {options?.map((item) => (
                            <SelectItem
                                key={item[valueProp]}
                                value={item[valueProp]}
                            >
                                {startCase(item[textProp])}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            {error ? <ErrorsComponent error={error} /> : null}
        </div>
    );
};

export default SelectComponent;
