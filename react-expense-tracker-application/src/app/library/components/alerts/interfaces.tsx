import { ReactNode } from 'react';

export interface IAlert {
    children: ReactNode;
    classes: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
    onClose?: () => void;
}
