import { useState, type FormEvent } from 'react';
import { Button } from '../atoms/Button';
import { FormField } from '../molecules/FormField';
import { postsService, type Post } from '../../services/posts.service';

export interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (post: Post) => void;
}

export function CreatePostModal({
  isOpen,
  onClose,
  onSuccess,
}: CreatePostModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const parsedTags = tags
        .split(',')
        .map((t) => t.trim().replace(/^#/, ''))
        .filter(Boolean);

      const created = await postsService.createPost({
        title: title.trim(),
        description: description.trim(),
        codeSnippet: codeSnippet.trim() || undefined,
        imageUrl: imageUrl.trim() || undefined,
        tags: parsedTags.length > 0 ? parsedTags : undefined,
      });

      // Reset form
      setTitle('');
      setDescription('');
      setCodeSnippet('');
      setImageUrl('');
      setTags('');

      onSuccess(created);
      onClose();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Falha ao criar publicação.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-xl rounded-2xl bg-[#14181b] border border-brand-border p-6 shadow-2xl flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-brand-border/60">
          <h2 id="modal-title" className="text-xl font-bold text-white !my-0">
            Publicar novo projeto
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar modal"
            className="text-gray-400 hover:text-white cursor-pointer text-xl"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-900/30 border border-red-500/50 text-red-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormField
            id="post-title"
            label="Título do projeto *"
            placeholder="Ex: Novo Hook useLocalStorage"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="post-description"
              className="text-xs font-semibold text-gray-300"
            >
              Descrição *
            </label>
            <textarea
              id="post-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o que o projeto faz ou ensina..."
              rows={3}
              required
              className="w-full p-3 rounded-lg bg-brand-card border border-brand-border text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green resize-y"
            />
          </div>

          <FormField
            id="post-image"
            label="URL da Imagem de Capa (opcional)"
            placeholder="https://exemplo.com/foto.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <FormField
            id="post-tags"
            label="Tags (separadas por vírgula)"
            placeholder="React, TypeScript, CSS"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="post-code"
              className="text-xs font-semibold text-gray-300"
            >
              Trecho de Código (opcional)
            </label>
            <textarea
              id="post-code"
              value={codeSnippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
              placeholder="const ola = 'mundo';"
              rows={4}
              className="w-full p-3 rounded-lg bg-[#0d1012] border border-brand-border text-xs font-mono text-brand-green placeholder-gray-600 focus:outline-none focus:border-brand-green resize-y"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-brand-border/60">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-auto px-5 py-2 text-sm"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !title.trim() || !description.trim()}
              className="w-auto px-6 py-2 text-sm"
            >
              {isSubmitting ? 'Publicando...' : 'Publicar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
