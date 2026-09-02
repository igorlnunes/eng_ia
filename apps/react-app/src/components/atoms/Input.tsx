import { forwardRef, type InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, ...props }, ref) => {
    return (
      <input
        className={`flex h-10 w-full rounded-md border-0 bg-[#87888C] px-3 py-2 text-sm text-black placeholder:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#59F588] disabled:cursor-not-allowed disabled:opacity-50 transition-colors font-medium ${
          error ? 'border-red-500 ring-2 ring-red-500' : ''
        } ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';


