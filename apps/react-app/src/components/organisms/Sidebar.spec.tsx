import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Sidebar } from './Sidebar';
import * as AuthContextModule from '../../contexts';

describe('Sidebar', () => {
  it('exibe link de Login quando o usuário não estiver autenticado', () => {
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
        <Sidebar />
      </MemoryRouter>,
    );

    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /sair/i })).not.toBeInTheDocument();
  });

  it('exibe link de Sair e dados do usuário quando autenticado', () => {
    const mockLogout = vi.fn();
    vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
      user: {
        id: 'u-1',
        name: 'Carlos Dev',
        email: 'carlos@test.com',
        createdAt: '2026-01-01',
      },
      isAuthenticated: true,
      isLoading: false,
      login: vi.fn(),
      logout: mockLogout,
      refreshUser: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );

    expect(screen.getByRole('button', { name: /sair/i })).toBeInTheDocument();
    expect(screen.getByText('Carlos Dev')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /sair/i }));
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
