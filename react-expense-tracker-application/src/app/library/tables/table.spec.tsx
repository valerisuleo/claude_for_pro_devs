import { render } from '@testing-library/react';
import Table from './table';
import { Column } from './interfaces';


describe('Table', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Table tableHeader={[]} tableBody={''} onSort={function (column: Column): void {
            throw new Error('Function not implemented.');
        } } />);
        expect(baseElement).toBeTruthy();
    });
});
