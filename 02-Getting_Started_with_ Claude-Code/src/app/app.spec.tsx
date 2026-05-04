import { cleanup, render } from '@testing-library/react';

import App from './app';

describe('App Component', () => {
    let component;

    beforeEach(() => {
        component = () => {
            return render(<App />);
        };
    });

    afterEach(() => {
        cleanup();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
