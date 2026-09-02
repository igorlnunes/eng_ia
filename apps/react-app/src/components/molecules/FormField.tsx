import { forwardRef } from 'react';
import { Input, type InputProps } from '../atoms/Input';
import { Label } from '../atoms/Label';

interface FormFieldProps extends InputProps {
  label: string;
  errorText?: string;
  id: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, errorText, id, className = '', ...props }, ref) => {
    return (
      <div className={`space-y-2 ${className}`}>
        <Label htmlFor={id}>{label}</Label>
        <Input id={id} ref={ref} error={!!errorText} {...props} />
        {errorText && (
          <p className="text-sm font-medium text-red-500">{errorText}</p>
        )}
      </div>
    );
  }
);
FormField.displayName = 'FormField';
