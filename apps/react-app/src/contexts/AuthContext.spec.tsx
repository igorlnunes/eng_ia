import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { AuthProvider, useAuth } from './index';
import { authService } from '../services';

vi.mock('../services', () => ({
  authService: {
    isAuthenticated: vi.fn(),
    getProfile: vi.fn(),
    login: vi.fn(),
    logout: vi.fn(),
  },
}));

function TestConsumer() {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();
  if (isLoading) return <div>Carregando...</div>;
  return (
    <div>
      <span data-testid="auth-status">
        {isAuthenticated ? `Logado: ${user?.name}` : 'Deslogado'}
      </span>
      <button
        onClick={() => login({ email: 'test@example.com', password: '123' })}
      >
        Entrar
      </button>
      <button onClick={logout}>Sair</button>
    </div>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve iniciar deslogado quando não houver token', async () => {
    vi.mocked(authService.isAuthenticated).mockReturnValue(false);

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Deslogado');
    });
  });

  it('deve carregar perfil se já estiver autenticado', async () => {
    vi.mocked(authService.isAuthenticated).mockReturnValue(true);
    vi.mocked(authService.getProfile).mockResolvedValueOnce({
      id: 'u-1',
      name: 'Maria',
      email: 'maria@example.com',
      createdAt: '2026-01-01',
    });

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Logado: Maria');
    });
  });

  it('deve atualizar estado após login e logout', async () => {
    vi.mocked(authService.isAuthenticated).mockReturnValue(false);
    vi.mocked(authService.login).mockResolvedValueOnce({ access_token: 'tk' });
    vi.mocked(authService.getProfile).mockResolvedValueOnce({
      id: 'u-2',
      name: 'Carlos',
      email: 'carlos@example.com',
      createdAt: '2026-01-01',
    });

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Deslogado');
    });

    fireEvent.click(screen.getByText('Entrar'));

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Logado: Carlos');
    });

    fireEvent.click(screen.getByText('Sair'));

    expect(authService.logout).toHaveBeenCalled();
    expect(screen.getByTestId('auth-status')).toHaveTextContent('Deslogado');
  });
});
