import { render, fireEvent } from '@testing-library/react';

import BtnComponent from './button';
import type { IBtn } from './interfaces';

describe('BtnComponent', () => {
    const mockProps: IBtn = {
        label: 'Click me!',
        type: 'button',
        variant: 'default',
        size: 'lg',
        onEmitEvent: jest.fn(),
    };

    it('should render button with correct label', () => {
        const { getByText } = render(<BtnComponent {...mockProps} />);
        expect(getByText(mockProps.label as string)).toBeDefined();
    });

    it('should call onEmitEvent when clicked', () => {
        const { getByText } = render(<BtnComponent {...mockProps} />);
        fireEvent.click(getByText(mockProps.label as string));
        expect(mockProps.onEmitEvent).toHaveBeenCalled();
    });
});
