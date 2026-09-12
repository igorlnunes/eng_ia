import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { AppLayout } from '../components/templates/AppLayout';
import { FeedFilters } from '../components/organisms/FeedFilters';
import { PostCard } from '../components/organisms/PostCard';
import {
  type Post,
  type Tag,
  postsService,
} from '../services/posts.service';

export function FeedPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSearch = searchParams.get('search') || '';
  const currentTag = searchParams.get('tag') || undefined;
  const currentSort = (searchParams.get('sort') as 'recent' | 'popular') || 'recent';

  const [posts, setPosts] = useState<Post[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Load tags once
  useEffect(() => {
    let isMounted = true;
    postsService
      .getTags()
      .then((data) => {
        if (isMounted) setTags(data);
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch posts when search/tag/sort changes
  useEffect(() => {
    let isMounted = true;
    postsService
      .getPosts({
        search: currentSearch || undefined,
        tag: currentTag || undefined,
        sort: currentSort,
      })
      .then((data) => {
        if (isMounted) {
          setPosts(data);
          setError(null);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('Não foi possível carregar as publicações.');
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [currentSearch, currentTag, currentSort, retryCount]);

  const updateParam = (key: string, value?: string) => {
    setSearchParams((prev) => {
      const updated = new URLSearchParams(prev);
      if (value) {
        updated.set(key, value);
      } else {
        updated.delete(key);
      }
      return updated;
    });
  };

  const handleSearch = (term: string) => {
    updateParam('search', term.trim() || undefined);
  };

  const handleSelectTag = (tag?: string) => {
    updateParam('tag', tag);
  };

  const handleSelectSort = (sort: 'recent' | 'popular') => {
    updateParam('sort', sort === 'recent' ? undefined : sort);
  };

  const handlePostCreated = (newPost: Post) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <AppLayout
      searchValue={currentSearch}
      onSearch={handleSearch}
      onPostCreated={handlePostCreated}
    >
      <div className="flex flex-col gap-6">
        {/* Filter chips & Sort Tabs */}
        <FeedFilters
          tags={tags}
          selectedTag={currentTag}
          onSelectTag={handleSelectTag}
          selectedSort={currentSort}
          onSelectSort={handleSelectSort}
        />

        {/* Loading state */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-80 rounded-2xl bg-brand-card/50 border border-brand-border/40"
              />
            ))}
          </div>
        )}

        {/* Error state */}
        {!isLoading && error && (
          <div className="p-8 rounded-2xl bg-brand-card border border-red-500/30 text-center flex flex-col items-center gap-3">
            <p className="text-red-400 font-medium">{error}</p>
            <button
              type="button"
              onClick={() => setRetryCount((c) => c + 1)}
              className="px-4 py-2 rounded-lg bg-brand-card hover:bg-white/5 border border-brand-border text-sm text-gray-200 cursor-pointer"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && posts.length === 0 && (
          <div className="py-16 px-4 rounded-2xl bg-brand-card/40 border border-brand-border text-center flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand-card border border-brand-border flex items-center justify-center text-gray-400">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-white">
              Nenhuma publicação encontrada
            </h3>
            <p className="text-sm text-gray-400 max-w-sm">
              Tente buscar por outros termos ou remover filtros aplicados.
            </p>
          </div>
        )}

        {/* Posts Grid (2 columns on desktop) */}
        {!isLoading && !error && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onTagClick={handleSelectTag}
              />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
