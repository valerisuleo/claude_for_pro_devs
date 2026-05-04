import { Fragment } from 'react';

interface IErrorsComponent {
    error: string;
}

const parseError = (error: string): string[] => {
    return error ? error.split(',').map((err) => err.trim()) : [];
};

const ErrorsComponent = ({ error }: IErrorsComponent) => (
    <Fragment>
        {parseError(error).map((err, index) => (
            <div key={index} className="mt-1 text-sm text-destructive">
                {err}
            </div>
        ))}
    </Fragment>
);

export default ErrorsComponent;
