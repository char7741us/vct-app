import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';

describe('Home Component', () => {
    beforeEach(() => {
        // Mock localStorage
        const mockUser = { name: 'Juan Perez', role: 'inspector' };
        Storage.prototype.getItem = vi.fn(() => JSON.stringify(mockUser));
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders the user name correctly', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        expect(screen.getByText('Hola, Juan')).toBeInTheDocument();
        expect(screen.getByText('Tu Actividad')).toBeInTheDocument();
    });

    it('renders the generic greeting when no user is in localStorage', () => {
        Storage.prototype.getItem = vi.fn(() => null);

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        expect(screen.getByText('Hola,')).toBeInTheDocument();
        expect(screen.getByText('Tu Actividad')).toBeInTheDocument();
    });

    it('navigates to /new-vct when clicking NUEVA VERIFICACIÓN', async () => {
        const user = userEvent.setup();

        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/new-vct" element={<div data-testid="new-vct-page">New VCT Page</div>} />
                </Routes>
            </MemoryRouter>
        );

        const newVctButton = screen.getByRole('button', { name: /NUEVA VERIFICACIÓN/i });
        await user.click(newVctButton);

        // Verify that the new route component is rendered
        expect(screen.getByTestId('new-vct-page')).toBeInTheDocument();
    });

    it('renders recent verification items', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        expect(screen.getByText('Recientes')).toBeInTheDocument();
        expect(screen.getByText('Inspección Molino')).toBeInTheDocument();
        expect(screen.getByText('Transferencia Bandas')).toBeInTheDocument();
    });
});
