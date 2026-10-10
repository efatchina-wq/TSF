import React from 'react';
import { INSTITUTION_INFO } from '../../data/institutionData';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useRouter } from '../../hooks/useRouter';
import {
  Building2,
  Scale,
  Calendar,
  Award,
  MapPin,
  Globe2,
  Layers,
  Sparkles,
  FileText,
  ShieldCheck,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export const WhoWeAreView: React.FC = () => {
  const { navigate } = useRouter();

  const institutionalPillars = [
    {
      num: '01',
      title: 'Identité Statutaire',
      icon: <Building2 className="w-5 h-5 text-[#0070C0]" />,
      lead: `${INSTITUTION_INFO.name} (${INSTITUTION_INFO.acronym})`,
      desc: `${INSTITUTION_INFO.nature}. Infrastructure indépendante d'intérêt général à gouvernance internationale.`,
      tag: 'Enregistrement OING'
    },
    {
      num: '02',
      title: 'Nature Juridique',
      icon: <Scale className="w-5 h-5 text-[#0070C0]" />,
      lead: 'OING de Droit Privé à Vocation Publique',
      desc: 'Régie par des statuts internationaux d\'intérêt général et protégée par des accords de siège bilatéraux avec les États hôtes.',
      tag: 'Accords de siège intergouvernementaux'
    },
    {
      num: '03',
      title: 'Création & Trajectoire',
      icon: <Calendar className="w-5 h-5 text-[#0070C0]" />,
      lead: 'Initiative 2015 — Fondation 2017',
      desc: 'Née d\'un diagnostic mené dans 7 pays en 2015, officialisée par ses statuts constitutifs et ses premiers organes en 2017.',
      tag: '9+ années d\'exercice'
    },
    {
      num: '04',
      title: 'Reconnaissance Publique',
      icon: <Award className="w-5 h-5 text-[#0070C0]" />,
      lead: 'Utilité Publique & 18 Accords d\'État',
      desc: 'Reconnue par les ministères de l\'Enseignement Supérieur, les rectorats d\'État et les institutions multilatérales de développement.',
      tag: 'Conformité ISO & accréditations'
    },
    {
      num: '05',
      title: 'Siège Opérationnel',
      icon: <MapPin className="w-5 h-5 text-[#0070C0]" />,
      lead: 'Cotonou & Réseau Polycentrique',
      desc: 'Siège continental à Cotonou (Bd de la Marina) appuyé par 4 hubs régionaux : Kigali, Nairobi, Dakar et Abidjan.',
      tag: '5 hubs d\'ancrage'
    },
    {
      num: '06',
      title: 'Zone d\'Intervention',
      icon: <Globe2 className="w-5 h-5 text-[#0070C0]" />,
      lead: 'Continent Africain & Diaspora',
      desc: '18 pays sous couverture permanente (Afrique de l\'Ouest, Centrale, Orientale, Australe, Nord) et relais dans la diaspora internationale.',
      tag: 'Écosystème transfrontalier'
    },
    {
      num: '07',
      title: 'Filières Prioritaires',
      icon: <Layers className="w-5 h-5 text-[#0070C0]" />,
      lead: '5 Filières Stratégiques Critiques',
      desc: 'STEM appliquées, IA & datas souveraines, macro-économie, haute gouvernance d\'État et transition écologique.',
      tag: 'Compétences à fort effet multiplicateur'
    },
    {
      num: '08',
      title: 'Devise & Serment',
      icon: <Sparkles className="w-5 h-5 text-[#FF6600]" />,
      lead: 'Compétences · Potentiel · Continent',
      desc: 'Exigence de restitution systématique : tout talent certifié s\'engage à reverser de la valeur à la collectivité africaine.',
      tag: 'Pacte civique inaliénable'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Official Motto Plaque - Pure, prestigious institutional styling */}
      <div className="relative overflow-hidden bg-white border border-[#E8E8E8] rounded-2xl p-8 sm:p-12 shadow-2xs">
        <div className="max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#0070C0] font-bold bg-[#EBF5FC] px-3 py-1 rounded border border-[#A3D1F1]">
              Devise Institutionnelle Officielle
            </span>
            <span className="text-[11px] font-mono text-[#7D7D7D] tracking-wider">
              Statuts Fondateurs — Art. 02
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#262626] tracking-tight leading-tight">
            « {INSTITUTION_INFO.devise} »
          </h2>

          <p className="text-sm sm:text-base text-[#595959] leading-relaxed max-w-3xl font-sans">
            Cette devise résume la doctrine opérationnelle de TSF : refuser le fatalisme de la fuite des cerveaux en transformant le potentiel brut de la jeunesse africaine en levier direct de souveraineté pour le continent.
          </p>
        </div>
      </div>

      {/* Institutional Fiche - Asymmetrical, authoritative 2-column registry */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 border-b border-[#E8E8E8]">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0070C0] block">
              Fiche Signalétique & Cadre d'Autorité
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#262626]">
              Les 8 Fondements Institutionnels de TSF
            </h3>
          </div>
          <span className="text-xs font-mono text-[#7D7D7D] mt-2 sm:mt-0">
            Source : Registre International TSF / Conventions de Siège
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {institutionalPillars.map((item) => (
            <div
              key={item.num}
              className="bg-white border border-[#E8E8E8] rounded-xl p-6 hover:border-[#0070C0]/50 transition-all shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F5F7] flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-[#0070C0] uppercase">
                    {item.num} · {item.title}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F5F5F7] text-[#7D7D7D] border border-[#E8E8E8]">
                  {item.tag}
                </span>
              </div>

              <h4 className="text-base font-bold text-[#262626] leading-snug">
                {item.lead}
              </h4>

              <p className="text-xs sm:text-sm text-[#595959] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Editorial Perspective - Why TSF is an Infrastructure */}
      <div className="p-8 sm:p-12 bg-[#F5F5F7] border border-[#E8E8E8] rounded-2xl shadow-2xs space-y-8">
        <div className="max-w-4xl space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0070C0]">
            Doctrine Institutionnelle
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#262626] tracking-tight">
            Une infrastructure publique panafricaine, non une œuvre caritative
          </h3>

          <div className="text-[#595959] text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              Pour comprendre la genèse et la mission de <strong className="text-[#262626] font-semibold">Talents Sans Frontières (TSF)</strong>, il convient d’abord de clarifier ce qu’elle n’est pas. TSF n’est ni une association caritative compassionnelle dispensant des secours d’urgence, ni un cabinet de recrutement commercial monétisant des commissions de placement pour des multinationales étrangères.
            </p>
            <p>
              TSF a été bâtie comme une <strong className="text-[#262626] font-semibold">infrastructure d’utilité publique continentale</strong>. À l’instar des réseaux ferroviaires, des corridors énergétiques ou des câbles sous-marins qui relient nos économies, TSF constitue le réseau d’interconnexion humaine qui permet au potentiel intellectuel africain de circuler librement, de s'affirmer aux plus hauts standards mondiaux et de revenir irriguer nos sociétés.
            </p>
          </div>
        </div>

        {/* Detailed Domains List */}
        <div className="pt-6 border-t border-[#E8E8E8]">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#262626] mb-4">
            Les Cinq Domaines d'Intervention Prioritaires :
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {INSTITUTION_INFO.domainesIntervention.map((domaine, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-white border border-[#E8E8E8] rounded-xl text-xs">
                <CheckCircle2 className="w-4 h-4 text-[#0E8A5E] shrink-0 mt-0.5" />
                <span className="text-[#262626] font-medium leading-snug">{domaine}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Official Documentation & Accountability Box */}
      <div className="border border-[#E8E8E8] bg-white p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xs">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-[#0E8A5E] text-xs font-mono font-bold uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>Transparence & Accès Libre aux Archives</span>
          </div>
          <h4 className="text-lg font-bold text-[#262626]">
            Rapport Annuel & Statuts Fondateurs en Consultation Libre
          </h4>
          <p className="text-xs sm:text-sm text-[#595959]">
            Conformément à nos engagements de transparence intégrale, l’ensemble de nos rapports d’activité, comptes certifiés et grilles de gouvernance sont consultables par le public et les institutions partenaires.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/ressources')}
            icon={<FileText className="w-4 h-4" />}
          >
            Centre de Ressources
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/organisation/gouvernance')}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Consulter la Gouvernance
          </Button>
        </div>
      </div>
    </div>
  );
};
