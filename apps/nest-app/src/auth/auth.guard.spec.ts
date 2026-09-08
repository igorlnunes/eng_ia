import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { beforeEach, describe, expect, it } from 'vitest';
import { AuthGuard } from './auth.guard.js';

function createMockContext(authHeader?: string): ExecutionContext {
  const mockRequest = {
    headers: { authorization: authHeader },
  };

  return {
    switchToHttp: () => ({
      getRequest: () => mockRequest,
    }),
  } as unknown as ExecutionContext;
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = new JwtService({ secret: 'test-secret' });
    guard = new AuthGuard(jwtService);
  });

  it('deve permitir acesso com token JWT válido', async () => {
    const token = await jwtService.signAsync(
      { sub: 'user-id-123', email: 'joao@example.com' },
      { secret: 'test-secret' },
    );

    const context = createMockContext(`Bearer ${token}`);
    const result = await guard.canActivate(context);

    expect(result).toBe(true);
    // O payload deve ter sido injetado na request
    const request = context.switchToHttp().getRequest<{ user: unknown }>();
    expect((request.user as { sub: string }).sub).toBe('user-id-123');
  });

  it('deve lançar UnauthorizedException sem token', async () => {
    const context = createMockContext(undefined);
    await expect(guard.canActivate(context)).rejects.toThrow(UnauthorizedException);
  });

  it('deve lançar UnauthorizedException com schema diferente de Bearer', async () => {
    const context = createMockContext('Basic dXNlcjpwYXNz');
    await expect(guard.canActivate(context)).rejects.toThrow(UnauthorizedException);
  });

  it('deve lançar UnauthorizedException com token inválido/expirado', async () => {
    const context = createMockContext('Bearer token-invalido');
    await expect(guard.canActivate(context)).rejects.toThrow(UnauthorizedException);
  });
});
