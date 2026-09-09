import { ConflictException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PrismaService } from '../prisma/prisma.service.js';
import { UsersService } from './users.service.js';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makePrismaUser(overrides: Partial<{
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}> = {}) {
  return {
    id: overrides.id ?? 'test-uuid',
    name: overrides.name ?? 'Usuário Teste',
    email: overrides.email ?? 'teste@example.com',
    password: overrides.password ?? '$2a$10$hashedpassword',
    createdAt: overrides.createdAt ?? new Date('2024-01-01'),
  };
}

function makePrismaMock() {
  return {
    user: {
      create: vi.fn(),
      findUnique: vi.fn(),
    },
  };
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('UsersService', () => {
  let service: UsersService;
  let prismaMock: ReturnType<typeof makePrismaMock>;

  beforeEach(() => {
    prismaMock = makePrismaMock();
    service = new UsersService(prismaMock as unknown as PrismaService);
  });

  // ── create ──────────────────────────────────────────────────────────────────

  describe('create', () => {
    it('deve criar um usuário com sucesso e retornar dados sem a senha', async () => {
      const prismaUser = makePrismaUser({
        name: 'João Silva',
        email: 'joao@example.com',
      });
      prismaMock.user.create.mockResolvedValueOnce(prismaUser);

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
      let capturedData: { password: string } | undefined;

      prismaMock.user.create.mockImplementationOnce(
        ({ data }: { data: { password: string } }) => {
          capturedData = data;
          return Promise.resolve(makePrismaUser({ password: data.password }));
        },
      );
      prismaMock.user.findUnique.mockResolvedValueOnce(
        makePrismaUser({ password: capturedData?.password ?? '' }),
      );

      await service.create({
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'senha123',
      });

      // A senha capturada no momento do create não deve ser plain text
      expect(capturedData?.password).not.toBe('senha123');
      expect(capturedData?.password).toMatch(/^\$2[aby]\$/);
    });

    it('deve lançar ConflictException para e-mail duplicado (erro P2002 do Prisma)', async () => {
      const p2002 = new Prisma.PrismaClientKnownRequestError(
        'Unique constraint failed',
        { code: 'P2002', clientVersion: '6.0.0' },
      );
      prismaMock.user.create.mockRejectedValueOnce(p2002);

      await expect(
        service.create({
          name: 'Outro João',
          email: 'joao@example.com',
          password: 'outrasenha',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  // ── findByEmail ─────────────────────────────────────────────────────────────

  describe('findByEmail', () => {
    it('deve retornar o usuário quando o e-mail existe', async () => {
      const prismaUser = makePrismaUser({ email: 'maria@example.com' });
      prismaMock.user.findUnique.mockResolvedValueOnce(prismaUser);

      const user = await service.findByEmail('maria@example.com');
      expect(user).toBeDefined();
      expect(user?.email).toBe('maria@example.com');
    });

    it('deve retornar undefined quando o e-mail não existe', async () => {
      prismaMock.user.findUnique.mockResolvedValueOnce(null);

      const user = await service.findByEmail('naoexiste@example.com');
      expect(user).toBeUndefined();
    });
  });

  // ── findById ────────────────────────────────────────────────────────────────

  describe('findById', () => {
    it('deve retornar UserResponseDto quando o ID existe', async () => {
      const prismaUser = makePrismaUser({ id: 'uuid-123', name: 'Pedro', email: 'pedro@example.com' });
      prismaMock.user.findUnique.mockResolvedValueOnce(prismaUser);

      const found = await service.findById('uuid-123');
      expect(found.id).toBe('uuid-123');
      expect(found.name).toBe('Pedro');
    });

    it('deve lançar NotFoundException para ID inexistente', async () => {
      prismaMock.user.findUnique.mockResolvedValueOnce(null);

      await expect(
        service.findById('id-que-nao-existe'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
