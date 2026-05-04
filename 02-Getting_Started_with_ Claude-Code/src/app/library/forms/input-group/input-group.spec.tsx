import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputGroup from './input-group';

describe('InputGroup', () => {
    it('should render successfully', () => {
        const mockOnChange = jest.fn();
        const mockOnBlur = jest.fn();

        const { getByLabelText } = render(
            <InputGroup
                label="test label"
                value=""
                onChange={mockOnChange}
                onBlur={mockOnBlur}
                name="testName"
                type="text"
                placeholder="Test Placeholder"
                error=""
            />
        );

        // Check if the label renders correctly
        expect(getByLabelText(/test label/i)).toBeInTheDocument();
    });

    it('should display error message when error prop is provided', () => {
        const { getByText } = render(
            <InputGroup
                label="email"
                value=""
                onChange={() => {}}
                onBlur={() => {}}
                name="email"
                type="email"
                placeholder="Enter your email"
                error="Error message"
            />
        );

        // Check if the error message is displayed
        expect(getByText(/error message/i)).toBeInTheDocument();
    });

    it('should call onChange handler when input changes', () => {
        const mockOnChange = jest.fn();
        const { getByPlaceholderText } = render(
            <InputGroup
                label="email"
                value=""
                onChange={mockOnChange}
                onBlur={() => {}}
                name="email"
                type="email"
                placeholder="Enter your email"
                error=""
            />
        );

        // Simulate user typing in the input field
        fireEvent.change(getByPlaceholderText(/Enter your email/i), {
            target: { value: 'user@example.com' },
        });

        // Check if the onChange handler was called
        expect(mockOnChange).toHaveBeenCalled();
    });
});
