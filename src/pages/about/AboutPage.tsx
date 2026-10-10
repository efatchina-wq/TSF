import React from 'react';
import { useRouter } from '../../hooks/useRouter';
import { PageHeader } from '../../components/layout/PageHeader';
import { SubNav, SubNavItem } from '../../components/navigation/SubNav';
import { Container } from '../../components/ui/Container';
import { WhoWeAreView } from './WhoWeAreView';
import { MissionVisionView } from './MissionVisionView';
import { MethodeView } from './MethodeView';
import { GovernanceView } from './GovernanceView';
import { HistoryView } from './HistoryView';

const SUB_NAV_ITEMS: SubNavItem[] = [
  { id: 'overview', label: 'Qui sommes-nous ?', path: '/organisation' },
  { id: 'mission', label: 'Mission & Vision', path: '/organisation/mission' },
  { id: 'methode', label: 'Méthode Fondatrice', path: '/organisation/methode' },
  { id: 'gouvernance', label: 'Gouvernance & Contrôle', path: '/organisation/gouvernance' },
  { id: 'histoire', label: 'Histoire & Trajectoire', path: '/organisation/histoire' }
];

export const AboutPage: React.FC = () => {
  const { currentPath } = useRouter();

  const isMission = currentPath === '/organisation/mission';
  const isMethode = currentPath === '/organisation/methode';
  const isGouvernance = currentPath === '/organisation/gouvernance';
  const isHistoire = currentPath === '/organisation/histoire';
  const isOverview = !isMission && !isMethode && !isGouvernance && !isHistoire;

  // Dynamic header metadata per sub-section
  let kicker = "Rapport Institutionnel & Statuts";
  let title = "Qui Sommes-Nous ?";
  let description = "L’infrastructure panafricaine d’intérêt général dédiée à la détection, la structuration, la certification et la propulsion des talents du continent.";

  if (isMission) {
    kicker = "Raison d’Être & Alignement Déontologique";
    title = "Mission, Vision & Valeurs Cardinales";
    description = "Le cadre de doctrine et de souveraineté guidant l’ensemble de nos interventions en Afrique et à l’international.";
  } else if (isMethode) {
    kicker = "Cœur Opérationnel & Chaîne de Valeur";
    title = "La Méthode Fondatrice TSF";
    description = "DÉTECTER → INCUBER → CERTIFIER → PROPULSER : un protocole continu et scientifique pour la souveraineté intellectuelle de l’Afrique.";
  } else if (isGouvernance) {
    kicker = "Instances Dirigeantes & Éthique";
    title = "Gouvernance, Transparence & Indépendance";
    description = "Une séparation statutaire absolue entre le financement de nos actions et la délibération souveraine de nos jurys.";
  } else if (isHistoire) {
    kicker = "Archives & Prospective Stratégique";
    title = "Histoire & Trajectoire : 2015 à 2035";
    description = "De la prise de conscience initiale à l’infrastructure panafricaine de référence : les jalons vérifiés de notre développement.";
  }

  return (
    <div className="pb-20 space-y-10">
      <PageHeader
        kicker={kicker}
        title={title}
        description={description}
      >
        <SubNav items={SUB_NAV_ITEMS} />
      </PageHeader>

      <Container>
        {isOverview && <WhoWeAreView />}
        {isMission && <MissionVisionView />}
        {isMethode && <MethodeView />}
        {isGouvernance && <GovernanceView />}
        {isHistoire && <HistoryView />}
      </Container>
    </div>
  );
};
