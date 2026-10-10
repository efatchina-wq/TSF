import React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'normal' | 'wide' | 'narrow' | 'prose' | 'full';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  size = 'normal'
}) => {
  const sizeStyles = {
    narrow: 'max-w-5xl',
    normal: 'max-w-7xl',
    wide: 'max-w-[1440px]',
    prose: 'max-w-3xl',
    full: 'max-w-none'
  };

  return (
    <div
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 ${sizeStyles[size]} ${className}`}
    >
      {children}
    </div>
  );
};
