/**
 * Testes de Acessibilidade - Pages
 *
 * Garante conformidade com WCAG 2.1 Nível AA para as páginas completas:
 * LoginPage e RegisterPage.
 *
 * Estes testes são os mais abrangentes, pois verificam a árvore de
 * componentes completa (template + organisms + molecules + atoms).
 */
import { describe, it, expect } from 'vitest';

import { renderAndRunAxe } from '../test/a11y-utils';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';

describe('A11y - LoginPage (integração completa)', () => {
  it('deve estar em conformidade com WCAG AA no estado inicial', async () => {
    const results = await renderAndRunAxe(<LoginPage />);
    expect(results).toHaveNoViolations();
  });

  it('deve estar em conformidade com WCAG AA com callback de navegação para cadastro', async () => {
    const results = await renderAndRunAxe(
      <LoginPage onNavigateToRegister={() => {}} />
    );
    expect(results).toHaveNoViolations();
  });
});

describe('A11y - RegisterPage (integração completa)', () => {
  it('deve estar em conformidade com WCAG AA no estado inicial', async () => {
    const results = await renderAndRunAxe(<RegisterPage />);
    expect(results).toHaveNoViolations();
  });

  it('deve estar em conformidade com WCAG AA com callback de navegação para login', async () => {
    const results = await renderAndRunAxe(
      <RegisterPage onNavigateToLogin={() => {}} />
    );
    expect(results).toHaveNoViolations();
  });
});
