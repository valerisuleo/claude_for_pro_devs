import { cleanup, render } from '@testing-library/react';

import Navbar from './navbar';

describe('Navbar Component', () => {
    let component;

    beforeEach(() => {
        component = () => {
            return render(<Navbar />);
        };
    });

    afterEach(() => {
        cleanup();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
