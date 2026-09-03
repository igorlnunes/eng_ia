import { Logo } from '../atoms/Logo';

interface AuthBannerProps {
  src?: string;
  alt?: string;
}

export function AuthBanner({
  src = '/Group 2087.png',
  alt = 'Code Connect Banner Logo',
}: AuthBannerProps) {
  return (
    <div className="relative w-full h-full min-h-80 md:min-h-[440px] overflow-hidden rounded-2xl flex items-center justify-center bg-brand-banner">
      <Logo
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-2xl"
      />
    </div>
  );
}
