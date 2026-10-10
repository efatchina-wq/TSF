import React from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Container } from '../../components/ui/Container';
import { Card } from '../../components/ui/Card';
import { ImpactMetricsGrid } from '../../components/data/ImpactMetricsGrid';
import { ChartContainer } from '../../components/data/ChartContainer';
import { Progress } from '../../components/data/Progress';
import { ImpactCard } from '../../components/cards/ImpactCard';
import {
  CHART_DATA_SECTORS,
  CHART_DATA_REGIONS
} from '../../data/institutionData';
import { Globe2 } from 'lucide-react';

export const ImpactPage: React.FC = () => {
  return (
    <div className="pb-20 space-y-12">
      <PageHeader
        kicker="Données Audités & Transparence"
        title="Impact & Trajectoires Panafricaines"
        description="Une évaluation rigoureuse et data-driven de nos retombées économiques, scientifiques et sociétales à travers le continent."
      />

      <Container>
        <div className="space-y-14">
          {/* Key Figures */}
          <div>
            <h2 className="text-2xl font-bold text-[#262626] font-sans mb-6">
              Indicateurs Clés Consolidés
            </h2>
            <ImpactMetricsGrid />
          </div>

          {/* Deep Impact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ImpactCard
              metric="50/50"
              title="Parité de Genre Absolue dans les STEM"
              context="La sélection à l'aveugle garantit une égalité mathématique stricte d'accès aux bourses d'ingénierie et d'IA."
              period="Promotion 2026"
              highlight
            />
            <ImpactCard
              metric="84.2%"
              title="Rétention & Réinvestissement Continental"
              context="Plus de 8 lauréats sur 10 travaillent ou fondent des entreprises directement implantées sur le sol africain."
              period="Suivi de cohorte à 3 ans"
            />
            <ImpactCard
              metric="12.4x"
              title="Multiplicateur Économique Social (SROI)"
              context="Chaque dollar mobilisé génère 12,4 dollars de valeur ajoutée locale certifiée par audit indépendant."
              period="Étude d'impact 2026"
            />
          </div>

          {/* Analytical Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ChartContainer
              title="Répartition par Filière Stratégique"
              subtitle="Concentration des lauréats certifiés selon les priorités critiques du développement africain."
              data={CHART_DATA_SECTORS}
              unit="%"
            />

            <ChartContainer
              title="Empreinte Territoriale par Sous-Région"
              subtitle="Distribution des cohortes au sein des 18 hubs et représentations permanentes TSF."
              data={CHART_DATA_REGIONS}
              unit="%"
            />
          </div>

          {/* Strategic Progress Metrics */}
          <div className="p-8 bg-white border border-[#E8E8E8] rounded-xl space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#262626] font-sans">
                Objectifs Stratégiques 2026-2030 (Agenda Capital Humain)
              </h3>
              <p className="text-xs text-[#7D7D7D] font-mono mt-0.5">
                Feuille de route validée par le Conseil d'Orientation Stratégique TSF
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-[#F5F5F7] rounded-lg space-y-3">
                <Progress
                  label="Objectif 50 000 Profils Évalués"
                  value={49}
                  variant="primary"
                />
                <span className="text-[11px] text-[#7D7D7D] block">
                  Actuel : 24 800 profils passés en détection psychométrique.
                </span>
              </div>

              <div className="p-4 bg-[#F5F5F7] rounded-lg space-y-3">
                <Progress
                  label="Déploiement 25 Pays Membres"
                  value={72}
                  variant="accent"
                />
                <span className="text-[11px] text-[#7D7D7D] block">
                  Actuel : 18 pays avec délégués territoriaux en exercice.
                </span>
              </div>

              <div className="p-4 bg-[#F5F5F7] rounded-lg space-y-3">
                <Progress
                  label="Dotation SourceFund 20 M$"
                  value={42}
                  variant="success"
                />
                <span className="text-[11px] text-[#7D7D7D] block">
                  Actuel : 8.4 M$ de capital patient sous gestion active.
                </span>
              </div>
            </div>
          </div>

          {/* Territorial Footprint Details */}
          <div className="p-8 bg-white border border-[#E8E8E8] rounded-xl space-y-6">
            <div className="flex items-center gap-3">
              <Globe2 className="w-6 h-6 text-[#0070C0]" />
              <div>
                <h3 className="text-xl font-bold text-[#262626] font-sans">
                  Empreinte & Maillage Territorial (18 Pays)
                </h3>
                <p className="text-xs text-[#7D7D7D] font-mono">
                  Quatre hubs régionaux et quatorze représentations nationales permanentes
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 bg-[#F5F5F7] rounded border border-[#E8E8E8] space-y-1.5">
                <strong className="block font-mono uppercase text-[#0070C0]">
                  Afrique de l’Ouest
                </strong>
                <p className="text-[#595959]">Hub Cotonou (Bénin) · Dakar (Sénégal) · Abidjan (Côte d'Ivoire) · Lomé (Togo) · Ouagadougou (Burkina Faso) · Abuja / Lagos (Nigéria) · Accra (Ghana)</p>
              </div>

              <div className="p-4 bg-[#F5F5F7] rounded border border-[#E8E8E8] space-y-1.5">
                <strong className="block font-mono uppercase text-[#0070C0]">
                  Afrique Centrale
                </strong>
                <p className="text-[#595959]">Yaoundé / Douala (Cameroun) · Libreville (Gabon) · Brazzaville (Congo) · Kinshasa (RDC) · N'Djamena (Tchad)</p>
              </div>

              <div className="p-4 bg-[#F5F5F7] rounded border border-[#E8E8E8] space-y-1.5">
                <strong className="block font-mono uppercase text-[#0070C0]">
                  Afrique de l’Est
                </strong>
                <p className="text-[#595959]">Hub Kigali (Rwanda) · Nairobi (Kenya) · Addis-Abeba (Éthiopie) · Kampala (Ouganda) · Dar es Salaam (Tanzanie)</p>
              </div>

              <div className="p-4 bg-[#F5F5F7] rounded border border-[#E8E8E8] space-y-1.5">
                <strong className="block font-mono uppercase text-[#0070C0]">
                  Afrique Australe & Océan Indien
                </strong>
                <p className="text-[#595959]">Johannesburg (Afrique du Sud) · Lusaka (Zambie) · Antananarivo (Madagascar) · Port-Louis (Maurice)</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
