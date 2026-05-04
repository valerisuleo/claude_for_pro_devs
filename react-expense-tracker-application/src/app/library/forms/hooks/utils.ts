/* eslint-disable @typescript-eslint/no-explicit-any */
interface FormItem {
    name: string;
    type: string;
}

// Assuming all values in the object are either string or boolean
interface FormValues {
    [key: string]: string | boolean;
}

export const formMaker = (
    array: FormItem[]
): { [key: string]: string | boolean } => {
    const obj = Object.assign(
        {},
        ...array.map((item) => ({
            [item.name]: item.type === 'checkbox' ? false : '',
        }))
    );
    return obj;
};

export const formUpdater = (
    array: FormItem[],
    responseData: { [key: string]: any }
): FormValues => {
    const initialForm = formMaker(array);
    return Object.keys(initialForm).reduce((acc, key) => {
        if (responseData[key] !== undefined) {
            acc[key] = responseData[key];
        }
        return acc;
    }, {} as FormValues);
};

export const processErrorMessages = (errors, label) => {
    return errors
        .map((err) => {
            if (
                err.message.includes(
                    'String must contain at least 1 character(s)'
                )
            ) {
                return `${label} is required`;
            }
            if (err.message.includes('String')) {
                return err.message.replace('String', label);
            }
            return err.message;
        })
        .join(', ');
};
