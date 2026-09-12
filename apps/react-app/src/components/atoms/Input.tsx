import { forwardRef, type InputHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const inputVariants = cva(
  'flex h-10 w-full rounded-md border-0 bg-brand-input px-3 py-2 text-sm text-black placeholder:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green disabled:cursor-not-allowed disabled:opacity-50 transition-colors font-medium',
  {
    variants: {
      error: {
        true: 'border-red-500 ring-2 ring-red-500',
        false: '',
      },
    },
    defaultVariants: {
      error: false,
    },
  }
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        className={cn(inputVariants({ error }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';
