import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Login from './Login';
import { signInWithEmail } from '../lib/supabase';

// Mock supabase function
vi.mock('../lib/supabase', () => ({
    signInWithEmail: vi.fn(),
}));

// Mock react-router-dom useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('Login Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const renderLogin = () => {
        return render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );
    };

    it('renders login form correctly', () => {
        renderLogin();

        expect(screen.getByRole('heading', { name: /Acceso(\s*)Argos VCT/i })).toBeInTheDocument();
        expect(screen.getByPlaceholderText('usuario@argos.co')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Ingresar a Plataforma/i })).toBeInTheDocument();
    });

    it('allows typing in email and password fields', async () => {
        renderLogin();
        const user = userEvent.setup();

        const emailInput = screen.getByPlaceholderText('usuario@argos.co');
        const passwordInput = screen.getByPlaceholderText('••••••••');

        await user.type(emailInput, 'test@argos.co');
        await user.type(passwordInput, 'password123');

        expect(emailInput).toHaveValue('test@argos.co');
        expect(passwordInput).toHaveValue('password123');
    });

    it('toggles password visibility', async () => {
        renderLogin();
        const user = userEvent.setup();

        const passwordInput = screen.getByPlaceholderText('••••••••');
        expect(passwordInput).toHaveAttribute('type', 'password');

        // The toggle button is the first button in the component before the submit button
        // Actually, let's select it by checking it's the only button without text or by searching all buttons
        const buttons = screen.getAllByRole('button');
        const toggleButton = buttons[0];

        await user.click(toggleButton);
        expect(passwordInput).toHaveAttribute('type', 'text');

        await user.click(toggleButton);
        expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('submits successfully and navigates to home', async () => {
        renderLogin();
        const user = userEvent.setup();

        const emailInput = screen.getByPlaceholderText('usuario@argos.co');
        const passwordInput = screen.getByPlaceholderText('••••••••');
        const submitButton = screen.getByRole('button', { name: /Ingresar a Plataforma/i });

        signInWithEmail.mockResolvedValueOnce({}); // Success

        await user.type(emailInput, 'test@argos.co');
        await user.type(passwordInput, 'password123');
        await user.click(submitButton);

        expect(signInWithEmail).toHaveBeenCalledWith('test@argos.co', 'password123');

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });

    it('displays error message for invalid credentials', async () => {
        renderLogin();
        const user = userEvent.setup();

        const emailInput = screen.getByPlaceholderText('usuario@argos.co');
        const passwordInput = screen.getByPlaceholderText('••••••••');
        const submitButton = screen.getByRole('button', { name: /Ingresar a Plataforma/i });

        signInWithEmail.mockRejectedValueOnce(new Error('Invalid login credentials'));

        await user.type(emailInput, 'test@argos.co');
        await user.type(passwordInput, 'wrongpassword');
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Correo o contraseña incorrectos. Verifica tus datos.')).toBeInTheDocument();
        });
        expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('displays error message for unconfirmed email', async () => {
        renderLogin();
        const user = userEvent.setup();

        const emailInput = screen.getByPlaceholderText('usuario@argos.co');
        const passwordInput = screen.getByPlaceholderText('••••••••');
        const submitButton = screen.getByRole('button', { name: /Ingresar a Plataforma/i });

        signInWithEmail.mockRejectedValueOnce(new Error('Email not confirmed'));

        await user.type(emailInput, 'unconfirmed@argos.co');
        await user.type(passwordInput, 'password123');
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Debes confirmar tu correo antes de ingresar. Revisa tu bandeja de entrada.')).toBeInTheDocument();
        });
    });

    it('displays error message for too many requests', async () => {
        renderLogin();
        const user = userEvent.setup();

        const emailInput = screen.getByPlaceholderText('usuario@argos.co');
        const passwordInput = screen.getByPlaceholderText('••••••••');
        const submitButton = screen.getByRole('button', { name: /Ingresar a Plataforma/i });

        signInWithEmail.mockRejectedValueOnce(new Error('Too many requests'));

        await user.type(emailInput, 'test@argos.co');
        await user.type(passwordInput, 'password123');
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Demasiados intentos. Espera un momento e intenta nuevamente.')).toBeInTheDocument();
        });
    });

    it('displays generic error message for other errors', async () => {
        renderLogin();
        const user = userEvent.setup();

        const emailInput = screen.getByPlaceholderText('usuario@argos.co');
        const passwordInput = screen.getByPlaceholderText('••••••••');
        const submitButton = screen.getByRole('button', { name: /Ingresar a Plataforma/i });

        signInWithEmail.mockRejectedValueOnce(new Error('Network Error'));

        await user.type(emailInput, 'test@argos.co');
        await user.type(passwordInput, 'password123');
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Network Error')).toBeInTheDocument();
        });
    });

    it('displays default generic error message if error has no message', async () => {
        renderLogin();
        const user = userEvent.setup();

        const emailInput = screen.getByPlaceholderText('usuario@argos.co');
        const passwordInput = screen.getByPlaceholderText('••••••••');
        const submitButton = screen.getByRole('button', { name: /Ingresar a Plataforma/i });

        signInWithEmail.mockRejectedValueOnce({});

        await user.type(emailInput, 'test@argos.co');
        await user.type(passwordInput, 'password123');
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Error al iniciar sesión. Intenta de nuevo.')).toBeInTheDocument();
        });
    });

    it('shows loading state while submitting', async () => {
        renderLogin();
        const user = userEvent.setup();

        const emailInput = screen.getByPlaceholderText('usuario@argos.co');
        const passwordInput = screen.getByPlaceholderText('••••••••');
        const submitButton = screen.getByRole('button', { name: /Ingresar a Plataforma/i });

        // A promise that doesn't resolve immediately
        let resolveSignIn;
        const signInPromise = new Promise(resolve => {
            resolveSignIn = resolve;
        });
        signInWithEmail.mockReturnValueOnce(signInPromise);

        await user.type(emailInput, 'test@argos.co');
        await user.type(passwordInput, 'password123');
        await user.click(submitButton);

        expect(screen.getByText('Verificando...')).toBeInTheDocument();
        expect(submitButton).toBeDisabled();
        expect(emailInput).toBeDisabled();
        expect(passwordInput).toBeDisabled();

        // Resolve the promise to finish the test cleanly
        resolveSignIn({});

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });
});
