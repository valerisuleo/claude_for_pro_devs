import _ from 'lodash';
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
            <div key={index} className="d-flex align-items-start mb-3 invalid-feedback">
                {_.startCase(err)}
            </div>
        ))}
    </Fragment>
);

export default ErrorsComponent;
