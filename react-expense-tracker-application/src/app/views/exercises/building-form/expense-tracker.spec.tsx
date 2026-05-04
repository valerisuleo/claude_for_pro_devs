import { render } from '@testing-library/react';

import ExpenseTracker from './expense-tracker';

describe('ExpenseTracker', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ExpenseTracker />);
        expect(baseElement).toBeTruthy();
    });
});
