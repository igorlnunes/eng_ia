import '@testing-library/jest-dom';
import { expect } from 'vitest';
import { toHaveNoViolations } from 'vitest-axe/matchers';

// Registra o matcher toHaveNoViolations no expect do vitest
expect.extend({ toHaveNoViolations });
