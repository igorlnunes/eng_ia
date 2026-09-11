import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-brand-green text-black font-bold hover:bg-brand-green-hover shadow-sm',
        secondary: 'bg-transparent text-gray-200 hover:text-white hover:bg-white/5 border-0',
        outline: 'border border-gray-700 text-gray-200 hover:bg-white/5',
        ghost: 'hover:bg-white/5 text-gray-200',
        link: 'underline-offset-4 hover:underline text-brand-green px-0 py-0 h-auto font-medium bg-transparent border-0',
      },
      size: {
        default: 'px-4 py-2 text-sm',
        sm: 'px-3 py-1 text-xs',
        lg: 'px-6 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

export function Button({
  variant,
  size,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </button>
  );
}
