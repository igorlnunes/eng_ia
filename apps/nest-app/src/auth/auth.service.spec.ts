import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PrismaService } from '../prisma/prisma.service.js';
import { UsersService } from '../users/users.service.js';
import { AuthService } from './auth.service.js';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makePrismaMock() {
  return {
    user: {
      create: vi.fn(),
      findUnique: vi.fn(),
    },
  };
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let prismaMock: ReturnType<typeof makePrismaMock>;

  beforeEach(() => {
    prismaMock = makePrismaMock();
    usersService = new UsersService(prismaMock as unknown as PrismaService);
    const jwtService = new JwtService({ secret: 'test-secret' });
    authService = new AuthService(usersService, jwtService);
  });

  describe('signIn', () => {
    it('deve retornar access_token com credenciais válidas', async () => {
      // Simula um usuário com senha já hasheada no banco
      const hashedPassword =
        '$2a$10$examplehashforjoaocredentials1234567890abcdef';

      // bcrypt.compare precisa de um hash real; usamos um usuário real criado para teste
      const { hash } = await import('bcryptjs');
      const realHash = await hash('senha123', 10);

      prismaMock.user.findUnique.mockResolvedValueOnce({
        id: 'user-uuid',
        name: 'João',
        email: 'joao@example.com',
        password: realHash,
        createdAt: new Date(),
      });

      void hashedPassword; // used for type narrowing only

      const result = await authService.signIn('joao@example.com', 'senha123');
      expect(result.access_token).toBeDefined();
      expect(typeof result.access_token).toBe('string');
    });

    it('deve lançar UnauthorizedException para senha incorreta', async () => {
      const { hash } = await import('bcryptjs');
      const realHash = await hash('senha123', 10);

      prismaMock.user.findUnique.mockResolvedValueOnce({
        id: 'user-uuid',
        name: 'João',
        email: 'joao@example.com',
        password: realHash,
        createdAt: new Date(),
      });

      await expect(
        authService.signIn('joao@example.com', 'senhaerrada'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('deve lançar UnauthorizedException para e-mail não cadastrado', async () => {
      prismaMock.user.findUnique.mockResolvedValueOnce(null);

      await expect(
        authService.signIn('naoexiste@example.com', 'qualquersenha'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('getProfile', () => {
    it('deve retornar o perfil do usuário pelo ID', async () => {
      const prismaUser = {
        id: 'maria-uuid',
        name: 'Maria',
        email: 'maria@example.com',
        password: '$2a$10$somehash',
        createdAt: new Date(),
      };

      prismaMock.user.findUnique.mockResolvedValueOnce(prismaUser);

      const profile = await authService.getProfile('maria-uuid');
      expect(profile.id).toBe('maria-uuid');
      expect(profile.name).toBe('Maria');
      expect((profile as unknown as Record<string, unknown>).password).toBeUndefined();
    });
  });
});
