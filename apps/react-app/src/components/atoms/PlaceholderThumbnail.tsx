import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const placeholderThumbnailVariants = cva(
  'relative w-full h-full min-h-48 overflow-hidden rounded-xl flex flex-col items-center justify-center bg-gradient-to-br from-[#182026] via-[#101418] to-[#0a0d10] border border-brand-border p-6 select-none'
);

export interface PlaceholderThumbnailProps
  extends VariantProps<typeof placeholderThumbnailVariants> {
  title?: string;
  className?: string;
}

export function PlaceholderThumbnail({
  title = 'CodeConnect Post',
  className,
}: PlaceholderThumbnailProps) {
  return (
    <div
      role="img"
      aria-label={`Placeholder para: ${title}`}
      className={cn(placeholderThumbnailVariants(), className)}
    >
      {/* Decorative background grid elements */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#59f588_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative z-10 flex flex-col items-center text-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-[#253342]/50 border border-brand-green/30 flex items-center justify-center shadow-lg shadow-black/40">
          <svg
            className="w-7 h-7 text-brand-green"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        </div>

        <div className="max-w-[260px]">
          <span className="text-xs font-mono font-medium uppercase tracking-wider text-brand-green/90 block mb-1">
            Projeto CodeConnect
          </span>
          <span className="text-sm font-medium text-gray-300 line-clamp-2">
            {title}
          </span>
        </div>
      </div>
    </div>
  );
}
