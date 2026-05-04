import { ZodSchema } from 'zod';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IFormCtrl {
    label: string;
    name: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<any>) => void;
    onBlur: (e: React.FocusEvent<any>) => void;
    error?: any;
    options?: { value: string; label: string }[];
    textProp?: string;
    valueProp?: string;
    placeholder?: string;
    isDark?: boolean
}

// Assuming a simple key-value pair structure for the form schema.
export interface FormSchema {
    [key: string]: any;
}

// Define a Controller type.
export interface Controller {
    type: string;
    name: string;
    label: string;
    validators: ZodSchema<any>[];
    options?: { value: string; label: string }[];
    id?: string;
}

// Define a type for error messages.
export interface ErrorMessages {
    [key: string]: string | undefined;
}

// The ReactiveFormConfig remains the same.
export interface ReactiveFormConfig {
    resetOnSchemaChange?: boolean;
}
