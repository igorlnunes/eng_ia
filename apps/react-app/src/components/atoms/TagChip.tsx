
export interface TagChipProps {
  name: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function TagChip({
  name,
  active = false,
  onClick,
  className = '',
}: TagChipProps) {
  const isClickable = Boolean(onClick);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!isClickable}
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors border ${
        active
          ? 'bg-brand-green text-black border-brand-green font-semibold shadow-sm shadow-brand-green/20'
          : 'bg-[#181d20] text-gray-300 border-brand-border hover:border-brand-green/50 hover:text-white'
      } ${
        isClickable ? 'cursor-pointer' : 'cursor-default'
      } ${className}`}
    >
      #{name.toLowerCase()}
    </button>
  );
}
