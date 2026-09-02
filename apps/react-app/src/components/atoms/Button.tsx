import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  children: ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#59F588] disabled:opacity-50 disabled:pointer-events-none px-4 py-2 text-sm cursor-pointer';
  
  const variants = {
    primary: 'bg-[#59F588] text-black font-bold hover:bg-[#42E86E] shadow-sm',
    secondary: 'bg-transparent text-gray-200 hover:text-white hover:bg-white/5 border-0',
    outline: 'border border-gray-700 text-gray-200 hover:bg-white/5',
    ghost: 'hover:bg-white/5 text-gray-200',
    link: 'underline-offset-4 hover:underline text-[#59F588] text-accent px-0 py-0 h-auto font-medium bg-transparent border-0',
  };

  const variantStyles = variants[variant] || variants.primary;

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </button>
  );
}


