import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectComponent from './select';

describe('SelectComponent', () => {
    it('should render successfully', () => {
        const mockOptions = [
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
        ];
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
        const mockOptions = [{ value: '1', label: 'Option 1' }];

        const { getByText } = render(
            <SelectComponent
                options={mockOptions}
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

    it('should call onChange handler when selection changes', () => {
        const mockOptions = [
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
        ];
        const mockOnChange = jest.fn();

        const { getByLabelText } = render(
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

        fireEvent.change(getByLabelText(/Select Test/i), {
            target: { value: '2' },
        });

        expect(mockOnChange).toHaveBeenCalled();
    });
});
