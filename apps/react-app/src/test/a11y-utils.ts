import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import type { AxeResults } from 'axe-core';
import type { ReactElement } from 'react';

/**
 * Opções do axe pré-configuradas para WCAG 2.1 Nível AA.
 * Inclui todas as regras de nível A e AA do WCAG 2.0 e 2.1.
 */
export const wcagAAOptions = {
  runOnly: {
    type: 'tag' as const,
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
  },
};

/**
 * Renderiza um componente e executa o axe com WCAG 2.1 AA.
 * Retorna os resultados do axe para assertivas com expect(results).toHaveNoViolations().
 */
export async function renderAndRunAxe(ui: ReactElement): Promise<AxeResults> {
  const { container } = render(ui);
  return await axe(container, wcagAAOptions) as AxeResults;
}
