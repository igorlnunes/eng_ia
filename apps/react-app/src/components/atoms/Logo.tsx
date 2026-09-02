import { type ImgHTMLAttributes } from 'react';

interface LogoProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export function Logo({ src, alt, className = '', ...props }: LogoProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={`object-contain ${className}`}
      {...props}
    />
  );
}
