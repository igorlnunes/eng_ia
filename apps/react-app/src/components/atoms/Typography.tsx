import { type HTMLAttributes, type ReactNode } from 'react';

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'small';
  children: ReactNode;
}

export function Typography({ variant = 'p', children, className = '', ...props }: TypographyProps) {
  const Component = variant;

  const baseStyles = 'text-[var(--text)]';
  
  const variants = {
    h1: 'text-4xl md:text-5xl font-semibold text-[var(--text-h)] mb-6 tracking-tight',
    h2: 'text-2xl md:text-3xl font-medium text-[var(--text-h)] mb-4',
    h3: 'text-xl font-medium text-[var(--text-h)] mb-3',
    p: 'text-base leading-relaxed',
    span: '',
    small: 'text-sm',
  };

  const variantStyles = variants[variant];

  return (
    <Component className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </Component>
  );
}
