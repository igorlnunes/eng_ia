import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const avatarVariants = cva(
  'rounded-full shrink-0 border border-brand-border',
  {
    variants: {
      size: {
        sm: 'w-7 h-7 text-xs',
        md: 'w-9 h-9 text-sm',
        lg: 'w-12 h-12 text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const avatarFallbackVariants = cva(
  'flex items-center justify-center font-semibold bg-[#253342] text-brand-green'
);

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  src?: string | null;
  name: string;
  className?: string;
}

export function Avatar({
  src,
  name,
  size = 'md',
  className,
}: AvatarProps) {
  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(' ').filter(Boolean);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  if (src) {
    return (
      <img
        src={src}
        alt={`Avatar de ${name}`}
        className={cn(avatarVariants({ size }), 'object-cover', className)}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`Avatar de ${name}`}
      className={cn(avatarVariants({ size }), avatarFallbackVariants(), className)}
    >
      {getInitials(name)}
    </div>
  );
}
