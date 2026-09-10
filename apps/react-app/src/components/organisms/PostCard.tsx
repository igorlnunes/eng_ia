import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../contexts';
import { type Post, postsService } from '../../services/posts.service';
import { IconButton } from '../atoms/IconButton';
import { PlaceholderThumbnail } from '../atoms/PlaceholderThumbnail';
import { TagChip } from '../atoms/TagChip';
import { PostCardMeta } from '../molecules/PostCardMeta';

export interface PostCardProps {
  post: Post;
  onTagClick?: (tag: string) => void;
  className?: string;
}

export function PostCard({ post, onTagClick, className = '' }: PostCardProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [isLiking, setIsLiking] = useState(false);

  const hasValidImage = Boolean(post.imageUrl && !imageError);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (isLiking) return;
    setIsLiking(true);

    // Optimistic update
    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    setLikesCount((prev) => (nextLiked ? prev + 1 : Math.max(0, prev - 1)));

    try {
      const res = await postsService.toggleLike(post.id);
      setIsLiked(res.liked);
      setLikesCount(res.likesCount);
    } catch {
      // Rollback on error
      setIsLiked(!nextLiked);
      setLikesCount((prev) => (!nextLiked ? prev + 1 : Math.max(0, prev - 1)));
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <article
      data-testid={`post-card-${post.id}`}
      className={`group flex flex-col rounded-2xl bg-brand-card border border-brand-border overflow-hidden hover:border-brand-border/80 transition-all hover:shadow-xl hover:shadow-black/20 ${className}`}
    >
      {/* Thumbnail */}
      <Link
        to={`/posts/${post.id}`}
        className="relative aspect-video w-full overflow-hidden bg-[#0d1217] block"
      >
        {hasValidImage ? (
          <img
            src={post.imageUrl!}
            alt={post.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
          />
        ) : (
          <PlaceholderThumbnail title={post.title} />
        )}
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="flex flex-col gap-2.5">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <TagChip
                  key={tag.id}
                  name={tag.name}
                  onClick={onTagClick ? () => onTagClick(tag.name) : undefined}
                />
              ))}
            </div>
          )}

          {/* Title */}
          <h2 className="text-lg font-bold text-white group-hover:text-brand-green transition-colors line-clamp-2 leading-snug">
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </h2>

          {/* Description */}
          <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">
            {post.description}
          </p>
        </div>

        {/* Footer info and actions */}
        <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between gap-2">
          {/* Action buttons */}
          <div className="flex items-center gap-1">
            {/* Code indicator */}
            {post.codeSnippet && (
              <IconButton
                ariaLabel="Ver código"
                title="Possui código"
                icon={
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                }
              />
            )}

            {/* Shares */}
            <IconButton
              ariaLabel="Compartilhamentos"
              title="Compartilhar"
              count={post.sharesCount}
              icon={
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              }
            />

            {/* Comments */}
            <IconButton
              ariaLabel="Comentários"
              title="Ver comentários"
              count={post.commentsCount}
              onClick={() => navigate(`/posts/${post.id}`)}
              icon={
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              }
            />

            {/* Likes */}
            <IconButton
              ariaLabel={isLiked ? 'Descurtir post' : 'Curtir post'}
              title={
                isAuthenticated
                  ? isLiked
                    ? 'Descurtir'
                    : 'Curtir'
                  : 'Faça login para curtir'
              }
              active={isLiked}
              count={likesCount}
              onClick={handleLike}
              icon={
                <svg
                  fill={isLiked ? 'currentColor' : 'none'}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="w-4 h-4 text-brand-green"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              }
            />
          </div>

          {/* Author */}
          <PostCardMeta authorName={post.author.name} />
        </div>
      </div>
    </article>
  );
}
