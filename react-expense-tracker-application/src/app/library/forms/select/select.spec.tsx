import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectComponent from './select';

describe('SelectComponent', () => {
    const mockOptions = [
        { id: '1', name: 'Option 1' },
        { id: '2', name: 'Option 2' },
    ];

    beforeAll(() => {
        Element.prototype.hasPointerCapture = jest.fn(() => false);
        Element.prototype.setPointerCapture = jest.fn();
        Element.prototype.releasePointerCapture = jest.fn();
        Element.prototype.scrollIntoView = jest.fn();
    });

    it('should render successfully', () => {
        const mockOnChange = jest.fn();
        const mockOnBlur = jest.fn();

        const { getByLabelText } = render(
            <SelectComponent
                options={mockOptions}
                textProp="name"
                valueProp="id"
                onChange={mockOnChange}
                onBlur={mockOnBlur}
                label="Test Select"
                name="testSelect"
                type="select"
                value=""
                error=""
                isDark={false}
            />
        );

        expect(getByLabelText(/Test Select/i)).toBeInTheDocument();
    });

    it('should display error message when error prop is provided', () => {
        const { getByText } = render(
            <SelectComponent
                options={[{ id: '1', name: 'Option 1' }]}
                textProp="name"
                valueProp="id"
                onChange={() => {}}
                onBlur={() => {}}
                label="Select Label"
                name="selectName"
                type="select"
                value=""
                error="Error message"
                isDark={false}
            />
        );

        expect(getByText(/error message/i)).toBeInTheDocument();
    });

    it('should call onChange handler when selection changes', async () => {
        const mockOnChange = jest.fn();

        render(
            <SelectComponent
                options={mockOptions}
                textProp="name"
                valueProp="id"
                onChange={mockOnChange}
                onBlur={() => {}}
                label="Select Test"
                name="testSelect"
                type="select"
                value="1"
                error=""
                isDark={false}
            />
        );

        const combobox = screen.getByRole('combobox');
        fireEvent.click(combobox);

        await waitFor(() => {
            expect(
                screen.getByRole('option', { name: /Option 2/i })
            ).toBeInTheDocument();
        });

        fireEvent.click(screen.getByRole('option', { name: /Option 2/i }));

        expect(mockOnChange).toHaveBeenCalled();
    });
});
