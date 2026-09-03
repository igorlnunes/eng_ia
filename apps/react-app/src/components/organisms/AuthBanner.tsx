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
    <div className="relative w-full h-full min-h-[320px] md:min-h-[440px] overflow-hidden rounded-[16px] flex items-center justify-center bg-[#0F1417]">
      <Logo
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-[16px]"
      />
    </div>
  );
}
