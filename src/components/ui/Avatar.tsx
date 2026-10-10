import React from 'react';

export interface AvatarProps {
  src?: string | null;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'certified';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  status,
  className = ''
}) => {
  const getInitials = (n: string) => {
    const parts = n.trim().split(/\s+/);
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return (parts[0]?.[0] || 'T').toUpperCase();
  };

  const sizeStyles = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base font-bold',
    xl: 'w-20 h-20 text-xl font-bold'
  };

  const statusStyles = {
    online: 'bg-[#0E8A5E]',
    offline: 'bg-[#7D7D7D]',
    certified: 'bg-[#0070C0]'
  };

  const statusSizes = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3.5 h-3.5',
    xl: 'w-4.5 h-4.5'
  };

  return (
    <div className={`relative inline-flex shrink-0 ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${sizeStyles[size]} rounded-full object-cover border border-[#E8E8E8] shadow-2xs`}
        />
      ) : (
        <div
          className={`${sizeStyles[size]} rounded-full bg-[#EBF5FC] text-[#0070C0] border border-[#A3D1F1] font-semibold flex items-center justify-center font-sans select-none`}
        >
          {getInitials(name)}
        </div>
      )}

      {status && (
        <span
          className={`absolute bottom-0 right-0 ${statusSizes[size]} ${statusStyles[status]} rounded-full ring-2 ring-white`}
          title={`Statut: ${status}`}
        />
      )}
    </div>
  );
};
