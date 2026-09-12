import { type ReactNode, type MouseEvent } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const iconButtonVariants = cva(
  'inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all',
  {
    variants: {
      active: {
        true: 'text-brand-green font-semibold',
        false: 'text-gray-400 hover:text-gray-200',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed text-gray-500',
        false: 'cursor-pointer hover:bg-white/5 active:scale-95',
      },
    },
    defaultVariants: {
      active: false,
      disabled: false,
    },
  }
);

export interface IconButtonProps
  extends Omit<VariantProps<typeof iconButtonVariants>, 'active' | 'disabled'> {
  icon: ReactNode;
  count?: number | string;
  active?: boolean;
  disabled?: boolean;
  title?: string;
  ariaLabel: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export function IconButton({
  icon,
  count,
  active = false,
  disabled = false,
  title,
  ariaLabel,
  onClick,
  className,
}: IconButtonProps) {
  return (
    <button
      type="button"
      title={title}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={cn(iconButtonVariants({ active, disabled }), className)}
    >
      <span className="w-4 h-4 flex items-center justify-center shrink-0">
        {icon}
      </span>
      {count !== undefined && <span>{count}</span>}
    </button>
  );
}
