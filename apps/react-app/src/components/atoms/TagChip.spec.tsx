import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TagChip } from './TagChip';

describe('TagChip', () => {
  it('renderiza o nome com prefixo #', () => {
    render(<TagChip name="React" />);
    expect(screen.getByRole('button', { name: '#react' })).toBeInTheDocument();
  });

  it('dispara onClick quando clicado', () => {
    const handleClick = vi.fn();
    render(<TagChip name="TypeScript" onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button', { name: '#typescript' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('aplica estilo de ativo corretamente', () => {
    render(<TagChip name="Node" active />);
    const chip = screen.getByRole('button', { name: '#node' });
    expect(chip).toHaveClass('bg-brand-green');
  });
});
