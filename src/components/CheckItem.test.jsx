import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckItem from './CheckItem';
import { describe, it, expect, vi } from 'vitest';

describe('CheckItem', () => {
    const mockStep = {
        step_number: '1',
        description: 'Verificar el uso de EPP completo',
        risks: 'Caída de objetos'
    };

    it('renders step details correctly', () => {
        render(<CheckItem step={mockStep} result={{}} onChange={() => {}} />);

        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('Verificar el uso de EPP completo')).toBeInTheDocument();
        expect(screen.getByText(/Riesgo: Caída de objetos/)).toBeInTheDocument();
    });

    it('calls onChange with has_deviation: false when "CUMPLE ESTÁNDAR" is clicked', async () => {
        const handleChange = vi.fn();
        const user = userEvent.setup();
        render(<CheckItem step={mockStep} result={{}} onChange={handleChange} />);

        const cumpleBtn = screen.getByText('CUMPLE ESTÁNDAR');
        await user.click(cumpleBtn);

        expect(handleChange).toHaveBeenCalledWith({ has_deviation: false });
    });

    it('calls onChange with has_deviation: true when "REGISTRAR DESVÍO" is clicked', async () => {
        const handleChange = vi.fn();
        const user = userEvent.setup();
        render(<CheckItem step={mockStep} result={{}} onChange={handleChange} />);

        const desvioBtn = screen.getByText('REGISTRAR DESVÍO');
        await user.click(desvioBtn);

        expect(handleChange).toHaveBeenCalledWith({ has_deviation: true });
    });

    it('displays additional form fields when has_deviation is true', () => {
        render(<CheckItem step={mockStep} result={{ has_deviation: true }} onChange={() => {}} />);

        expect(screen.getByText('1. Observación / Hallazgo')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Describe detalladamente el desvío encontrado...')).toBeInTheDocument();

        expect(screen.getByText('2. Causa Raíz Identificada')).toBeInTheDocument();
        expect(screen.getByRole('combobox')).toBeInTheDocument();

        expect(screen.getByText('3. Acción Correctora Inmediata')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Indica la acción tomada in situ...')).toBeInTheDocument();
    });

    it('calls onChange when typing in the observation textarea', async () => {
        const handleChange = vi.fn();
        const user = userEvent.setup();
        render(<CheckItem step={mockStep} result={{ has_deviation: true }} onChange={handleChange} />);

        const observationInput = screen.getByPlaceholderText('Describe detalladamente el desvío encontrado...');
        await user.type(observationInput, 'Falta casco');

        expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
            observation: 'F' // the first typed character, since each char triggers a change event
        }));
    });

    it('calls onChange when selecting a deviation cause', async () => {
        const handleChange = vi.fn();
        const user = userEvent.setup();
        render(<CheckItem step={mockStep} result={{ has_deviation: true }} onChange={handleChange} />);

        const causeSelect = screen.getByRole('combobox');
        await user.selectOptions(causeSelect, '1');

        expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
            deviation_cause: 1
        }));
    });

    it('calls onChange when typing in the countermeasure input', async () => {
        const handleChange = vi.fn();
        const user = userEvent.setup();
        render(<CheckItem step={mockStep} result={{ has_deviation: true }} onChange={handleChange} />);

        const countermeasureInput = screen.getByPlaceholderText('Indica la acción tomada in situ...');
        await user.type(countermeasureInput, 'Se entregó casco');

        expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
            countermeasure: 'S' // the first typed character
        }));
    });

    it('applies correct styling classes based on has_deviation value', () => {
        const { container, rerender } = render(<CheckItem step={mockStep} result={{}} onChange={() => {}} />);
        expect(container.firstChild).toHaveClass('border-l-slate-200');

        rerender(<CheckItem step={mockStep} result={{ has_deviation: false }} onChange={() => {}} />);
        expect(container.firstChild).toHaveClass('border-l-success');

        rerender(<CheckItem step={mockStep} result={{ has_deviation: true }} onChange={() => {}} />);
        expect(container.firstChild).toHaveClass('border-l-error', 'bg-error/5');
    });
});
