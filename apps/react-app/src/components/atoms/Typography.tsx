import { type HTMLAttributes, type ReactNode } from 'react';

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'small';
  children: ReactNode;
}

export function Typography({ variant = 'p', children, className = '', ...props }: TypographyProps) {
  const Component = variant;

  const baseStyles = '';
  
  const variants = {
    h1: 'text-2xl md:text-3xl font-semibold text-white tracking-tight text-left',
    h2: 'text-xl font-medium text-white mb-2 text-left',
    h3: 'text-lg font-medium text-white mb-2 text-left',
    p: 'text-sm text-gray-300 leading-relaxed text-left',
    span: 'text-sm text-gray-300',
    small: 'text-xs text-gray-400',
  };

  const variantStyles = variants[variant];

  return (
    <Component className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </Component>
  );
}

