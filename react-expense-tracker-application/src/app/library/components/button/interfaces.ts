import type { ComponentProps, ReactNode } from 'react';

import { Button } from '@/components/ui/button';

export type IBtn = Omit<ComponentProps<typeof Button>, 'children' | 'onClick'> & {
    label: ReactNode;
    onEmitEvent: () => void;
};
