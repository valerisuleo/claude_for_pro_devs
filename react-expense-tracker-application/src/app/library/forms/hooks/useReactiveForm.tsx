/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import InputGroup from '../input-group/input-group';
import SelectComponent from '../select/select';
import { processErrorMessages } from './utils';
import { ZodError, ZodSchema } from 'zod';
import { FormSchema, Controller, ReactiveFormConfig, ErrorMessages } from './interfaces';

export function useReactiveForm(
    schema: FormSchema,
    controllers: Controller[],
    doSubmit: () => void,
    config: ReactiveFormConfig = {}
) {
    const [formGroup, setStateFormGroup] = useState<FormSchema>(schema);
    const [errorMessages, setErrorMessages] = useState<ErrorMessages>({});

    useEffect(() => {
        if (config.resetOnSchemaChange) {
            setStateFormGroup(schema);
        }
    }, [schema, config.resetOnSchemaChange]);

    const validateField = (
        name: string,
        value: any,
        validators: ZodSchema<any>[],
        label: string
    ) => {
        let error: string | undefined = undefined;
        for (const validator of validators) {
            try {
                validator.parse(value);
            } catch (validationError) {
                if (validationError instanceof ZodError) {
                    error = processErrorMessages(validationError.errors, label);
                }
                break;
            }
        }
        setErrorMessages((prev) => ({ ...prev, [name]: error }));
    };

    const handleChange = (e, validators, label) => {
        const clone = { ...formGroup };
        const current = e.target;

        if (current.type === 'checkbox') {
            clone[current.name] = current.checked;
        } else {
            clone[current.name] = current.value;
        }

        setStateFormGroup(clone);

        // ____________Validate the field after its value changes____________
        validateField(current.name, clone[current.name], validators, label);
    };

    const handleBlur = (e, validators, label) => {
        const current = e.target;
        const value = formGroup[current.name];

        // ______Validate the field after its value changes______
        validateField(current.name, value, validators, label);
    };

    const handleSubmit = (e) => {
        console.log('fire');

        e.preventDefault();

        let isValid = true;
        const newErrorMessages = {};

        controllers.forEach((ctrl) => {
            ctrl.validators.forEach((validator) => {
                try {
                    validator.parse(formGroup[ctrl.name]);
                } catch (error) {
                    isValid = false;
                    const errorMessage = processErrorMessages(error.errors, ctrl.label);
                    newErrorMessages[ctrl.name] = errorMessage;
                }
            });
        });

        setErrorMessages(newErrorMessages);

        if (isValid) {
            doSubmit();
        }
    };

    const resetForm = () => {
        setStateFormGroup(schema);
        setErrorMessages({});
    };

    function renderInput(controller, handleChange, handleBlur, formGroup, errors) {
        const { label, name, type, validators, placeholder } = controller;
        return (
            <InputGroup
                label={label}
                name={name}
                value={formGroup[name]}
                onChange={(e) => handleChange(e, validators, label)}
                onBlur={(e) => handleBlur(e, validators, label)}
                type={type}
                placeholder={placeholder}
                error={errors[name]}
            />
        );
    }

    function renderSelect(
        controller,
        handleChange,
        handleBlur,
        formGroup,
        valueProp,
        textProp,
        errors
    ) {
        const { label, name, options, validators, type } = controller;
        return (
            <SelectComponent
                label={label}
                name={name}
                value={formGroup[name]}
                onChange={(e) => handleChange(e, validators, label)}
                onBlur={(e) => handleBlur(e, validators, label)}
                type={type}
                options={options}
                textProp={textProp}
                valueProp={valueProp}
                error={errors[name]}
            />
        );
    }

    return {
        formGroup,
        errorMessages,
        resetForm,
        handleChange,
        handleBlur,
        handleSubmit,
        renderInput,
        renderSelect,
    };
}

export default useReactiveForm;
