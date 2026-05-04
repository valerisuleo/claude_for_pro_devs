import type { FC } from 'react';

import {
    Alert,
    AlertAction,
    AlertDescription,
} from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

import { IAlert } from './interfaces';

const AlertsComponent: FC<IAlert> = ({
    children,
    variant = 'default',
    onClose,
    className,
}) => {
    return (
        <Alert variant={variant} className={className}>
            <AlertDescription>{children}</AlertDescription>
            {onClose ? (
                <AlertAction>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Close"
                        onClick={() => onClose()}
                    >
                        ×
                    </Button>
                </AlertAction>
            ) : null}
        </Alert>
    );
};

export default AlertsComponent;
