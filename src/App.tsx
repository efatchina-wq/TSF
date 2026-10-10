/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RouterProvider, useRouter } from './hooks/useRouter';
import { AppLayout } from './components/layout/AppLayout';
import { HomePage } from './pages/home/HomePage';
import { AboutPage } from './pages/about/AboutPage';
import { ProgramsPage } from './pages/programs/ProgramsPage';
import { TalentsPage } from './pages/talents/TalentsPage';
import { PartnersPage } from './pages/partners/PartnersPage';
import { OpportunitiesPage } from './pages/opportunities/OpportunitiesPage';
import { CertificationPage } from './pages/certification/CertificationPage';
import { ImpactPage } from './pages/impact/ImpactPage';
import { MediaPage } from './pages/media/MediaPage';
import { ResourcesPage } from './pages/resources/ResourcesPage';
import { ContactPage } from './pages/contact/ContactPage';
import { EspaceTsfPage } from './pages/espace-tsf/EspaceTsfPage';
import { AdminPage } from './pages/admin/AdminPage';
import { DesignSystemPage } from './pages/design-system/DesignSystemPage';
import { WikiJobSourcesPage } from './pages/wikijob/WikiJobSourcesPage';
import { WikiJobSourceDetailPage } from './pages/wikijob/WikiJobSourceDetailPage';
import { WikiKnowledgeHubPage } from './pages/wikijob/WikiKnowledgeHubPage';
import { WikiResourceDetailPage } from './pages/wikijob/WikiResourceDetailPage';
import { WikiAdminCMSPage } from './pages/admin/wikijob/WikiAdminCMSPage';
import { WikiJobAdminSourcesPage } from './pages/admin/wikijob/WikiJobAdminSourcesPage';
import { WikiJobAggregationEnginePage } from './pages/admin/wikijob/WikiJobAggregationEnginePage';
import { WikiJobSchedulerJobsPage } from './pages/admin/wikijob/WikiJobSchedulerJobsPage';
import { WikiJobIntelligencePage } from './pages/wikijob/WikiJobIntelligencePage';
import { NotFoundPage } from './pages/NotFoundPage';

function RouteSwitch() {
  const { currentPath } = useRouter();

  if (currentPath === '/') {
    return <HomePage />;
  }

  if (currentPath.startsWith('/organisation')) {
    return <AboutPage />;
  }

  if (currentPath.startsWith('/programmes')) {
    return <ProgramsPage />;
  }

  if (currentPath.startsWith('/talents')) {
    return <TalentsPage />;
  }

  if (currentPath.startsWith('/partenaires')) {
    return <PartnersPage />;
  }

  if (currentPath === '/opportunites') {
    return <OpportunitiesPage />;
  }

  if (currentPath === '/wikijob/intelligence' || currentPath.startsWith('/wikijob/intelligence')) {
    return <WikiJobIntelligencePage />;
  }

  if (currentPath === '/wikijob' || currentPath === '/wikijob/wiki') {
    return <WikiKnowledgeHubPage />;
  }

  if (currentPath.startsWith('/wikijob/wiki/')) {
    return <WikiResourceDetailPage />;
  }

  if (currentPath === '/wikijob/sources') {
    return <WikiJobSourcesPage />;
  }

  if (currentPath.startsWith('/wikijob/sources/')) {
    return <WikiJobSourceDetailPage />;
  }

  if (currentPath === '/certification' || currentPath.startsWith('/certification/')) {
    return <CertificationPage />;
  }

  if (currentPath === '/impact') {
    return <ImpactPage />;
  }

  if (currentPath === '/media') {
    return <MediaPage />;
  }

  if (currentPath === '/ressources') {
    return <ResourcesPage />;
  }

  if (currentPath === '/contact') {
    return <ContactPage />;
  }

  if (currentPath === '/espace-tsf') {
    return <EspaceTsfPage />;
  }

  if (currentPath === '/admin/wikijob/wiki' || currentPath.startsWith('/admin/wikijob/wiki') || currentPath === '/admin/wikijob/cms') {
    return <WikiAdminCMSPage />;
  }

  if (currentPath === '/admin/wikijob/jobs' || currentPath.startsWith('/admin/wikijob/jobs')) {
    return <WikiJobSchedulerJobsPage />;
  }

  if (currentPath === '/admin/wikijob/engine' || currentPath.startsWith('/admin/wikijob/engine') || currentPath === '/admin/wikijob/aggregation') {
    return <WikiJobAggregationEnginePage />;
  }

  if (currentPath === '/admin/wikijob/sources' || currentPath.startsWith('/admin/wikijob/sources')) {
    return <WikiJobAdminSourcesPage />;
  }

  if (currentPath.startsWith('/admin')) {
    return <AdminPage />;
  }

  if (currentPath === '/design-system') {
    return <DesignSystemPage />;
  }

  return <NotFoundPage />;
}

export default function App() {
  return (
    <RouterProvider>
      <AppLayout>
        <RouteSwitch />
      </AppLayout>
    </RouterProvider>
  );
}
