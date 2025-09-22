import { forwardRef } from 'react';
import { Search, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const Input = forwardRef(({
  type = 'text',
  placeholder,
  className = '',
  error,
  label,
  helperText,
  icon,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(type);
  
  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
    setInputType(showPassword ? 'password' : 'text');
  };
  
  const baseClasses = 'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent';
  const errorClasses = error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-red-500';
  const iconClasses = icon ? 'pl-10' : '';
  
  const classes = `${baseClasses} ${errorClasses} ${iconClasses} ${className}`;
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        
        <input
          ref={ref}
          type={inputType}
          placeholder={placeholder}
          className={classes}
          {...props}
        />
        
        {type === 'password' && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={handlePasswordToggle}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400" />
            )}
          </button>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
