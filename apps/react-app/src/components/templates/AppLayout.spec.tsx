import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AppLayout } from './AppLayout';
import * as AuthContextModule from '../../contexts';

describe('AppLayout', () => {
  it('renderiza sidebar, barra de pesquisa e conteúdo filho', () => {
    vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: vi.fn(),
      logout: vi.fn(),
      refreshUser: vi.fn(),
    });

    render(
      <MemoryRouter>
        <AppLayout>
          <div data-testid="child-content">Conteúdo da Página</div>
        </AppLayout>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Digite o que você procura'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
});
