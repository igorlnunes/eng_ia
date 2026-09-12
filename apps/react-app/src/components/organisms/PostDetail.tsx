import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../contexts';
import {
  type Post,
  type PostComment,
  postsService,
} from '../../services/posts.service';
import { Button } from '../atoms/Button';
import { IconButton } from '../atoms/IconButton';
import { PlaceholderThumbnail } from '../atoms/PlaceholderThumbnail';
import { TagChip } from '../atoms/TagChip';
import { CommentItem } from '../molecules/CommentItem';
import { PostCardMeta } from '../molecules/PostCardMeta';

export interface PostDetailProps {
  post: Post;
  className?: string;
}

export function PostDetail({ post, className = '' }: PostDetailProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [comments, setComments] = useState<PostComment[]>(
    post.comments ?? [],
  );
  const [commentContent, setCommentContent] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [isLiking, setIsLiking] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const hasValidImage = Boolean(post.imageUrl && !imageError);

  const handleLike = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (isLiking) return;
    setIsLiking(true);

    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    setLikesCount((prev) => (nextLiked ? prev + 1 : Math.max(0, prev - 1)));

    try {
      const res = await postsService.toggleLike(post.id);
      setIsLiked(res.liked);
      setLikesCount(res.likesCount);
    } catch {
      setIsLiked(!nextLiked);
      setLikesCount((prev) => (!nextLiked ? prev + 1 : Math.max(0, prev - 1)));
    } finally {
      setIsLiking(false);
    }
  };

  const handleAddComment = async (e: FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim() || isSubmittingComment) return;

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setIsSubmittingComment(true);
    try {
      const newComment = await postsService.addComment(
        post.id,
        commentContent.trim(),
      );
      setComments((prev) => [newComment, ...prev]);
      setCommentContent('');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleCopyCode = async () => {
    if (!post.codeSnippet) return;
    try {
      await navigator.clipboard.writeText(post.codeSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      // ignore clipboard error
    }
  };

  return (
    <div className={`flex flex-col gap-6 max-w-4xl mx-auto ${className}`}>
      {/* Back to Feed button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-brand-green transition-colors self-start"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span>Voltar ao feed</span>
      </Link>

      {/* Main card */}
      <article className="rounded-2xl bg-brand-card border border-brand-border overflow-hidden">
        {/* Cover / Thumbnail */}
        <div className="relative aspect-video w-full overflow-hidden bg-[#0d1217]">
          {hasValidImage ? (
            <img
              src={post.imageUrl!}
              alt={post.title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <PlaceholderThumbnail title={post.title} />
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-3">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <TagChip key={tag.id} name={tag.name} />
                ))}
              </div>
            )}

            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight !my-0">
              {post.title}
            </h1>

            <div className="flex items-center justify-between gap-4 pt-2 border-b border-brand-border/60 pb-4">
              <PostCardMeta
                authorName={post.author.name}
                date={post.createdAt}
              />

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <IconButton
                  ariaLabel="Compartilhar"
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

                <IconButton
                  ariaLabel={isLiked ? 'Descurtir post' : 'Curtir post'}
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
            </div>
          </div>

          {/* Description */}
          <div className="text-gray-300 leading-relaxed whitespace-pre-line text-base">
            {post.description}
          </div>

          {/* Code Snippet block */}
          {post.codeSnippet && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between px-4 py-2 bg-[#121619] rounded-t-xl border border-b-0 border-brand-border text-xs text-gray-400">
                <span className="font-mono">Código</span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="hover:text-brand-green transition-colors cursor-pointer"
                >
                  {copiedCode ? 'Copiado!' : 'Copiar código'}
                </button>
              </div>
              <pre className="p-4 rounded-b-xl bg-[#0d1012] border border-brand-border text-brand-green font-mono text-xs md:text-sm overflow-x-auto leading-relaxed">
                <code>{post.codeSnippet}</code>
              </pre>
            </div>
          )}
        </div>
      </article>

      {/* Comments Section */}
      <section className="rounded-2xl bg-brand-card border border-brand-border p-6 md:p-8 flex flex-col gap-6">
        <h2 className="text-xl font-bold text-white tracking-tight !my-0">
          Comentários ({comments.length})
        </h2>

        {/* New Comment Input or Auth Prompt */}
        {isAuthenticated ? (
          <form onSubmit={handleAddComment} className="flex flex-col gap-3">
            <textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Escreva um comentário sobre este projeto..."
              rows={3}
              required
              className="w-full p-3.5 rounded-xl bg-[#14181b] border border-brand-border text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green resize-y transition-all"
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={!commentContent.trim() || isSubmittingComment}
                className="w-auto px-6 py-2 text-sm"
              >
                {isSubmittingComment ? 'Enviando...' : 'Comentar'}
              </Button>
            </div>
          </form>
        ) : (
          <div className="p-4 rounded-xl bg-[#14181b] border border-brand-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-sm text-gray-400">
              Você precisa estar conectado para curtir e comentar nos posts.
            </p>
            <Button
              variant="outline"
              onClick={() => navigate('/login')}
              className="w-auto px-5 py-2 text-sm shrink-0"
            >
              Fazer Login
            </Button>
          </div>
        )}

        {/* Comments List */}
        <div className="flex flex-col gap-3">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentItem
                key={comment.id}
                authorName={comment.author.name}
                content={comment.content}
                createdAt={comment.createdAt}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-6">
              Nenhum comentário ainda. Seja o primeiro a comentar!
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
