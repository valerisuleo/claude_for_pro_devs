import { IAlert } from './interfaces';

const AlertsComponent = ({ children, classes, onClose }: IAlert) => {
    const setContextualClass = () => {
        let contextualClass = `alert alert-${classes} `;
        contextualClass += onClose ? 'alert-dismissible fade show' : contextualClass;

        return contextualClass;
    };

    return (
        <div className={setContextualClass()} role="alert">
            {children}
            {onClose && (
                <button
                    type="button"
                    className="btn btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    onClick={() => onClose()}
                ></button>
            )}
        </div>
    );
};

export default AlertsComponent;
