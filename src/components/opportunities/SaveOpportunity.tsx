import React from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';

interface SaveOpportunityProps {
  opportunityId: string;
  isSaved: boolean;
  onToggleSave: (oppId: string) => void;
  showText?: boolean;
  className?: string;
}

export const SaveOpportunity: React.FC<SaveOpportunityProps> = ({
  opportunityId,
  isSaved,
  onToggleSave,
  showText = false,
  className = ''
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSave(opportunityId);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title={isSaved ? 'Retirer des favoris' : 'Enregistrer cette opportunité'}
      className={`inline-flex items-center gap-1.5 p-2 rounded-lg border transition-all cursor-pointer ${
        isSaved
          ? 'bg-[#FFF3EB] border-[#FFC49E] text-[#FF6600]'
          : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
      } ${className}`}
    >
      {isSaved ? (
        <BookmarkCheck className="w-4 h-4 fill-[#FF6600] text-[#FF6600]" />
      ) : (
        <Bookmark className="w-4 h-4" />
      )}
      {showText && (
        <span className="text-xs font-mono font-medium">
          {isSaved ? 'Enregistrée' : 'Sauvegarder'}
        </span>
      )}
    </button>
  );
};
