import { type InputHTMLAttributes } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  id: string;
}

export function Checkbox({ label, id, className = '', ...props }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-1.5 cursor-pointer text-gray-300 select-none text-xs"
    >
      <input
        id={id}
        type="checkbox"
        className={`w-3.5 h-3.5 accent-brand-green rounded bg-gray-700 border-0 cursor-pointer ${className}`}
        {...props}
      />
      <span>{label}</span>
    </label>
  );
}
