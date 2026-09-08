import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { beforeEach, describe, expect, it } from 'vitest';
import { AuthService } from './auth.service.js';
import { UsersService } from '../users/users.service.js';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(() => {
    usersService = new UsersService();
    const jwtService = new JwtService({ secret: 'test-secret' });
    authService = new AuthService(usersService, jwtService);
  });

  describe('signIn', () => {
    it('deve retornar access_token com credenciais válidas', async () => {
      await usersService.create({
        name: 'João',
        email: 'joao@example.com',
        password: 'senha123',
      });

      const result = await authService.signIn('joao@example.com', 'senha123');
      expect(result.access_token).toBeDefined();
      expect(typeof result.access_token).toBe('string');
    });

    it('deve lançar UnauthorizedException para senha incorreta', async () => {
      await usersService.create({
        name: 'João',
        email: 'joao@example.com',
        password: 'senha123',
      });

      await expect(
        authService.signIn('joao@example.com', 'senhaerrada'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('deve lançar UnauthorizedException para e-mail não cadastrado', async () => {
      await expect(
        authService.signIn('naoexiste@example.com', 'qualquersenha'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('getProfile', () => {
    it('deve retornar o perfil do usuário pelo ID', async () => {
      const created = await usersService.create({
        name: 'Maria',
        email: 'maria@example.com',
        password: 'senha456',
      });

      const profile = await authService.getProfile(created.id);
      expect(profile.id).toBe(created.id);
      expect(profile.name).toBe('Maria');
      expect((profile as unknown as Record<string, unknown>).password).toBeUndefined();
    });
  });
});
