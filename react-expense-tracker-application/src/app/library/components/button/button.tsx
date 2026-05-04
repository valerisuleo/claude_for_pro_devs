import { Button } from '@/components/ui/button';

import type { IBtn } from './interfaces';

const BtnCn = ({ label, onEmitEvent, ...props }: IBtn) => {
    return (
        <Button {...props} onClick={() => onEmitEvent()}>
            {label}
        </Button>
    );
};

export default BtnCn;
