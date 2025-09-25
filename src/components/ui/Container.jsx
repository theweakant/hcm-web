import { forwardRef } from 'react';

const Container = forwardRef(({
  children,
  size = 'default',
  className = '',
  ...props
}, ref) => {
  const baseClasses = 'mx-auto px-4 sm:px-6 lg:px-8';
  
  const sizes = {
    sm: 'max-w-3xl',
    default: 'max-w-7xl',
    lg: 'max-w-8xl',
    full: 'max-w-none'
  };
  
  const classes = `${baseClasses} ${sizes[size]} ${className}`;
  
  return (
    <div
      ref={ref}
      className={classes}
      {...props}
    >
      {children}
    </div>
  );
});

Container.displayName = 'Container';

export default Container;

