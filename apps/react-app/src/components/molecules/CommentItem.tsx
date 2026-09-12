import { Avatar } from '../atoms/Avatar';

export interface CommentItemProps {
  authorName: string;
  authorAvatar?: string | null;
  content: string;
  createdAt: string;
  className?: string;
}

export function CommentItem({
  authorName,
  authorAvatar,
  content,
  createdAt,
  className = '',
}: CommentItemProps) {
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(createdAt));

  return (
    <article
      className={`p-4 rounded-xl bg-[#14181b] border border-brand-border/60 flex items-start gap-3.5 ${className}`}
    >
      <Avatar name={authorName} src={authorAvatar} size="md" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-sm font-semibold text-gray-200 truncate">
            {authorName}
          </span>
          <time
            dateTime={createdAt}
            className="text-xs text-gray-400 shrink-0"
          >
            {formattedDate}
          </time>
        </div>
        <p className="text-sm text-gray-300 whitespace-pre-line break-words leading-relaxed">
          {content}
        </p>
      </div>
    </article>
  );
}
