import { type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-2xl md:text-3xl font-semibold text-white tracking-tight text-left',
      h2: 'text-xl font-medium text-white mb-2 text-left',
      h3: 'text-lg font-medium text-white mb-2 text-left',
      p: 'text-sm text-gray-300 leading-relaxed text-left',
      span: 'text-sm text-gray-300',
      small: 'text-xs text-gray-400',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
});

export interface TypographyProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  children: ReactNode;
}

export function Typography({
  variant = 'p',
  children,
  className,
  ...props
}: TypographyProps) {
  const Component = variant || 'p';

  return (
    <Component
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
