import { Logo } from '../atoms/Logo';

export function AuthBanner() {
  return (
    <div className="relative w-full h-full min-h-[320px] md:min-h-[440px] overflow-hidden rounded-[16px] flex items-center justify-center bg-[#0F1417]">
      <Logo
        src="/Group 2087.png"
        alt="Code Connect Banner Logo"
        className="w-full h-full object-cover rounded-[16px]"
      />
    </div>
  );
}

