import React from 'react';

export interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ children, className = '' }) => (
  <div className="w-full overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-xs">
    <table className={`w-full text-left text-xs sm:text-sm text-slate-700 font-sans border-collapse ${className}`}>
      {children}
    </table>
  </div>
);

export const TableHead: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <thead className={`bg-slate-50/90 border-b border-slate-200 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 select-none ${className}`}>
    {children}
  </thead>
);

export const TableBody: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <tbody className={`divide-y divide-slate-100 ${className}`}>
    {children}
  </tbody>
);

export const TableRow: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  onClick?: () => void;
  selected?: boolean;
}> = ({
  children,
  className = '',
  onClick,
  selected = false
}) => (
  <tr
    onClick={onClick}
    className={`transition-colors ${
      selected 
        ? 'bg-blue-50/60 hover:bg-blue-50' 
        : 'hover:bg-slate-50/80'
    } ${onClick ? 'cursor-pointer' : ''} ${className}`}
  >
    {children}
  </tr>
);

export const TableHeaderCell: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  align?: 'left' | 'center' | 'right';
  width?: string;
}> = ({
  children,
  className = '',
  align = 'left',
  width
}) => {
  const alignClass = align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left';
  return (
    <th 
      style={width ? { width } : undefined}
      className={`px-5 py-3.5 font-bold ${alignClass} whitespace-nowrap ${className}`}
    >
      {children}
    </th>
  );
};

export const TableCell: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  align?: 'left' | 'center' | 'right'; 
  isNumeric?: boolean;
  truncate?: boolean;
}> = ({
  children,
  className = '',
  align = 'left',
  isNumeric = false,
  truncate = false
}) => {
  const alignClass = align === 'right' || isNumeric ? 'text-right' : align === 'center' ? 'text-center' : 'text-left';
  return (
    <td className={`px-5 py-4 align-middle ${isNumeric ? 'font-mono tabular-nums' : ''} ${truncate ? 'truncate max-w-xs' : ''} ${alignClass} ${className}`}>
      {children}
    </td>
  );
};
