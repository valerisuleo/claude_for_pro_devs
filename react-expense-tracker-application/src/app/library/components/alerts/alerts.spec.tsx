import { render } from '@testing-library/react';

import Alerts from './alerts';

describe('Alerts', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Alerts children={''} classes={'primary'} />);
        expect(baseElement).toBeTruthy();
    });
});
