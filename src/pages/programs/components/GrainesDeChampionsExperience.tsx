import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import {
  Trophy,
  Calendar,
  School,
  Users,
  Video,
  Award,
  Flame,
  ChevronRight,
  Medal,
  Clock,
  Sparkles
} from 'lucide-react';

type GdcTab =
  | 'saisons'
  | 'etablissements'
  | 'participants'
  | 'matchs'
  | 'resultats'
  | 'classements'
  | 'medias';

export const GrainesDeChampionsExperience: React.FC = () => {
  const [activeTab, setActiveTab] = useState<GdcTab>('classements');
  const [selectedSeason, setSelectedSeason] = useState('2025-2026');

  const SEASONS = [
    { id: '2025-2026', label: 'Saison 2025-2026', status: 'En cours (Phase Éliminatoire)' },
    { id: '2024-2025', label: 'Saison 2024-2025', status: 'Terminée — Champion : Lycée Béhanzin' },
    { id: '2023-2024', label: 'Saison 2023-2024', status: 'Archive Consolidée' }
  ];

  const SCHOOLS = [
    {
      name: 'Lycée Béhanzin',
      city: 'Porto-Novo',
      country: 'Bénin',
      members: 140,
      titles: 'Champion Panafricain 2024',
      badge: 'STEM & Débat'
    },
    {
      name: 'Lycée Scientifique de Yamoussoukro',
      city: 'Yamoussoukro',
      country: 'Côte d’Ivoire',
      members: 180,
      titles: 'Vice-Champion 2024',
      badge: 'Mathématiques Pures'
    },
    {
      name: 'Lycée Limamou Laye',
      city: 'Guédiawaye',
      country: 'Sénégal',
      members: 165,
      titles: 'Prix de la Meilleure Oratrice',
      badge: 'Robotique & Sciences'
    },
    {
      name: 'Lycée de Kigali',
      city: 'Kigali',
      country: 'Rwanda',
      members: 120,
      titles: 'Prix de l’Innovation Durable',
      badge: 'Codage & Écologie'
    },
    {
      name: 'Lycée de Tokoin',
      city: 'Lomé',
      country: 'Togo',
      members: 110,
      titles: 'Qualifié Phase Finale 2025',
      badge: 'Sciences Dures'
    },
    {
      name: 'Lycée Général Leclerc',
      city: 'Yaoundé',
      country: 'Cameroun',
      members: 135,
      titles: 'Vainqueur Olympiade Physique',
      badge: 'Expérimentation'
    }
  ];

  const MATCHES = [
    {
      date: '14 Mars 2026 — 10h00 GMT',
      stage: 'Quart de Finale A — Débat Oratoire',
      teamA: 'Lycée Béhanzin (Bénin)',
      teamB: 'Lycée Scientifique Yamoussoukro (CI)',
      topic: '« L’indépendance énergétique de l’Afrique par le solaire thermodynamique »',
      status: 'À venir',
      venue: 'Direct retransmis sur TSF Média'
    },
    {
      date: '21 Février 2026 — 14h00 GMT',
      stage: 'Huitième de Finale — Olympiade Mathématique',
      teamA: 'Lycée Limamou Laye (Sénégal)',
      teamB: 'Lycée de Tokoin (Togo)',
      topic: 'Épreuve d’Arithmétique & Théorie des Nombres (4h)',
      status: 'Terminé — 88 à 74 pour Limamou Laye',
      venue: 'Hub Régional Dakar'
    },
    {
      date: '08 Février 2026 — 10h00 GMT',
      stage: 'Huitième de Finale — Duel d’Éloquence',
      teamA: 'Lycée de Kigali (Rwanda)',
      teamB: 'Lycée Général Leclerc (Cameroun)',
      topic: '« L’éthique dans la gouvernance des intelligences artificielles africaines »',
      status: 'Terminé — Qualifié Kigali (Avis unanime du jury)',
      venue: 'Hub Régional Kigali'
    }
  ];

  const RANKINGS = [
    { rank: '01', school: 'Lycée Béhanzin (Bénin)', points: 480, wins: 12, losses: 1, streak: '4V' },
    { rank: '02', school: 'Lycée Scientifique de Yamoussoukro (Côte d’Ivoire)', points: 465, wins: 11, losses: 2, streak: '3V' },
    { rank: '03', school: 'Lycée Limamou Laye (Sénégal)', points: 440, wins: 10, losses: 2, streak: '5V' },
    { rank: '04', school: 'Lycée de Kigali (Rwanda)', points: 410, wins: 9, losses: 3, streak: '2V' },
    { rank: '05', school: 'Lycée Général Leclerc (Cameroun)', points: 375, wins: 8, losses: 4, streak: '1D' },
    { rank: '06', school: 'Lycée de Tokoin (Togo)', points: 350, wins: 7, losses: 5, streak: '1D' }
  ];

  const PARTICIPANTS = [
    { name: 'Koffi Paulin Mensah', age: 16, school: 'Lycée Béhanzin', role: 'Capitaine Équipe Mathématiques', achievement: 'Major national Olympiade de Géométrie' },
    { name: 'Aminata Diop', age: 17, school: 'Lycée Limamou Laye', role: 'Première Oratrice', achievement: 'Prix de la Meilleure Plaidoirie Républicaine' },
    { name: 'Jean-David Kouassi', age: 16, school: 'Lycée Scientifique Yamoussoukro', role: 'Développeur en Chef', achievement: 'Concepteur d’un suiveur d’arrosage autonome' },
    { name: 'Keza Uwimana', age: 17, school: 'Lycée de Kigali', role: 'Chercheuse Club Écologie', achievement: 'Médaille d’Or Chimie des Sols' }
  ];

  return (
    <div className="space-y-6 bg-slate-900 text-white p-6 sm:p-10 rounded-2xl border border-slate-800">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider border border-amber-500/30">
              Ligue Panafricaine d'Émulation Académique
            </span>
            <span className="text-slate-400 font-mono text-xs">
              Plateforme Ouverte Évolutive
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            L'Écosystème Graines de Champions
          </h3>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Consultez en direct la dynamique des clubs d’excellence scolaires : saisons, palmarès des lycées accrédités, résultats des matchs oratoires et classement de la Ligue.
          </p>
        </div>

        {/* Season Selector */}
        <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
          <Calendar className="w-4 h-4 text-amber-400" />
          <select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
            className="bg-transparent text-xs font-mono font-bold text-slate-200 focus:outline-none cursor-pointer"
          >
            {SEASONS.map((s) => (
              <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Nav Tabs for Extensible Architecture */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'classements', label: 'Classements Ligue', icon: Trophy },
          { id: 'matchs', label: 'Matchs & Tournois', icon: Flame },
          { id: 'etablissements', label: 'Établissements (64)', icon: School },
          { id: 'participants', label: 'Participants Lauréats', icon: Users },
          { id: 'saisons', label: 'Saisons & Archives', icon: Calendar },
          { id: 'medias', label: 'Médias & Replays', icon: Video }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as GdcTab)}
              className={`px-3.5 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: CLASSEMENTS */}
      {activeTab === 'classements' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Tableau officiel de la Ligue Académique — Saison {selectedSeason}</span>
            <span className="text-amber-400">Mise à jour hebdomadaire</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800 text-slate-400 uppercase font-mono text-[10px]">
                <tr>
                  <th className="p-3">Rang</th>
                  <th className="p-3">Établissement & Pays</th>
                  <th className="p-3 text-center">Victoires</th>
                  <th className="p-3 text-center">Défaites</th>
                  <th className="p-3 text-center">Série</th>
                  <th className="p-3 text-right">Points TSF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {RANKINGS.map((row) => (
                  <tr key={row.rank} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-3 font-mono font-bold text-amber-400">{row.rank}</td>
                    <td className="p-3 font-medium text-white">{row.school}</td>
                    <td className="p-3 text-center font-mono text-emerald-400 font-bold">{row.wins}</td>
                    <td className="p-3 text-center font-mono text-slate-400">{row.losses}</td>
                    <td className="p-3 text-center font-mono">
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-amber-300">
                        {row.streak}
                      </span>
                    </td>
                    <td className="p-3 text-right font-mono font-bold text-lg text-white">
                      {row.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: MATCHS & RÉSULTATS */}
      {activeTab === 'matchs' && (
        <div className="space-y-4">
          <div className="text-xs font-mono text-slate-400">
            Calendrier des confrontations oratoires & olympiades mathématiques
          </div>
          <div className="space-y-3">
            {MATCHES.map((m, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-800/80 rounded-xl border border-slate-700/80 space-y-2"
              >
                <div className="flex flex-wrap items-center justify-between text-[11px] font-mono gap-2">
                  <span className="text-amber-400 font-bold">{m.stage}</span>
                  <span className="text-slate-400">{m.date}</span>
                </div>
                <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2 pt-1">
                  <div className="text-base font-bold text-white">
                    {m.teamA} <span className="text-amber-400 font-normal">vs</span> {m.teamB}
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300">
                    {m.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 italic">Thème : {m.topic}</p>
                <div className="text-[10px] font-mono text-slate-500 pt-1 flex justify-between">
                  <span>Lieu : {m.venue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: ÉTABLISSEMENTS */}
      {activeTab === 'etablissements' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SCHOOLS.map((s, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-800/80 rounded-xl border border-slate-700/80 space-y-2.5"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold">
                  {s.badge}
                </span>
                <span className="font-mono text-slate-400 text-[11px]">{s.country}</span>
              </div>
              <h4 className="text-base font-bold text-white">{s.name}</h4>
              <p className="text-xs text-slate-400">{s.city} — {s.members} élèves actifs</p>
              <div className="pt-2 border-t border-slate-700/60 text-[11px] font-mono text-emerald-400">
                🏆 {s.titles}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT: PARTICIPANTS */}
      {activeTab === 'participants' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PARTICIPANTS.map((p, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-800/80 rounded-xl border border-slate-700/80 space-y-2 flex items-start gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center font-mono shrink-0">
                {p.name.charAt(0)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">{p.name}</h4>
                  <span className="text-[10px] font-mono text-slate-400">({p.age} ans)</span>
                </div>
                <p className="text-xs text-amber-300 font-mono">{p.school} — {p.role}</p>
                <p className="text-xs text-slate-400 leading-snug">{p.achievement}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT: SAISONS */}
      {activeTab === 'saisons' && (
        <div className="space-y-3">
          {SEASONS.map((s) => (
            <div
              key={s.id}
              className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center justify-between"
            >
              <div>
                <h4 className="text-base font-bold text-white font-mono">{s.label}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{s.status}</p>
              </div>
              <button
                type="button"
                onClick={() => { setSelectedSeason(s.id); setActiveTab('classements'); }}
                className="text-xs font-mono font-bold text-amber-400 hover:underline cursor-pointer"
              >
                Explorer la saison →
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT: MÉDIAS */}
      {activeTab === 'medias' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 space-y-2">
            <div className="h-32 bg-slate-950 rounded-lg flex items-center justify-center text-slate-500 font-mono text-xs">
              [Vidéo Replay Finale Oratoire 2024]
            </div>
            <h4 className="text-sm font-bold text-white">Duel Oratoire : Porto-Novo vs Yamoussoukro</h4>
            <p className="text-xs text-slate-400">Durée : 45 min — Retransmission intégrale</p>
          </div>
          <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 space-y-2">
            <div className="h-32 bg-slate-950 rounded-lg flex items-center justify-center text-slate-500 font-mono text-xs">
              [Documentaire : Dans la tête des graines de génies]
            </div>
            <h4 className="text-sm font-bold text-white">Immersion dans les Clubs d’Excellence TSF</h4>
            <p className="text-xs text-slate-400">Durée : 26 min — Réalisation TSF Média</p>
          </div>
        </div>
      )}
    </div>
  );
};
