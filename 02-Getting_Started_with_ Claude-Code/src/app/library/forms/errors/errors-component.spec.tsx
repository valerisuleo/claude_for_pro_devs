import { render } from '@testing-library/react';

import ErrorsComponent from './errors-component';

describe('ErrorsComponent', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ErrorsComponent />);
        expect(baseElement).toBeTruthy();
    });
});
