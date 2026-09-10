import { type ReactNode, type MouseEvent } from 'react';

export interface IconButtonProps {
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
  className = '',
}: IconButtonProps) {
  return (
    <button
      type="button"
      title={title}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
        disabled
          ? 'opacity-50 cursor-not-allowed text-gray-500'
          : 'cursor-pointer hover:bg-white/5 active:scale-95'
      } ${
        active
          ? 'text-brand-green font-semibold'
          : 'text-gray-400 hover:text-gray-200'
      } ${className}`}
    >
      <span className="w-4 h-4 flex items-center justify-center shrink-0">
        {icon}
      </span>
      {count !== undefined && <span>{count}</span>}
    </button>
  );
}
