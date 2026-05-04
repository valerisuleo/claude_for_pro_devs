import type { ComponentProps, ReactNode } from 'react';

import { Button } from '@/components/ui/button';

export interface IExpense {
    description?: string;
    amount?: string;
    category?: string;
    actions?: (currentRow: IExpense) => ReactNode;
}

export interface IButtonAction {
    label: string;
    name: string;
    variant?: ComponentProps<typeof Button>['variant'];
    size?: ComponentProps<typeof Button>['size'];
    className?: string;
}
