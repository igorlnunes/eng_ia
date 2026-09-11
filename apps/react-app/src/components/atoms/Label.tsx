import type { LabelHTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const labelVariants = cva(
  'block text-xs font-normal text-gray-200 mb-1 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

export interface LabelProps
  extends LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  children: ReactNode;
}

export function Label({ children, className, ...props }: LabelProps) {
  return (
    <label className={cn(labelVariants(), className)} {...props}>
      {children}
    </label>
  );
}
