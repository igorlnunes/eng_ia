import { Avatar } from '../atoms/Avatar';

export interface PostCardMetaProps {
  authorName: string;
  authorAvatar?: string | null;
  date?: string;
  className?: string;
}

export function PostCardMeta({
  authorName,
  authorAvatar,
  date,
  className = '',
}: PostCardMetaProps) {
  const formattedDate = date
    ? new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(new Date(date))
    : undefined;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Avatar name={authorName} src={authorAvatar} size="sm" />
      <div className="flex flex-col min-w-0">
        <span className="text-xs font-semibold text-gray-200 truncate">
          {authorName}
        </span>
        {formattedDate && (
          <span className="text-[11px] text-gray-400">
            {formattedDate}
          </span>
        )}
      </div>
    </div>
  );
}
