import { ConflictException, NotFoundException } from '@nestjs/common';
import { beforeEach, describe, expect, it } from 'vitest';
import { UsersService } from './users.service.js';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    service = new UsersService();
  });

  describe('create', () => {
    it('deve criar um usuário com sucesso e retornar dados sem a senha', async () => {
      const result = await service.create({
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'senha123',
      });

      expect(result.id).toBeDefined();
      expect(result.name).toBe('João Silva');
      expect(result.email).toBe('joao@example.com');
      expect(result.createdAt).toBeInstanceOf(Date);
      expect((result as unknown as Record<string, unknown>).password).toBeUndefined();
    });

    it('deve armazenar a senha como hash (não em texto plano)', async () => {
      await service.create({
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'senha123',
      });

      const user = await service.findByEmail('joao@example.com');
      expect(user?.password).not.toBe('senha123');
      expect(user?.password).toMatch(/^\$2[aby]\$/);
    });

    it('deve lançar ConflictException para e-mail duplicado', async () => {
      await service.create({
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'senha123',
      });

      await expect(
        service.create({
          name: 'Outro João',
          email: 'joao@example.com',
          password: 'outrasenha',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('findByEmail', () => {
    it('deve retornar o usuário quando o e-mail existe', async () => {
      await service.create({
        name: 'Maria',
        email: 'maria@example.com',
        password: 'senha456',
      });

      const user = await service.findByEmail('maria@example.com');
      expect(user).toBeDefined();
      expect(user?.email).toBe('maria@example.com');
    });

    it('deve retornar undefined quando o e-mail não existe', async () => {
      const user = await service.findByEmail('naoexiste@example.com');
      expect(user).toBeUndefined();
    });
  });

  describe('findById', () => {
    it('deve retornar UserResponseDto quando o ID existe', async () => {
      const created = await service.create({
        name: 'Pedro',
        email: 'pedro@example.com',
        password: 'senha789',
      });

      const found = await service.findById(created.id);
      expect(found.id).toBe(created.id);
      expect(found.name).toBe('Pedro');
    });

    it('deve lançar NotFoundException para ID inexistente', async () => {
      await expect(
        service.findById('id-que-nao-existe'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
