import { type Tag } from '../../services/posts.service';
import { TagChip } from '../atoms/TagChip';

export interface FeedFiltersProps {
  tags: Tag[];
  selectedTag?: string;
  onSelectTag: (tag?: string) => void;
  selectedSort: 'recent' | 'popular';
  onSelectSort: (sort: 'recent' | 'popular') => void;
  className?: string;
}

export function FeedFilters({
  tags,
  selectedTag,
  onSelectTag,
  selectedSort,
  onSelectSort,
  className = '',
}: FeedFiltersProps) {
  return (
    <div
      className={`flex flex-col md:flex-row md:items-center justify-between gap-4 py-2 ${className}`}
    >
      {/* Tag filter pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
        <TagChip
          name="Todos"
          active={!selectedTag}
          onClick={() => onSelectTag(undefined)}
        />
        {tags.map((tag) => (
          <TagChip
            key={tag.id}
            name={tag.name}
            active={selectedTag?.toLowerCase() === tag.name.toLowerCase()}
            onClick={() =>
              onSelectTag(
                selectedTag?.toLowerCase() === tag.name.toLowerCase()
                  ? undefined
                  : tag.name,
              )
            }
          />
        ))}
      </div>

      {/* Sort tabs */}
      <div
        role="tablist"
        aria-label="Ordenação do feed"
        className="flex items-center gap-1 bg-[#14181b] p-1 rounded-xl border border-brand-border shrink-0 self-start md:self-auto"
      >
        <button
          type="button"
          role="tab"
          aria-selected={selectedSort === 'recent'}
          onClick={() => onSelectSort('recent')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            selectedSort === 'recent'
              ? 'bg-brand-card text-brand-green font-semibold shadow-sm'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Recentes
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={selectedSort === 'popular'}
          onClick={() => onSelectSort('popular')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            selectedSort === 'popular'
              ? 'bg-brand-card text-brand-green font-semibold shadow-sm'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Populares
        </button>
      </div>
    </div>
  );
}
