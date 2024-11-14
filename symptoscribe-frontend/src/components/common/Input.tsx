import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  helperText,
  error,
  success,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  disabled,
  required,
  ...props
}, ref) => {
  // Conteneur styles
  const containerStyles = `${fullWidth ? 'w-full' : 'w-auto'}`;

  // Base styles pour l'input
  const baseInputStyles = "rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  // Padding conditionnel basé sur la présence des icônes
  const inputPadding = `
    ${leftIcon ? 'pl-10' : 'pl-4'}
    ${rightIcon || error || success ? 'pr-10' : 'pr-4'}
  `;

  // Styles variants basés sur l'état
  const inputStateStyles = error
    ? "border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-600"
    : success
    ? "border-green-300 focus:border-green-500 focus:ring-green-500 dark:border-green-600"
    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600";

  // Styles disabled
  const disabledStyles = disabled
    ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed opacity-75"
    : "bg-white dark:bg-gray-900";

  // Combinaison de tous les styles
  const inputStyles = `
    ${baseInputStyles}
    ${inputPadding}
    ${inputStateStyles}
    ${disabledStyles}
    py-2
    dark:text-white
    ${className}
  `;

  // Style pour le label
  const labelStyles = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  // Style pour le texte d'aide
  const helperTextStyles = `text-sm mt-1 ${
    error 
      ? "text-red-600 dark:text-red-400"
      : "text-gray-500 dark:text-gray-400"
  }`;

  return (
    <div className={containerStyles}>
      {label && (
        <label className={labelStyles}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          className={inputStyles}
          disabled={disabled}
          required={required}
          {...props}
        />

        {(error || success || rightIcon) && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {error && <AlertCircle className="h-5 w-5 text-red-500" />}
            {success && <CheckCircle className="h-5 w-5 text-green-500" />}
            {!error && !success && rightIcon}
          </div>
        )}
      </div>

      {(helperText || error) && (
        <p className={helperTextStyles}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;