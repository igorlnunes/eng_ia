import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('dispara onSearch ao submeter o formulário', () => {
    const handleSearch = vi.fn();
    render(<SearchBar onSearch={handleSearch} />);

    const input = screen.getByPlaceholderText('Digite o que você procura');
    fireEvent.change(input, { target: { value: 'React' } });

    const submitBtn = screen.getByRole('button', { name: 'Buscar' });
    fireEvent.click(submitBtn);

    expect(handleSearch).toHaveBeenCalledWith('React');
  });

  it('limpa e dispara onSearch vazio ao clicar no botão de limpar', () => {
    const handleSearch = vi.fn();
    render(<SearchBar initialValue="Test" onSearch={handleSearch} />);

    const clearBtn = screen.getByRole('button', { name: 'Limpar busca' });
    fireEvent.click(clearBtn);

    expect(handleSearch).toHaveBeenCalledWith('');
  });
});
