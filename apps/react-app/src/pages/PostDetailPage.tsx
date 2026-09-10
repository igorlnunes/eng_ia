import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { AppLayout } from '../components/templates/AppLayout';
import { PostDetail } from '../components/organisms/PostDetail';
import { type Post, postsService } from '../services/posts.service';

export function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (!id) return;

    postsService
      .getPostById(id)
      .then((data) => {
        if (isMounted) {
          setPost(data);
          setError(null);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('Publicação não encontrada ou erro ao carregar.');
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <AppLayout>
      {isLoading && (
        <div className="max-w-4xl mx-auto flex flex-col gap-6 animate-pulse">
          <div className="h-6 w-32 rounded-lg bg-brand-card" />
          <div className="h-96 rounded-2xl bg-brand-card border border-brand-border" />
        </div>
      )}

      {!isLoading && error && (
        <div className="max-w-md mx-auto my-12 p-8 rounded-2xl bg-brand-card border border-brand-border text-center flex flex-col items-center gap-4">
          <p className="text-gray-300 font-medium">{error}</p>
          <Link
            to="/"
            className="px-5 py-2 rounded-lg bg-brand-green text-black font-semibold text-sm hover:bg-brand-green-hover transition-colors"
          >
            Voltar ao feed
          </Link>
        </div>
      )}

      {!isLoading && !error && post && <PostDetail post={post} />}
    </AppLayout>
  );
}
