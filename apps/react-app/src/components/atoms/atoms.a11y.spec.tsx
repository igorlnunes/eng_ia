/**
 * Testes de Acessibilidade - Atoms
 *
 * Garante conformidade com WCAG 2.1 Nível AA para os componentes atômicos.
 * Cada teste renderiza o componente em seus estados mais relevantes e executa
 * a análise estática do axe-core.
 */
import { describe, it, expect } from 'vitest';
import { renderAndRunAxe } from '../../test/a11y-utils';
import { Button } from './Button';
import { Checkbox } from './Checkbox';
import { Input } from './Input';
import { Label } from './Label';
import { Typography } from './Typography';

describe('A11y - Button', () => {
  it('deve estar em conformidade com WCAG AA no estado padrão (primary)', async () => {
    const results = await renderAndRunAxe(
      <Button type="button">Entrar</Button>
    );
    expect(results).toHaveNoViolations();
  });

  it('deve estar em conformidade com WCAG AA no estado desabilitado', async () => {
    const results = await renderAndRunAxe(
      <Button type="button" disabled>Entrar</Button>
    );
    expect(results).toHaveNoViolations();
  });

  it('deve estar em conformidade com WCAG AA na variante outline', async () => {
    const results = await renderAndRunAxe(
      <Button type="button" variant="outline">Cancelar</Button>
    );
    expect(results).toHaveNoViolations();
  });

  it('deve estar em conformidade com WCAG AA na variante link', async () => {
    const results = await renderAndRunAxe(
      <Button type="button" variant="link">Esqueci a senha</Button>
    );
    expect(results).toHaveNoViolations();
  });
});

describe('A11y - Checkbox', () => {
  it('deve estar em conformidade com WCAG AA no estado desmarcado', async () => {
    const results = await renderAndRunAxe(
      <Checkbox id="a11y-check-unchecked" label="Lembrar-me" />
    );
    expect(results).toHaveNoViolations();
  });

  it('deve estar em conformidade com WCAG AA no estado marcado', async () => {
    const results = await renderAndRunAxe(
      <Checkbox id="a11y-check-checked" label="Aceito os termos" defaultChecked />
    );
    expect(results).toHaveNoViolations();
  });
});

describe('A11y - Input', () => {
  it('deve estar em conformidade com WCAG AA quando associado a um label via aria-label', async () => {
    // O Input sozinho precisa de um label associado para ser acessível.
    // Aqui usamos aria-label como alternativa (o uso correto é via FormField).
    const results = await renderAndRunAxe(
      <Input aria-label="Email do usuário" placeholder="usuario@email.com" />
    );
    expect(results).toHaveNoViolations();
  });

  it('deve estar em conformidade com WCAG AA no estado de erro com aria-describedby', async () => {
    const results = await renderAndRunAxe(
      <div>
        <Input
          id="input-error"
          aria-label="Senha"
          aria-describedby="input-error-msg"
          error
        />
        <p id="input-error-msg" role="alert">Senha inválida</p>
      </div>
    );
    expect(results).toHaveNoViolations();
  });

  it('deve estar em conformidade com WCAG AA no estado desabilitado', async () => {
    const results = await renderAndRunAxe(
      <Input aria-label="Campo desabilitado" disabled />
    );
    expect(results).toHaveNoViolations();
  });
});

describe('A11y - Label', () => {
  it('deve estar em conformidade com WCAG AA quando associado a um input', async () => {
    const results = await renderAndRunAxe(
      <div>
        <Label htmlFor="a11y-label-input">Nome completo</Label>
        <input id="a11y-label-input" type="text" />
      </div>
    );
    expect(results).toHaveNoViolations();
  });
});

describe('A11y - Typography', () => {
  it('deve estar em conformidade com WCAG AA como parágrafo', async () => {
    const results = await renderAndRunAxe(
      <Typography variant="p">Texto descritivo da aplicação.</Typography>
    );
    expect(results).toHaveNoViolations();
  });

  it('deve estar em conformidade com WCAG AA como h1 (heading de página)', async () => {
    const results = await renderAndRunAxe(
      <Typography variant="h1">Título da Página</Typography>
    );
    expect(results).toHaveNoViolations();
  });

  it('deve estar em conformidade com WCAG AA como h2', async () => {
    const results = await renderAndRunAxe(
      <Typography variant="h2">Seção Importante</Typography>
    );
    expect(results).toHaveNoViolations();
  });
});
