import { describe, it, expect, vi, beforeEach } from 'vitest';
import { usersService } from './users.service';
import { api } from './api';

vi.mock('./api', () => ({
  api: {
    post: vi.fn(),
  },
}));

describe('usersService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('register', () => {
    it('deve chamar o endpoint /users com payload correto e retornar dados do usuário criado', async () => {
      const mockCreatedUser = {
        id: 'user-id-1',
        name: 'Maria Santos',
        email: 'maria@example.com',
        createdAt: '2026-09-09T10:00:00.000Z',
      };
      vi.mocked(api.post).mockResolvedValueOnce({ data: mockCreatedUser });

      const payload = {
        name: 'Maria Santos',
        email: 'maria@example.com',
        password: 'password123',
      };

      const result = await usersService.register(payload);

      expect(api.post).toHaveBeenCalledWith('/users', payload);
      expect(result).toEqual(mockCreatedUser);
    });
  });
});
