import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { Sidebar } from '../organisms/Sidebar';
import { SearchBar } from '../molecules/SearchBar';
import { CreatePostModal } from '../organisms/CreatePostModal';
import { type Post } from '../../services/posts.service';

export interface AppLayoutProps {
  children: ReactNode;
  onSearch?: (term: string) => void;
  searchValue?: string;
  onPostCreated?: (post: Post) => void;
}

export function AppLayout({
  children,
  onSearch,
  searchValue = '',
  onPostCreated,
}: AppLayoutProps) {
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (term: string) => {
    if (onSearch) {
      onSearch(term);
    } else {
      // If we are on a page without custom onSearch (e.g. details), navigate to feed with search
      navigate(`/?search=${encodeURIComponent(term)}`);
    }
  };

  const handlePostCreated = (post: Post) => {
    if (onPostCreated) {
      onPostCreated(post);
    } else {
      navigate(`/posts/${post.id}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-brand-bg text-gray-100 font-sans">
      {/* Fixed/Sticky Left Sidebar */}
      <Sidebar
        onPublishClick={() => setIsPublishModalOpen(true)}
        className="hidden md:flex sticky top-0 h-screen overflow-y-auto"
      />

      {/* Main Column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar with Search and Mobile Menu toggle */}
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 px-4 md:px-8 py-4 bg-brand-bg/90 backdrop-blur-md border-b border-brand-border/40">
          <SearchBar
            initialValue={searchValue}
            onSearch={handleSearchSubmit}
            className="flex-1 max-w-2xl"
          />
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onSuccess={handlePostCreated}
      />
    </div>
  );
}
