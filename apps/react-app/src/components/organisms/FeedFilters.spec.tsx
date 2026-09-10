import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FeedFilters } from './FeedFilters';

const mockTags = [
  { id: '1', name: 'React' },
  { id: '2', name: 'Node' },
];

describe('FeedFilters', () => {
  it('renderiza filtro Todos e tags disponíveis', () => {
    render(
      <FeedFilters
        tags={mockTags}
        onSelectTag={() => {}}
        selectedSort="recent"
        onSelectSort={() => {}}
      />,
    );

    expect(screen.getByRole('button', { name: '#todos' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '#react' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '#node' })).toBeInTheDocument();
  });

  it('permite alternar ordenação entre recentes e populares', () => {
    const handleSort = vi.fn();
    render(
      <FeedFilters
        tags={mockTags}
        onSelectTag={() => {}}
        selectedSort="recent"
        onSelectSort={handleSort}
      />,
    );

    const popularTab = screen.getByRole('tab', { name: 'Populares' });
    fireEvent.click(popularTab);
    expect(handleSort).toHaveBeenCalledWith('popular');
  });

  it('seleciona tag e limpa ao clicar em Todos', () => {
    const handleTag = vi.fn();
    render(
      <FeedFilters
        tags={mockTags}
        selectedTag="React"
        onSelectTag={handleTag}
        selectedSort="recent"
        onSelectSort={() => {}}
      />,
    );

    const allBtn = screen.getByRole('button', { name: '#todos' });
    fireEvent.click(allBtn);
    expect(handleTag).toHaveBeenCalledWith(undefined);
  });
});
