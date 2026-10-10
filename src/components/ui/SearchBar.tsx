import React, { forwardRef } from 'react';
import { Search, X } from 'lucide-react';

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChangeValue?: (value: string) => void;
  onClear?: () => void;
  sizeVariant?: 'sm' | 'md' | 'lg';
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(({
  value,
  onChangeValue,
  onClear,
  sizeVariant = 'md',
  placeholder = 'Rechercher une opportunité, compétence, guide...',
  className = '',
  onChange,
  ...props
}, ref) => {
  const handleClear = () => {
    if (onChangeValue) onChangeValue('');
    if (onClear) onClear();
  };

  const sizeStyles = {
    sm: 'py-2 pl-9 pr-8 text-xs rounded-lg',
    md: 'py-2.5 pl-10 pr-9 text-sm rounded-lg',
    lg: 'py-3.5 pl-11 pr-10 text-base rounded-xl'
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5 left-3',
    md: 'w-4 h-4 left-3.5',
    lg: 'w-5 h-5 left-4'
  };

  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <Search
        className={`absolute ${iconSizes[sizeVariant]} text-[#7D7D7D] pointer-events-none`}
      />

      <input
        ref={ref}
        type="search"
        value={value}
        onChange={(e) => {
          if (onChange) onChange(e);
          if (onChangeValue) onChangeValue(e.target.value);
        }}
        placeholder={placeholder}
        className={`w-full bg-white text-[#262626] placeholder-[#B8B8B8] border border-[#E8E8E8] hover:border-[#B8B8B8] focus:border-[#0070C0] focus:ring-2 focus:ring-[#0070C0]/20 transition-all outline-none font-sans ${sizeStyles[sizeVariant]}`}
        {...props}
      />

      {value && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Effacer la recherche"
          className="absolute right-3 p-1 text-[#7D7D7D] hover:text-[#262626] rounded-md transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
});

SearchBar.displayName = 'SearchBar';
