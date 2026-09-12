import { Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../contexts';
import { Avatar } from '../atoms/Avatar';

export interface SidebarProps {
  onPublishClick?: () => void;
  className?: string;
}

export function Sidebar({ onPublishClick, className = '' }: SidebarProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handlePublish = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (onPublishClick) {
      onPublishClick();
    }
  };

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout();
    } else {
      navigate('/login');
    }
  };

  const isFeedActive =
    location.pathname === '/' || location.pathname.startsWith('/posts');

  return (
    <aside
      aria-label="Menu Principal"
      className={`w-64 shrink-0 bg-[#0f1417] border-r border-brand-border min-h-screen p-5 flex flex-col justify-between ${className}`}
    >
      <div className="flex flex-col gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 px-2 py-1 group">
          <div className="w-8 h-8 rounded-lg bg-brand-green/10 flex items-center justify-center border border-brand-green/30 group-hover:border-brand-green transition-colors">
            <span className="text-brand-green font-bold text-base">&lt;/&gt;</span>
          </div>
          <span className="font-bold text-lg text-white tracking-tight">
            Code<span className="text-brand-green">Connect</span>
          </span>
        </Link>

        {/* Publicar Projeto Button */}
        <button
          type="button"
          onClick={handlePublish}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-brand-green hover:bg-brand-green-hover text-black font-semibold text-sm transition-all shadow-md shadow-brand-green/20 cursor-pointer active:scale-98"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span>Publicar projeto</span>
        </button>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1">
          {/* Feed */}
          <Link
            to="/"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isFeedActive
                ? 'bg-brand-card text-brand-green border-l-2 border-brand-green'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span>Feed</span>
          </Link>

          {/* Perfil */}
          {isAuthenticated && (
            <div
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              onClick={() => {}}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>Perfil</span>
            </div>
          )}

          {/* Login / Sair dynamic link */}
          <button
            type="button"
            onClick={handleAuthAction}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors text-left cursor-pointer"
          >
            {isAuthenticated ? (
              <>
                <svg
                  className="w-5 h-5 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span>Sair</span>
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 text-brand-green"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                <span className="text-gray-200">Login</span>
              </>
            )}
          </button>
        </nav>
      </div>

      {/* Footer User preview if logged in */}
      {isAuthenticated && user && (
        <div className="pt-4 border-t border-brand-border flex items-center gap-3">
          <Avatar name={user.name} size="md" />
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-white truncate">
              {user.name}
            </span>
            <span className="text-[11px] text-gray-400 truncate">
              {user.email}
            </span>
          </div>
        </div>
      )}
    </aside>
  );
}
