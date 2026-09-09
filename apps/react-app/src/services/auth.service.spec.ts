import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authService } from './auth.service';
import { api } from './api';

vi.mock('./api', () => ({
  api: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('login', () => {
    it('deve realizar login, salvar access_token no localStorage e retornar a resposta', async () => {
      const mockResponse = { data: { access_token: 'fake-jwt-token' } };
      vi.mocked(api.post).mockResolvedValueOnce(mockResponse);

      const result = await authService.login({
        email: 'user@example.com',
        password: 'password123',
      });

      expect(api.post).toHaveBeenCalledWith('/auth/login', {
        email: 'user@example.com',
        password: 'password123',
      });
      expect(localStorage.getItem('access_token')).toBe('fake-jwt-token');
      expect(result).toEqual({ access_token: 'fake-jwt-token' });
    });
  });

  describe('getProfile', () => {
    it('deve chamar o endpoint de perfil e retornar os dados do usuário', async () => {
      const mockUser = {
        id: '123',
        name: 'Usuário Teste',
        email: 'user@example.com',
        createdAt: '2026-09-09T00:00:00.000Z',
      };
      vi.mocked(api.get).mockResolvedValueOnce({ data: mockUser });

      const result = await authService.getProfile();

      expect(api.get).toHaveBeenCalledWith('/auth/profile');
      expect(result).toEqual(mockUser);
    });
  });

  describe('token management', () => {
    it('deve gerenciar logout, getToken e isAuthenticated corretamente', () => {
      expect(authService.isAuthenticated()).toBe(false);
      expect(authService.getToken()).toBeNull();

      localStorage.setItem('access_token', 'token-123');
      expect(authService.isAuthenticated()).toBe(true);
      expect(authService.getToken()).toBe('token-123');

      authService.logout();
      expect(authService.isAuthenticated()).toBe(false);
      expect(authService.getToken()).toBeNull();
      expect(localStorage.getItem('access_token')).toBeNull();
    });
  });
});
