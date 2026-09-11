import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const dividerVariants = cva('w-full border-t border-gray-700 my-5');

const dividerWrapperVariants = cva(
  'relative my-5 flex items-center justify-center'
);

const dividerTextVariants = cva(
  'bg-brand-card px-2 text-gray-300 font-normal'
);

export interface DividerProps extends VariantProps<typeof dividerVariants> {
  children?: ReactNode;
  className?: string;
}

export function Divider({ children, className }: DividerProps) {
  if (!children) {
    return <hr className={cn(dividerVariants(), className)} />;
  }

  return (
    <div className={cn(dividerWrapperVariants(), className)}>
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-gray-700/60" />
      </div>
      <div className="relative flex justify-center text-xs">
        <span className={cn(dividerTextVariants())}>
          {children}
        </span>
      </div>
    </div>
  );
}
