import type { ReactNode } from 'react';

interface AuthLayoutProps {
  banner: ReactNode;
  children: ReactNode;
}

export function AuthLayout({ banner, children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-brand-bg p-4 sm:p-6 md:p-8 overflow-hidden">
      {/* Background Watermark Shapes (Top-Left and Bottom-Right) */}
      <div className="pointer-events-none absolute -top-12 -left-12 opacity-30 select-none">
        <svg width="400" height="400" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="40" y="40" width="90" height="180" rx="45" stroke="#253342" strokeWidth="24" transform="rotate(-30 40 40)" />
          <rect x="120" y="80" width="90" height="180" rx="45" stroke="#253342" strokeWidth="24" transform="rotate(-30 120 80)" />
        </svg>
      </div>

      <div className="pointer-events-none absolute -bottom-16 -right-16 opacity-30 select-none">
        <svg width="450" height="450" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="50" y="50" width="90" height="180" rx="45" stroke="#253342" strokeWidth="24" transform="rotate(-30 50 50)" />
          <rect x="130" y="90" width="90" height="180" rx="45" stroke="#253342" strokeWidth="24" transform="rotate(-30 130 90)" />
        </svg>
      </div>

      {/* Main Card Container */}
      <div className="relative z-10 flex w-full max-w-[860px] flex-col md:flex-row items-stretch rounded-3xl bg-brand-card p-4 sm:p-5 md:p-6 shadow-2xl border border-brand-border gap-6 md:gap-8">
        
        {/* Left Side - Banner */}
        <div className="w-full md:w-1/2 shrink-0 flex items-stretch">
          {banner}
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-2 py-2 sm:px-4 md:px-6">
          <div className="w-full max-w-[340px] mx-auto">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
}

