import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  children: ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 disabled:pointer-events-none px-4 py-2';
  
  const variants = {
    primary: 'bg-accent text-white hover:bg-accent/90 shadow-md',
    secondary: 'bg-[var(--social-bg)] text-[var(--text-h)] hover:bg-[var(--border)] border border-[var(--border)] shadow-sm',
    outline: 'border border-[var(--border)] text-[var(--text-h)] hover:bg-[var(--social-bg)]',
    ghost: 'hover:bg-[var(--social-bg)] text-[var(--text-h)]',
    link: 'underline-offset-4 hover:underline text-accent px-0 py-0 h-auto font-normal',
  };

  const variantStyles = variants[variant] || variants.primary;

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </button>
  );
}
