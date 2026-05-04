import { type VariantProps } from 'class-variance-authority';

import { IClasses } from '../../../common/interfaces';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { IBtn } from './interfaces';

function contextualToVariant(
    contextual: IClasses['contextual']
): NonNullable<VariantProps<typeof buttonVariants>['variant']> {
    const map = {
        primary: 'default',
        secondary: 'secondary',
        success: 'default',
        warning: 'outline',
        danger: 'destructive',
        close: 'ghost',
        light: 'ghost',
        dark: 'secondary',
    } as const;

    return map[contextual];
}

function classesSizeToUiSize(
    size?: IClasses['size']
): NonNullable<VariantProps<typeof buttonVariants>['size']> {
    if (size === 'lg') return 'lg';
    if (size === 'sm') return 'sm';
    return 'default';
}

const BtnCn = ({
    label,
    type,
    classes,
    onEmitEvent,
    className,
    isDarkMode,
}: IBtn) => {
    const size = classesSizeToUiSize(classes.size);

    return (
        <Button
            type={type}
            onClick={() => onEmitEvent()}
            variant={
                !isDarkMode
                    ? contextualToVariant(classes.contextual)
                    : 'secondary'
            }
            size={size}
            className={cn(classes.custom, isDarkMode && className)}
        >
            {label}
        </Button>
    );
};

export default BtnCn;
