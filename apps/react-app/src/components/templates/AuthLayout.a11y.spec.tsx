/**
 * Testes de Acessibilidade - Template: AuthLayout
 *
 * Garante conformidade com WCAG 2.1 Nível AA para o template de autenticação.
 * Testa o layout com conteúdo de banner e formulário simulados.
 */
import { describe, it, expect } from 'vitest';

import { renderAndRunAxe } from '../../test/a11y-utils';
import { AuthLayout } from './AuthLayout';

describe('A11y - AuthLayout', () => {
  it('deve estar em conformidade com WCAG AA com banner e conteúdo de formulário', async () => {
    const results = await renderAndRunAxe(
      <AuthLayout
        banner={
          <img
            src="/Group 2087.png"
            alt="Code Connect — Banner de autenticação"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        }
      >
        <main aria-label="Formulário de autenticação">
          <h1>Login</h1>
          <form>
            <label htmlFor="auth-layout-email">Email</label>
            <input id="auth-layout-email" type="email" />
            <button type="submit">Entrar</button>
          </form>
        </main>
      </AuthLayout>
    );
    expect(results).toHaveNoViolations();
  });

  it('deve estar em conformidade com WCAG AA com conteúdo de cadastro', async () => {
    const results = await renderAndRunAxe(
      <AuthLayout
        banner={
          <img
            src="/cadastro-banner.png"
            alt="Code Connect — Banner de cadastro"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        }
      >
        <main aria-label="Formulário de cadastro">
          <h1>Cadastro</h1>
          <form>
            <label htmlFor="auth-layout-register-email">Email</label>
            <input id="auth-layout-register-email" type="email" />
            <button type="submit">Cadastrar</button>
          </form>
        </main>
      </AuthLayout>
    );
    expect(results).toHaveNoViolations();
  });
});
