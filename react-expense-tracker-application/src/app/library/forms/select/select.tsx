import type { ChangeEvent } from 'react';
import startCase from 'lodash/startCase';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

import ErrorsComponent from '../errors/errors-component';
import { IFormCtrl } from '../hooks/interfaces';
import styles from '../errors/errors-component.module.scss';

/** Radix Select.Item cannot use ""; map empty option values to this sentinel. */
const RADIX_EMPTY = '__empty__';

function toRadixValue(raw: string | undefined): string {
    return raw === undefined || raw === '' ? RADIX_EMPTY : raw;
}

function fromRadixValue(v: string): string {
    return v === RADIX_EMPTY ? '' : v;
}

function optionToRadixValue(
    item: Record<string, string>,
    valueProp: string
): string {
    const raw = item[valueProp];
    return raw === undefined || raw === '' ? RADIX_EMPTY : String(raw);
}

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
    const vp = valueProp ?? 'value';
    const tp = textProp ?? 'label';

    const handleValueChange = (v: string) => {
        const synthetic = {
            target: {
                name,
                value: fromRadixValue(v),
                type: 'select-one',
            },
        } as ChangeEvent<HTMLSelectElement>;
        onChange(synthetic);
    };

    return (
        <div
            className={cn(
                'mb-3',
                isDark && 'rounded-md bg-zinc-900 p-3 text-white',
            )}
        >
            <label
                htmlFor={name}
                className={cn(
                    'mb-1.5 block text-sm font-medium text-foreground',
                    isDark && 'text-white',
                )}
            >
                {startCase(label)}
            </label>

            <Select
                value={toRadixValue(value)}
                onValueChange={handleValueChange}
                data-type={type}
            >
                <SelectTrigger
                    id={name}
                    aria-invalid={Boolean(error)}
                    onBlur={onBlur}
                    className={cn(
                        'w-full min-w-0 justify-between',
                        error && styles.error,
                        isDark && 'border-zinc-600 bg-zinc-900 text-white',
                    )}
                >
                    <SelectValue placeholder={startCase(label)} />
                </SelectTrigger>
                <SelectContent
                    position="popper"
                    className="w-[var(--radix-select-trigger-width)]"
                >
                    {options?.map((item, index) => {
                        const record = item as unknown as Record<
                            string,
                            string
                        >;
                        const itemValue = optionToRadixValue(record, vp);
                        return (
                            <SelectItem
                                key={`${itemValue}-${index}`}
                                value={itemValue}
                            >
                                {startCase(record[tp])}
                            </SelectItem>
                        );
                    })}
                </SelectContent>
            </Select>
            {error && <ErrorsComponent error={error} />}
        </div>
    );
};

export default SelectComponent;
