import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

// Mock useNavigate from react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Home Component', () => {
  beforeEach(() => {
    // Clear mocks and localStorage before each test
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders the component with a missing user', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Check for the "Hola," text, where user.name is undefined (it's converted to uppercase by css but the DOM contains 'Hola, ')
    expect(screen.getByText(/Hola,/i)).toBeInTheDocument();

    // Check static elements
    expect(screen.getByText('Tu Actividad')).toBeInTheDocument();
    expect(screen.getByText('NUEVA VERIFICACIÓN')).toBeInTheDocument();
  });

  it('renders the component with a user name', () => {
    // Set a mock user in localStorage
    localStorage.setItem('vct_user', JSON.stringify({ name: 'John Doe' }));

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Check that the user's first name is rendered
    expect(screen.getByText('Hola, John')).toBeInTheDocument();
  });

  it('navigates to /new-vct when clicking the new verification button', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Find the button and click it
    const button = screen.getByText('NUEVA VERIFICACIÓN');
    fireEvent.click(button);

    // Assert that navigate was called with correct path
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/new-vct');
  });

  it('renders the recent verifications section', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Check recent verifications section
    expect(screen.getByText('Recientes')).toBeInTheDocument();
    expect(screen.getByText('Inspección Molino')).toBeInTheDocument();
    expect(screen.getByText('Transferencia Bandas')).toBeInTheDocument();
  });
});
