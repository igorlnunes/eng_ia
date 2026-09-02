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
      <div className={`text-left ${className}`}>
        <Label htmlFor={id}>{label}</Label>
        <Input id={id} ref={ref} error={!!errorText} {...props} />
        {errorText && (
          <p className="text-xs font-medium text-red-400 mt-1">{errorText}</p>
        )}
      </div>
    );
  }
);
FormField.displayName = 'FormField';

