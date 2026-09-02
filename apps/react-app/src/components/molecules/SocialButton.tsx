import { type ButtonHTMLAttributes } from 'react';
import { Button } from '../atoms/Button';
import { Logo } from '../atoms/Logo';

interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  provider: 'google' | 'github';
  children: React.ReactNode;
}

export function SocialButton({ provider, children, className = '', ...props }: SocialButtonProps) {
  const providerIcon = provider === 'google' ? '/Google.png' : '/Github.png';
  const altText = provider === 'google' ? 'Google Logo' : 'GitHub Logo';

  return (
    <Button variant="secondary" className={`w-full gap-2 ${className}`} {...props}>
      <Logo src={providerIcon} alt={altText} className="w-5 h-5 button-icon" />
      {children}
    </Button>
  );
}
