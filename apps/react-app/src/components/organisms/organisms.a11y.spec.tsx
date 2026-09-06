/**
 * Testes de Acessibilidade - Organisms
 *
 * Garante conformidade com WCAG 2.1 Nível AA para os organismos:
 * AuthBanner, LoginForm e RegisterForm.
 *
 * Nota: AuthBanner usa uma imagem — o axe verifica se o atributo `alt`
 * está presente e adequado (critério WCAG 1.1.1 - Conteúdo não textual).
 */
import { describe, it, expect } from 'vitest';

import { renderAndRunAxe } from '../../test/a11y-utils';
import { AuthBanner } from './AuthBanner';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

describe('A11y - AuthBanner', () => {
  it('deve estar em conformidade com WCAG AA com alt text descritivo', async () => {
    const results = await renderAndRunAxe(
      <AuthBanner src="/Group 2087.png" alt="Code Connect — Banner de autenticação com ilustração de código" />
    );
    expect(results).toHaveNoViolations();
  });

  it('deve estar em conformidade com WCAG AA com alt text customizado (cadastro)', async () => {
    const results = await renderAndRunAxe(
      <AuthBanner src="/cadastro-banner.png" alt="Code Connect — Banner de cadastro" />
    );
    expect(results).toHaveNoViolations();
  });
});

describe('A11y - LoginForm', () => {
  it('deve estar em conformidade com WCAG AA no estado padrão', async () => {
    const results = await renderAndRunAxe(<LoginForm />);
    expect(results).toHaveNoViolations();
  });

  it('deve estar em conformidade com WCAG AA com callback de navegação', async () => {
    const results = await renderAndRunAxe(
      <LoginForm onNavigateToRegister={() => {}} />
    );
    expect(results).toHaveNoViolations();
  });
});

describe('A11y - RegisterForm', () => {
  it('deve estar em conformidade com WCAG AA no estado padrão', async () => {
    const results = await renderAndRunAxe(<RegisterForm />);
    expect(results).toHaveNoViolations();
  });

  it('deve estar em conformidade com WCAG AA com callback de navegação', async () => {
    const results = await renderAndRunAxe(
      <RegisterForm onNavigateToLogin={() => {}} />
    );
    expect(results).toHaveNoViolations();
  });
});
