import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('renderiza ícone e contagem com aria-label', () => {
    render(
      <IconButton
        icon={<span data-testid="test-icon">★</span>}
        count={12}
        ariaLabel="Curtir post"
      />,
    );

    expect(screen.getByRole('button', { name: 'Curtir post' })).toBeInTheDocument();
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('dispara onClick quando clicado e não desabilitado', () => {
    const handleClick = vi.fn();
    render(
      <IconButton
        icon={<span>★</span>}
        ariaLabel="Curtir"
        onClick={handleClick}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Curtir' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('não dispara onClick quando desabilitado', () => {
    const handleClick = vi.fn();
    render(
      <IconButton
        icon={<span>★</span>}
        ariaLabel="Curtir"
        disabled
        onClick={handleClick}
      />,
    );

    const button = screen.getByRole('button', { name: 'Curtir' });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
