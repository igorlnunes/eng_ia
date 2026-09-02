import type { ReactNode } from 'react';

interface AuthLayoutProps {
  banner: ReactNode;
  children: ReactNode;
}

export function AuthLayout({ banner, children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-[100svh] w-full bg-[var(--bg)] md:p-4">
      {/* Container principal que divide a tela em duas partes */}
      <div className="flex w-full flex-col md:flex-row bg-[var(--bg)] overflow-hidden rounded-2xl md:shadow-lg md:border md:border-[var(--border)]">
        
        {/* Lado Esquerdo - Formulário */}
        <div className="flex w-full flex-col justify-center px-4 py-8 md:w-1/2 lg:w-[45%] md:px-12 lg:px-24">
          <div className="w-full max-w-[400px] mx-auto">
            {children}
          </div>
        </div>

        {/* Lado Direito - Banner */}
        <div className="hidden w-full md:block md:w-1/2 lg:w-[55%] p-4">
          {banner}
        </div>
        
      </div>
    </div>
  );
}
