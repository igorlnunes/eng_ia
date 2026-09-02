import { type ButtonHTMLAttributes } from 'react';
import { Logo } from '../atoms/Logo';

interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  provider: 'google' | 'github';
  children?: React.ReactNode;
}

export function SocialButton({ provider, children, className = '', ...props }: SocialButtonProps) {
  const providerIcon = provider === 'google' ? '/Google.png' : '/Github.png';
  const altText = provider === 'google' ? 'Google Logo' : 'GitHub Logo';
  const defaultLabel = provider === 'google' ? 'Gmail' : 'Github';

  return (
    <button
      type="button"
      className={`flex flex-col items-center justify-center cursor-pointer hover:opacity-80 transition-opacity p-1 bg-transparent border-0 text-gray-300 text-xs gap-1 ${className}`}
      {...props}
    >
      <Logo src={providerIcon} alt={altText} className="w-7 h-7 object-contain" />
      <span className="text-xs text-gray-300 font-normal">{children ?? defaultLabel}</span>
    </button>
  );
}

