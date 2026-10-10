import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Container } from '../../components/ui/Container';
import { MediaCard } from '../../components/cards/MediaCard';
import { ReportCard } from '../../components/cards/ReportCard';
import { Alert } from '../../components/ui/Alert';
import { OFFICIAL_PUBLICATIONS, SAMPLE_MEDIA_ITEMS } from '../../data/institutionData';
import { Radio, Newspaper, BookOpen, Filter } from 'lucide-react';

export const MediaPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'article' | 'podcast' | 'communique'>('all');
  const [notice, setNotice] = useState<string | null>(null);

  const filteredMedia = filter === 'all'
    ? SAMPLE_MEDIA_ITEMS
    : SAMPLE_MEDIA_ITEMS.filter((m) => m.type === filter);

  return (
    <div className="pb-20 space-y-12">
      <PageHeader
        kicker="Rayonnement & Publications"
        title="TSF Média & Tribune Institutionnelle"
        description="Documentation des réussites africaines, revues prospectives, études d'impact et prises de parole publiques."
      />

      <Container>
        <div className="space-y-12">
          {notice && (
            <Alert variant="info" onDismiss={() => setNotice(null)}>
              {notice}
            </Alert>
          )}

          {/* Editorial Lead Card */}
          <div className="bg-[#1A1A1A] border border-[#262626] text-white rounded-xl p-8 sm:p-12 relative overflow-hidden shadow-xs">
            <div className="max-w-2xl space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF6600] font-semibold flex items-center gap-2">
                <Newspaper className="w-4 h-4" />
                <span>Revue Panafricaine des Talents — N° 08</span>
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight leading-tight font-sans">
                « Construire le Siècle Africain sans Fuite des Cerveaux »
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                Le grand dossier d'analyse prospective corédigé par le Conseil d'Orientation Stratégique TSF et 14 économistes continentaux.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setNotice('Accès au dossier éditorial : Revue TSF N° 08')}
                  className="px-5 py-2.5 bg-[#FF6600] hover:bg-[#E65500] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-xs active:scale-[0.99]"
                >
                  Lire l'éditorial intégral
                </button>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#E8E8E8]">
              <h3 className="text-xl font-bold text-[#262626] font-sans">
                Productions Récentes TSF Média
              </h3>

              <div className="flex items-center gap-1 p-1 bg-[#F5F5F7] border border-[#E8E8E8] rounded-lg">
                {[
                  { id: 'all', label: 'Tous' },
                  { id: 'article', label: 'Articles' },
                  { id: 'podcast', label: 'Podcasts' },
                  { id: 'communique', label: 'Communiqués' }
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setFilter(t.id as any)}
                    className={`px-3 py-1.5 text-xs font-sans font-semibold rounded-md transition-colors cursor-pointer ${
                      filter === t.id
                        ? 'bg-white text-[#0070C0] shadow-xs'
                        : 'text-[#595959] hover:text-[#262626]'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* MediaCard Family */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredMedia.map((media) => (
                <MediaCard
                  key={media.id}
                  {...media}
                  onClick={() => setNotice(`Consultation du média : ${media.title}`)}
                />
              ))}
            </div>
          </div>

          {/* Publications & White Papers Grid (ReportCard Family) */}
          <div className="pt-6 border-t border-[#E8E8E8] space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#262626] font-sans">
                Rapports Officiels & Livres Blancs TSF
              </h3>
              <p className="text-xs text-[#7D7D7D] font-mono mt-0.5">
                Publications à comité de lecture et rapports d’orientation d’accès libre
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {OFFICIAL_PUBLICATIONS.map((pub, idx) => (
                <ReportCard
                  key={pub.id}
                  title={pub.title}
                  referenceCode={`TSF-DOC-0${idx + 1}`}
                  category={pub.type as any}
                  date={pub.date}
                  fileSize={pub.fileSize}
                  summary={pub.description}
                  onDownload={() => setNotice(`Téléchargement officiel initié : ${pub.title}`)}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
