import { ReactNode } from 'react';

export interface IAlert {
    children: ReactNode;
    variant?: 'default' | 'destructive';
    onClose?: () => void;
    className?: string;
}
