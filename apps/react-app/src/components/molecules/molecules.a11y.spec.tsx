/**
 * Testes de Acessibilidade - Molecules
 *
 * Garante conformidade com WCAG 2.1 Nível AA para as moléculas:
 * Divider, FormField e SocialButton.
 */
import { describe, it, expect } from 'vitest';

import { renderAndRunAxe } from '../../test/a11y-utils';
import { Divider } from './Divider';
import { FormField } from './FormField';
import { SocialButton } from './SocialButton';

describe('A11y - Divider', () => {
  it('deve estar em conformidade com WCAG AA sem texto (separador simples)', async () => {
    const results = await renderAndRunAxe(<Divider />);
    expect(results).toHaveNoViolations();
  });

  it('deve estar em conformidade com WCAG AA com texto separador', async () => {
    const results = await renderAndRunAxe(
      <Divider>ou entre com outras contas</Divider>
    );
    expect(results).toHaveNoViolations();
  });
});

describe('A11y - FormField', () => {
  it('deve estar em conformidade com WCAG AA no estado padrão (label + input associados)', async () => {
    const results = await renderAndRunAxe(
      <FormField id="a11y-form-email" label="Email" type="email" placeholder="usuario@email.com" />
    );
    expect(results).toHaveNoViolations();
  });

  it('deve estar em conformidade com WCAG AA no estado de erro com mensagem descritiva', async () => {
    const results = await renderAndRunAxe(
      <FormField
        id="a11y-form-password"
        label="Senha"
        type="password"
        errorText="A senha deve ter no mínimo 8 caracteres"
      />
    );
    expect(results).toHaveNoViolations();
  });

  it('deve estar em conformidade com WCAG AA no estado required', async () => {
    const results = await renderAndRunAxe(
      <FormField id="a11y-form-name" label="Nome completo" type="text" required />
    );
    expect(results).toHaveNoViolations();
  });
});

describe('A11y - SocialButton', () => {
  it('deve estar em conformidade com WCAG AA para o provedor GitHub', async () => {
    const results = await renderAndRunAxe(
      <SocialButton provider="github">Github</SocialButton>
    );
    expect(results).toHaveNoViolations();
  });

  it('deve estar em conformidade com WCAG AA para o provedor Google', async () => {
    const results = await renderAndRunAxe(
      <SocialButton provider="google">Gmail</SocialButton>
    );
    expect(results).toHaveNoViolations();
  });
});
