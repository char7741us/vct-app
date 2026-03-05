import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Home from './Home';

describe('Home Component', () => {
    let getItemMock;

    beforeEach(() => {
        getItemMock = vi.spyOn(Storage.prototype, 'getItem');
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('renders user first name correctly when user data exists', () => {
        getItemMock.mockReturnValue(JSON.stringify({ name: 'John Doe Smith' }));

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        expect(screen.getByText('Hola, John')).toBeInTheDocument();
    });

    it('handles gracefully when localStorage returns null (no user data)', () => {
        getItemMock.mockReturnValue(null);

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        expect(screen.getByText('Hola,')).toBeInTheDocument();
    });

    it('handles gracefully when localStorage returns empty object (no name property)', () => {
        getItemMock.mockReturnValue(JSON.stringify({}));

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        expect(screen.getByText('Hola,')).toBeInTheDocument();
    });

    it('handles gracefully when user name is undefined', () => {
        getItemMock.mockReturnValue(JSON.stringify({ otherField: 'something' }));

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        expect(screen.getByText('Hola,')).toBeInTheDocument();
    });

    it('handles gracefully when user name is empty string', () => {
        getItemMock.mockReturnValue(JSON.stringify({ name: '' }));

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        expect(screen.getByText('Hola,')).toBeInTheDocument();
    });
});