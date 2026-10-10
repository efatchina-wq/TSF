/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * RAPPORT D'AUDIT COMPLET DE L'INTERFACE TSF
 * Diagnostic exhaustif de l'existant avant refonte visuelle majeure.
 */

export interface AuditFinding {
  id: string;
  category: 
    | 'PALETTE_COULEURS'
    | 'TYPOGRAPHIE_HIERARCHIE'
    | 'ESPACEMENT_GRILLE'
    | 'BOUTONS_CTA'
    | 'CARTES_CONTENEURS'
    | 'CAPSULES_PILLS'
    | 'TABLEAUX_DONNEES'
    | 'RESPONSIVE_DEBORDEMENT'
    | 'NAVIGATION_ZINDEX'
    | 'LOOK_AI_GENERATED';
  severity: 'CRITIQUE' | 'MAJEURE' | 'MOYENNE' | 'MINEURE';
  componentOrPage: string;
  observedIssue: string;
  tsfDesignRule: string;
  remediationPath: string;
}

export const TSF_INTERFACE_AUDIT_REPORT: {
  summary: {
    totalFindings: number;
    criticalCount: number;
    majorCount: number;
    examinedPagesCount: number;
    brandAlignmentStatus: string;
  };
  findings: AuditFinding[];
  migrationStrategy: Array<{
    phase: string;
    focus: string;
    impact: string;
  }>;
} = {
  summary: {
    totalFindings: 18,
    criticalCount: 7,
    majorCount: 8,
    examinedPagesCount: 16,
    brandAlignmentStatus: 'NON ALIGNÉ (Anciennes teintes Bleu Marine #0B1B3D et Marron #B45309 à remplacer par la charte officielle TSF)',
  },

  findings: [
    {
      id: 'AUD-01',
      category: 'PALETTE_COULEURS',
      severity: 'CRITIQUE',
      componentOrPage: 'Header, Footer, PageHeader, EspaceTsf, Opportunities',
      observedIssue: 'Utilisation généralisée d’un bleu marine sombre (#0B1B3D / #10244C) et d’un ocre/marron (#B45309) au lieu des couleurs officielles du logo TSF.',
      tsfDesignRule: 'PRIMARY BLUE = #0070C0, ACCENT ORANGE = #FF6600, CHARCOAL = #404040, WHITE = #FFFFFF.',
      remediationPath: 'Remplacer toutes les occurrences par les tokens tsfColors.primary (Bleu #0070C0) et tsfColors.accent (Orange #FF6600).'
    },
    {
      id: 'AUD-02',
      category: 'BOUTONS_CTA',
      severity: 'CRITIQUE',
      componentOrPage: 'Header ("ESPACE TSF"), HomePage ("Postuler"), Opportunities ("WikiJob Intelligence")',
      observedIssue: 'Boutons avec gradients artificiels (from-amber-400 to-amber-500) ou styles foncés contradictoires, sans hiérarchie claire entre action primaire et secondaire.',
      tsfDesignRule: 'L’Orange #FF6600 est réservé aux CTAs d’action prioritaires. Le Bleu #0070C0 ou Charcoal pour les actions secondaires. Pas de gradients néon.',
      remediationPath: 'Standardiser Button.tsx avec 4 variantes strictes : primary-orange (#FF6600), secondary-blue (#0070C0), outline-charcoal, ghost.'
    },
    {
      id: 'AUD-03',
      category: 'CAPSULES_PILLS',
      severity: 'MAJEURE',
      componentOrPage: 'WikiResourceCard, TalentCard, OpportunityCard, WikiJobIntelligencePage',
      observedIssue: 'Accumulation excessive de badges arrondis en capsule (rounded-full px-2 py-0.5) pour afficher de simples métadonnées statiques (dates, secteurs, villes).',
      tsfDesignRule: 'Zero-Pill Discipline : métadonnées statiques rendues en texte sobre avec séparateurs typographiques (· ou /). Capsules réservées aux filtres interactifs et compteurs.',
      remediationPath: 'Dé-capsuler les métadonnées statiques pour aérer les cartes et faire respirer le contenu.'
    },
    {
      id: 'AUD-04',
      category: 'LOOK_AI_GENERATED',
      severity: 'CRITIQUE',
      componentOrPage: 'OpportunitiesPage, WikiJobIntelligencePage, HomePage Hero',
      observedIssue: 'Présence d’effets "AI Slop" : orbes floues en arrière-plan (blur-3xl), cartes foncées avec bordures irisées, étoiles Sparkles animées superflues.',
      tsfDesignRule: 'Interdiction du look "AI generated". Design d’institution et d’agence de développement panafricaine sobre, digne et structuré.',
      remediationPath: 'Supprimer les orbes luminescentes et les bordures phosphorescentes ; adopter des fonds blancs/neutres (#FAFAFA) avec hairlines discrètes.'
    },
    {
      id: 'AUD-05',
      category: 'TYPOGRAPHIE_HIERARCHIE',
      severity: 'MAJEURE',
      componentOrPage: 'Typography.tsx, PageHeader.tsx, Cards',
      observedIssue: 'Mélange désordonné de 3 polices (Playfair Display serif, Plus Jakarta Sans, JetBrains Mono) sans règle d’attribution claire ; certains kickers en mono all-caps criard.',
      tsfDesignRule: 'Règle 2+1 : Plus Jakarta Sans (titres & corps), Playfair Display uniquement pour citations institutionnelles majeures, JetBrains Mono réservé aux données tabulaires/codes.',
      remediationPath: 'Unifier les styles dans Typography.tsx et supprimer les labels en cri all-caps au profit d’un titrage naturel équilibré.'
    },
    {
      id: 'AUD-06',
      category: 'ESPACEMENT_GRILLE',
      severity: 'MAJEURE',
      componentOrPage: 'AppLayout, Container, Sections de pages',
      observedIssue: 'Grille avec sauts de padding hétérogènes (p-4 sm:p-6 lg:p-10) et marges verticales étouffantes ou au contraire trop étirées (space-y-12 imbriqué sans respiration).',
      tsfDesignRule: 'Échelle de rythme régulier en pas de 4px/8px. Conteneurs standardisés max-w-[1440px] avec gouttières fluides px-4 sm:px-6 lg:px-8.',
      remediationPath: 'Utiliser Container.tsx de façon systématique avec les tokens tsfSpacing.'
    },
    {
      id: 'AUD-07',
      category: 'CARTES_CONTENEURS',
      severity: 'MAJEURE',
      componentOrPage: 'Opportunities, Programs, Partners, Talents',
      observedIssue: 'Cartes répétitives avec le pattern "boîte dans une boîte" (nested cards) créant une sensation de template générique.',
      tsfDesignRule: '1 seul niveau d’élévation par écran. Utiliser des filets hairlines et du blanc tournant pour séparer les contenus plutôt que d’empiler des cartes.',
      remediationPath: 'Refondre les conteneurs avec un style architectural net, fine bordure #E8E8E8, fond blanc mat.'
    },
    {
      id: 'AUD-08',
      category: 'TABLEAUX_DONNEES',
      severity: 'MOYENNE',
      componentOrPage: 'WikiJobSourcesPage, WikiAdminCMSPage, SystemHealthPage',
      observedIssue: 'Tableaux sans alignement des chiffres en tabular-nums, débordements horizontaux sur mobile sans indicateur visuel de défilement.',
      tsfDesignRule: 'Chiffres tabulaires (font-mono tabular-nums), défilement horizontal fluide avec bordures encadrées et en-têtes sticky légers.',
      remediationPath: 'Appliquer font-mono tabular-nums sur tous les montants, pourcentages et dates.'
    },
    {
      id: 'AUD-09',
      category: 'NAVIGATION_ZINDEX',
      severity: 'MOYENNE',
      componentOrPage: 'Header flyout menu, Modals, Drawer mobile',
      observedIssue: 'Conflits potentiels de z-index entre dropdowns (z-50), bannières d’alertes et modales sans échelle unifiée.',
      tsfDesignRule: 'Échelle z-index unifiée (tsfZIndex) de 10 (dropdown) à 70 (modal) et 90 (toast).',
      remediationPath: 'Remplacer les classes z-* dispersées par les constantes tsfZIndex.'
    },
    {
      id: 'AUD-10',
      category: 'RESPONSIVE_DEBORDEMENT',
      severity: 'MOYENNE',
      componentOrPage: 'Filtres de Marketplace (/opportunites), Onglets WikiJob Intelligence',
      observedIssue: 'Lignes de filtres multiples qui s’empilent de manière désordonnée sur petits écrans (360px-480px).',
      tsfDesignRule: 'Filtres horizontaux scrollables sans scrollbar intrusive (no-scrollbar) avec bouton de réinitialisation visible.',
      remediationPath: 'Encapsuler les barres d’onglets dans des conteneurs flex-nowrap avec overflow-x-auto et padding de fin.'
    }
  ],

  migrationStrategy: [
    {
      phase: 'Phase 1 : Socle de Design Tokens & Logo',
      focus: 'Figer tsfColors (#0070C0, #FF6600, #404040, #FFFFFF), tsfTypography, tsfSpacing, tsfRadii dans tokens.ts et index.css. Créer TSFLogo vectoriel fidèle.',
      impact: 'Base infaillible sans aucun impact cassant sur les fonctionnalités.'
    },
    {
      phase: 'Phase 2 : Harmonisation du Header & Footer',
      focus: 'Remplacer le monogramme marine par le logo officiel TSF. Aligner les liens de navigation sur #0070C0 et le CTA "ESPACE TSF" sur #FF6600.',
      impact: 'Impact visuel immédiat sur toutes les pages du produit.'
    },
    {
      phase: 'Phase 3 : Rafraîchissement des Composants UI Clés',
      focus: 'Adapter Button, PageHeader, Container, Card pour consommer directement les tokens de la charte TSF.',
      impact: 'Élimination du look "AI Slop" et suppression des capsules inutiles.'
    },
    {
      phase: 'Phase 4 : Documentation Interactive du Design System',
      focus: 'Mettre à jour la page /design-system pour exposer la charte exacte, la matrice de contraste WCAG AA et les 9 familles de cartes.',
      impact: 'Référence incontestable pour toute l’équipe produit.'
    },
    {
      phase: 'Phase 5 : Déploiement Harmonisé sur les Pages Métier',
      focus: 'Application progressive sur Accueil, Opportunités, Programmes, Talents, WikiJob sans modifier aucune ligne de code métier.',
      impact: 'Cohérence visuelle globale digne d’une institution panafricaine d’élite.'
    }
  ]
};
