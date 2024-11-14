import React, { KeyboardEvent, MouseEvent } from 'react';
import { ChevronRight } from 'lucide-react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement | HTMLButtonElement> {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  footer?: React.ReactNode;
  isClickable?: boolean;
  isLoading?: boolean;
  variant?: 'default' | 'bordered' | 'elevated';
  className?: string;
  children: React.ReactNode;
}

interface CardHeaderProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  icon,
  action
}) => {
  if (!title && !subtitle && !icon && !action) return null;

  return (
    <div className="flex items-start justify-between p-6">
      <div className="flex items-start gap-4">
        {icon && (
          <div className="flex-shrink-0">
            {icon}
          </div>
        )}
        <div>
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {action && (
        <div className="flex-shrink-0">
          {action}
        </div>
      )}
    </div>
  );
};

const Card = React.forwardRef<HTMLDivElement | HTMLButtonElement, CardProps>(({
  title,
  subtitle,
  icon,
  action,
  footer,
  isClickable = false,
  isLoading = false,
  variant = 'default',
  className = '',
  children,
  onClick,
  onKeyDown,
  ...props
}, ref) => {
  // Base styles
  const baseStyles = "rounded-xl overflow-hidden relative";

  // Variant styles
  const variantStyles = {
    default: "bg-white dark:bg-gray-800",
    bordered: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
    elevated: "bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
  };

  // Interactive styles
  const interactiveStyles = isClickable 
    ? "cursor-pointer transform transition-transform hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" 
    : "";

  // Loading styles
  const loadingStyles = isLoading
    ? "animate-pulse bg-gray-100 dark:bg-gray-700"
    : "";

  // Combine all styles
  const cardStyles = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${interactiveStyles}
    ${loadingStyles}
    ${className}
  `;

  // Content container styles
  const contentStyles = "px-6 pb-6";
  
  // Handle keyboard events
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement | HTMLButtonElement>) => {
    if (isClickable && onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick(event as any);
    }
    onKeyDown?.(event);
  };

  const Element = isClickable ? 'button' : 'div';

  return (
    <Element
      ref={ref as React.Ref<HTMLDivElement & HTMLButtonElement>}
      className={cardStyles}
      onKeyDown={handleKeyDown}
      tabIndex={isClickable ? 0 : undefined}
      type={isClickable ? "button" : undefined}
      aria-disabled={isLoading}
      {...props}
    >
      {/* Header */}
      <CardHeader
        title={title}
        subtitle={subtitle}
        icon={icon}
        action={action}
      />

      {/* Content */}
      <div className={
        title || subtitle || icon || action 
          ? contentStyles 
          : "p-6"
      }>
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
          {footer}
        </div>
      )}

      {/* Clickable indicator */}
      {isClickable && !isLoading && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      )}
    </Element>
  );
});

Card.displayName = 'Card';

export default Card;