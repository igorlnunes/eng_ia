import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
  it('renderiza o campo de busca com placeholder padrão', () => {
    render(<SearchInput value="" onChange={() => {}} />);
    const input = screen.getByPlaceholderText('Digite o que você procura');
    expect(input).toBeInTheDocument();
  });

  it('chama onChange com o novo valor quando usuário digita', () => {
    const handleChange = vi.fn();
    render(<SearchInput value="" onChange={handleChange} />);
    const input = screen.getByPlaceholderText('Digite o que você procura');

    fireEvent.change(input, { target: { value: 'React' } });
    expect(handleChange).toHaveBeenCalledWith('React');
  });

  it('exibe botão de limpar e dispara onClear quando há texto', () => {
    const handleClear = vi.fn();
    render(
      <SearchInput value="Node" onChange={() => {}} onClear={handleClear} />,
    );

    const clearButton = screen.getByRole('button', { name: 'Limpar busca' });
    expect(clearButton).toBeInTheDocument();
    fireEvent.click(clearButton);
    expect(handleClear).toHaveBeenCalledTimes(1);
  });
});
