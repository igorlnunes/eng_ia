import { Logo } from '../atoms/Logo';
import { Typography } from '../atoms/Typography';

export function AuthBanner() {
  return (
    <div className="relative flex h-full flex-col bg-[var(--social-bg)] p-10 text-white overflow-hidden justify-between items-center rounded-2xl">
      <div className="absolute inset-0 bg-gradient-to-t from-accent/90 to-accent/20 mix-blend-multiply" />
      
      <div className="relative z-10 w-full max-w-sm">
        <Logo src="/Logo_small.png" alt="Logo" className="h-12 w-auto mb-12" />
      </div>

      <div className="relative z-10 w-full max-w-sm mt-auto text-left">
        <Typography variant="h2" className="text-white">
          Onde a inovação ganha vida.
        </Typography>
        <Typography className="text-white/80 mt-2">
          Junte-se à nossa comunidade e explore um mundo de possibilidades tecnológicas.
        </Typography>
      </div>
    </div>
  );
}
