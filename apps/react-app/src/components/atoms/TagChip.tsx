import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const tagChipVariants = cva(
  'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors border',
  {
    variants: {
      active: {
        true: 'bg-brand-green text-black border-brand-green font-semibold shadow-sm shadow-brand-green/20',
        false: 'bg-[#181d20] text-gray-300 border-brand-border hover:border-brand-green/50 hover:text-white',
      },
      interactive: {
        true: 'cursor-pointer',
        false: 'cursor-default',
      },
    },
    defaultVariants: {
      active: false,
      interactive: false,
    },
  }
);

export interface TagChipProps
  extends Omit<VariantProps<typeof tagChipVariants>, 'active' | 'interactive'> {
  name: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function TagChip({
  name,
  active = false,
  onClick,
  className,
}: TagChipProps) {
  const isClickable = Boolean(onClick);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!isClickable}
      className={cn(tagChipVariants({ active, interactive: isClickable }), className)}
    >
      #{name.toLowerCase()}
    </button>
  );
}
