import { forwardRef } from 'react';
import clsx from 'clsx';
import { Spinner } from './Spinner';

const baseStyles =
  'inline-flex items-center justify-center font-medium rounded-xl transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed';

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-3 text-base',
};

const variants = {
  primary: {
    yellow: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500',
    gray: 'bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-500',
  },
  outline: {
    yellow: 'border border-yellow-500 text-yellow-500 hover:bg-yellow-50 focus:ring-yellow-500',
    gray: 'border border-gray-500 text-gray-800 hover:bg-gray-100 focus:ring-gray-500',
  },
  ghost: {
    yellow: 'text-yellow-500 hover:bg-yellow-50 focus:ring-yellow-500',
    gray: 'text-gray-800 hover:bg-gray-100 focus:ring-gray-500',
  },
};

export const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      color = 'yellow',
      size = 'md',
      className,
      type = 'button',
      loading = false,
      icon: Icon,
      iconPosition = 'left',
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <button
        type={type}
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          baseStyles,
          variants[variant][color],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {loading && <Spinner className="mr-2 h-4 w-4" />}
        {!loading && Icon && iconPosition === 'left' && (
          <Icon className="mr-2 h-4 w-4" />
        )}
        {children}
        {!loading && Icon && iconPosition === 'right' && (
          <Icon className="ml-2 h-4 w-4" />
        )}
      </button>
    );
  }
);
