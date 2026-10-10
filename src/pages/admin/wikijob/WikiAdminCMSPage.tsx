import React, { useState } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { Container } from '../../../components/ui/Container';
import { useWikiResources } from '../../../hooks/useWikiResources';
import { useRouter } from '../../../hooks/useRouter';
import { 
  WikiResource, 
  WikiCategory, 
  WikiContentType
} from '../../../types/wiki';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  RotateCcw, 
  ShieldCheck, 
  ExternalLink, 
  BookOpen, 
  X, 
  Search, 
  FileText, 
  ArrowRight,
  Database,
  SlidersHorizontal,
  Layers,
  Radio
} from 'lucide-react';

const CATEGORIES_OPTIONS: WikiCategory[] = [
  'EMPLOI',
  'STAGE',
  'VOLONTARIAT',
  'FORMATION',
  'ENTREPRENEURIAT',
  'FINANCEMENT',
  'BOURSES',
  'CONCOURS',
  'CARRIÈRE',
  'CV',
  'ENTRETIEN',
  'LINKEDIN',
  'DIGITAL',
  'ADMINISTRATION',
  'MOBILITÉ',
  'ÉTUDES',
  'ORGANISATIONS'
];

const CONTENT_TYPES_OPTIONS: WikiContentType[] = [
  'GUIDE',
  'ASTUCE',
  'TUTORIEL',
  'CHECKLIST',
  'RESSOURCE',
  'SITE UTILE',
  'ACTUALITÉ',
  'DOSSIER',
  'FAQ'
];

export const WikiAdminCMSPage: React.FC = () => {
  const { resources, createResource, updateResource, deleteResource, resetDefaults } = useWikiResources();
  const { navigate } = useRouter();

  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCatFilter, setSelectedCatFilter] = useState<string>('ALL');
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<WikiResource | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    title: string;
    slug: string;
    category: WikiCategory;
    content_type: WikiContentType;
    summary: string;
    content: string;
    tags: string;
    source_name: string;
    source_url: string;
    is_tsf_original: boolean;
    author: string;
    status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
    featured: boolean;
    read_time_minutes: number;
    checklist_raw: string;
  }>({
    title: '',
    slug: '',
    category: 'EMPLOI',
    content_type: 'GUIDE',
    summary: '',
    content: '',
    tags: 'Emploi, Bénin, Guide',
    source_name: 'TSF Éditions Bénin',
    source_url: '',
    is_tsf_original: true,
    author: 'Pôle Éditorial TSF',
    status: 'PUBLISHED',
    featured: false,
    read_time_minutes: 5,
    checklist_raw: ''
  });

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleOpenCreate = () => {
    setEditingResource(null);
    setFormData({
      title: '',
      slug: '',
      category: 'EMPLOI',
      content_type: 'GUIDE',
      summary: '',
      content: '',
      tags: 'Emploi, Bénin, Guide',
      source_name: 'TSF Éditions Bénin',
      source_url: '',
      is_tsf_original: true,
      author: 'Pôle Éditorial TSF',
      status: 'PUBLISHED',
      featured: false,
      read_time_minutes: 5,
      checklist_raw: ''
    });
    setIsEditorModalOpen(true);
  };

  const handleOpenEdit = (res: WikiResource) => {
    setEditingResource(res);
    setFormData({
      title: res.title,
      slug: res.slug,
      category: res.category,
      content_type: res.content_type,
      summary: res.summary,
      content: res.content,
      tags: (res.tags || []).join(', '),
      source_name: res.source.name,
      source_url: res.source.url || '',
      is_tsf_original: res.source.is_tsf_original,
      author: res.source.author || '',
      status: res.status,
      featured: !!res.featured,
      read_time_minutes: res.read_time_minutes || 5,
      checklist_raw: (res.checklist_items || []).map(i => i.text).join('\n')
    });
    setIsEditorModalOpen(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();

    const checklist_items = formData.checklist_raw
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean)
      .map((text, idx) => ({
        id: `chk_${idx + 1}`,
        text,
        completed_default: false
      }));

    const tagsArray = formData.tags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const generatedSlug = formData.slug.trim() 
      ? formData.slug.trim() 
      : formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    try {
      if (editingResource) {
        updateResource(editingResource.id, {
          title: formData.title,
          slug: generatedSlug,
          category: formData.category,
          content_type: formData.content_type,
          summary: formData.summary,
          content: formData.content,
          tags: tagsArray,
          read_time_minutes: formData.read_time_minutes,
          status: formData.status,
          featured: formData.featured,
          source: {
            name: formData.source_name,
            url: formData.source_url ? formData.source_url : undefined,
            is_tsf_original: formData.is_tsf_original,
            author: formData.author ? formData.author : undefined
          },
          checklist_items
        });
        showFeedback(`Ressource « ${formData.title} » mise à jour avec succès.`);
      } else {
        const now = new Date().toISOString();
        createResource({
          title: formData.title,
          slug: generatedSlug,
          category: formData.category,
          content_type: formData.content_type,
          summary: formData.summary,
          content: formData.content,
          tags: tagsArray,
          url: `/wikijob/wiki/${generatedSlug}`,
          published_at: now,
          updated_at: now,
          read_time_minutes: formData.read_time_minutes,
          status: formData.status,
          featured: formData.featured,
          source: {
            name: formData.source_name,
            url: formData.source_url ? formData.source_url : undefined,
            is_tsf_original: formData.is_tsf_original,
            author: formData.author ? formData.author : undefined
          },
          checklist_items
        });
        showFeedback(`Nouvelle ressource « ${formData.title} » publiée sur WikiJob.`);
      }
      setIsEditorModalOpen(false);
    } catch (err: any) {
      showFeedback(`Erreur : ${err.message}`);
    }
  };

  const handleDelete = (res: WikiResource) => {
    if (window.confirm(`Êtes-vous certain de vouloir supprimer l'article « ${res.title} » ?`)) {
      deleteResource(res.id);
      showFeedback(`Article supprimé du corpus WikiJob.`);
    }
  };

  const handleReset = () => {
    if (window.confirm('Voulez-vous réinitialiser le CMS avec les 8 rubriques de référence du guide de l\'emploi béninois ?')) {
      resetDefaults();
      showFeedback('Les 8 guides de référence ont été restaurés.');
    }
  };

  const filtered = resources.filter(res => {
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      const matchTitle = res.title.toLowerCase().includes(q);
      const matchSlug = res.slug.toLowerCase().includes(q);
      const matchSource = res.source.name.toLowerCase().includes(q);
      if (!matchTitle && !matchSlug && !matchSource) return false;
    }
    if (selectedCatFilter !== 'ALL' && res.category !== selectedCatFilter) {
      return false;
    }
    return true;
  });

  const publishedCount = resources.filter(r => r.status === 'PUBLISHED').length;
  const originalCount = resources.filter(r => r.source.is_tsf_original).length;
  const externalCount = resources.filter(r => !r.source.is_tsf_original).length;

  return (
    <div className="pb-24 space-y-8 font-sans">
      <PageHeader
        kicker="GESTIONNAIRE ÉDITORIAL & BASE DE CONNAISSANCES"
        title="WikiJob CMS — Guide Pratique & Ressources Bénin"
        description="Administration des 17 rubriques de conseils pratiques (CV, entretien, démarches administratives, 50 sites d'emploi au Bénin) avec traçabilité et attribution stricte des sources."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/wikijob/wiki')}
              className="px-3.5 py-2 border border-slate-300 hover:bg-slate-50 text-[#404040] text-xs font-mono font-medium rounded-xl cursor-pointer transition-colors"
            >
              Consulter le Guide Public
            </button>
            <button
              type="button"
              onClick={handleOpenCreate}
              className="px-4 py-2 bg-[#0070C0] hover:bg-[#005FA3] text-white font-mono font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4 text-white" />
              <span>Rédiger une Ressource</span>
            </button>
          </div>
        }
      />

      <Container>
        <div className="space-y-6">
          {/* Notification feedback */}
          {feedback && (
            <div className="p-4 bg-slate-900 text-white rounded-2xl border border-[#0070C0]/50 flex items-center justify-between shadow-lg text-xs font-mono animate-in fade-in">
              <div className="flex items-center gap-2.5">
                <Radio className="w-4 h-4 text-[#FF6600] animate-pulse shrink-0" />
                <span>{feedback}</span>
              </div>
              <button
                type="button"
                onClick={() => setFeedback(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 1. INFORMATIONS PRIORITAIRES & STATUS BAR                                  */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EBF5FC] text-[#0070C0] border border-[#A3D1F1] flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6 text-[#0070C0]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase text-[#0070C0] tracking-wider">
                    CORPUS ÉDITORIAL WIKIJOB
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-[#0E8A5E] border border-emerald-200">
                    INDEXÉ & EN LIGNE
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-[#262626] font-sans mt-0.5">
                  {publishedCount} guides pratiques disponibles pour les jeunes diplômés béninois
                </h3>
                <p className="text-xs text-[#404040] mt-0.5">
                  Chaque article garantit une attribution transparente, avec mention explicite des auteurs et organismes officiels.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleReset}
                className="px-3.5 py-2.5 border border-slate-200 hover:bg-slate-50 text-[#404040] rounded-xl text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Rétablir les 8 rubriques initiales de référence"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span>Rétablir 8 Guides Initiaux</span>
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 2. INDICATEURS CLÉS                                                       */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase font-bold block">
                TOTAL RESSOURCES
              </span>
              <strong className="text-2xl font-extrabold text-[#0070C0] font-mono block">
                {resources.length}
              </strong>
              <span className="text-[11px] text-[#404040]">Guides, astuces & tutoriels</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-xs space-y-1">
              <span className="text-[11px] font-mono text-[#0E8A5E] uppercase font-bold block">
                PUBLIÉES EN LIGNE
              </span>
              <strong className="text-2xl font-extrabold text-[#0E8A5E] font-mono block">
                {publishedCount}
              </strong>
              <span className="text-[11px] text-emerald-800">Visibles dans l'espace public</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] font-mono text-[#0070C0] uppercase font-bold block">
                ORIGINAUX TSF
              </span>
              <strong className="text-2xl font-extrabold text-[#0070C0] font-mono block">
                {originalCount}
              </strong>
              <span className="text-[11px] text-[#404040]">Production interne homologuée</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] font-mono text-purple-700 uppercase font-bold block">
                SOURCES ATTRIBUÉES
              </span>
              <strong className="text-2xl font-extrabold text-purple-700 font-mono block">
                {externalCount}
              </strong>
              <span className="text-[11px] text-purple-700">Organismes externes cités</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 3. BARRE DE RECHERCHE & FILTRES                                           */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Rechercher par titre, slug, source, mot-clé..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#262626] outline-none focus:ring-2 focus:ring-[#0070C0] focus:bg-white transition-all font-sans"
                />
              </div>

              <div className="w-full sm:w-auto shrink-0">
                <select
                  value={selectedCatFilter}
                  onChange={(e) => setSelectedCatFilter(e.target.value)}
                  className="w-full sm:w-64 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-[#404040] outline-none focus:ring-2 focus:ring-[#0070C0] cursor-pointer"
                >
                  <option value="ALL">Toutes les catégories</option>
                  {CATEGORIES_OPTIONS.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 4. TABLE DESKTOP                                                          */}
          {/* ========================================================================= */}
          <div className="hidden lg:block bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-4 px-5">Titre & Format</th>
                    <th className="py-4 px-4">Catégorie</th>
                    <th className="py-4 px-4">Attribution de Source</th>
                    <th className="py-4 px-4">Statut</th>
                    <th className="py-4 px-4 text-center">Consultations</th>
                    <th className="py-4 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {filtered.map(res => (
                    <tr key={res.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-5 max-w-xs">
                        <div className="space-y-0.5">
                          <strong className="text-[#262626] block font-bold truncate text-sm" title={res.title}>
                            {res.title}
                          </strong>
                          <div className="text-[11px] font-mono text-[#7D7D7D] flex items-center gap-1.5">
                            <span className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-700 font-bold">{res.content_type}</span>
                            <span>•</span>
                            <span className="truncate max-w-[140px] text-slate-500">{res.slug}</span>
                            <span>•</span>
                            <span>{res.read_time_minutes || 5} min</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 font-mono">
                        <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#EBF5FC] text-[#0070C0] border border-[#A3D1F1]">
                          {res.category}
                        </span>
                      </td>

                      <td className="py-4 px-4 font-mono">
                        {res.source.is_tsf_original ? (
                          <span className="inline-flex items-center gap-1.5 text-[#0070C0] font-bold text-[11px]">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#0070C0] shrink-0" />
                            <span>TSF Original ({res.source.name})</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-[#404040] text-[11px]">
                            <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>Externe : {res.source.name}</span>
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4 font-mono">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          res.status === 'PUBLISHED' 
                            ? 'bg-emerald-100 text-[#0E8A5E] border border-emerald-300' 
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {res.status}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-center font-mono text-[#404040]">
                        {res.views_count || 0}
                      </td>

                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(res)}
                            className="p-1.5 border border-slate-200 hover:bg-slate-100 rounded-lg text-[#404040] hover:text-[#0070C0] cursor-pointer transition-colors"
                            title="Modifier la ressource"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => navigate(`/wikijob/wiki/${res.slug}`)}
                            className="p-1.5 border border-slate-200 hover:bg-slate-100 rounded-lg text-[#404040] hover:text-[#0070C0] cursor-pointer transition-colors"
                            title="Consulter l'article"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(res)}
                            className="p-1.5 border border-slate-200 hover:bg-rose-50 hover:border-rose-200 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filtered.length === 0 && (
              <div className="p-10 text-center text-xs text-slate-500 font-mono">
                Aucune ressource ne correspond aux critères de filtre.
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* 4. ADAPTATION MOBILE (CARTES SANS SCROLL HORIZONTAL)                        */}
          {/* ========================================================================= */}
          <div className="lg:hidden space-y-3 font-sans">
            {filtered.map(res => (
              <div key={res.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-[#0070C0] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {res.category} • {res.content_type}
                    </span>
                    <h4 className="font-bold text-sm text-[#262626] mt-1.5">{res.title}</h4>
                    <p className="text-xs text-[#7D7D7D] font-mono mt-0.5">{res.slug}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                    res.status === 'PUBLISHED' ? 'bg-emerald-100 text-[#0E8A5E]' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {res.status}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono space-y-1">
                  <div className="flex justify-between text-[#404040]">
                    <span>Source :</span>
                    <strong className="text-[#262626]">{res.source.name}</strong>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Origine :</span>
                    <span>{res.source.is_tsf_original ? 'TSF Original' : 'Source Externe'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="font-mono text-slate-400">{res.views_count || 0} vues</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(res)}
                      className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-[#404040] rounded-lg text-xs font-mono cursor-pointer"
                    >
                      Modifier
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate(`/wikijob/wiki/${res.slug}`)}
                      className="px-3 py-1.5 bg-[#0070C0] text-white rounded-lg text-xs font-mono font-bold cursor-pointer"
                    >
                      Voir
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(res)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 border border-slate-200 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* ========================================================================= */}
      {/* MODAL: CREATE / EDIT WIKI RESOURCE                                        */}
      {/* ========================================================================= */}
      {isEditorModalOpen && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto overscroll-contain flex min-h-full items-center justify-center p-3 sm:p-6 text-center animate-in fade-in duration-200">
          <div
            onClick={() => setIsEditorModalOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity cursor-pointer"
          />

          <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)] text-left">
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 bg-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0070C0] text-white flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#262626]">
                    {editingResource ? `Modifier « ${editingResource.title} »` : 'Rédiger une ressource pour le corpus WikiJob'}
                  </h3>
                  <span className="text-xs text-[#7D7D7D] font-mono">
                    Publication pratique pour l'insertion des jeunes au Bénin
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditorModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="overflow-y-auto overscroll-contain flex-1 p-5 sm:p-6 space-y-6 text-xs font-sans">
              {/* Section 1: Métadonnées */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0070C0] uppercase tracking-wider">
                  <FileText className="w-4 h-4" />
                  <span>1. Métadonnées de l'Article</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-mono text-[#404040] font-bold block">
                      TITRE DE LA RESSOURCE *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: 50 sites pour trouver un emploi ou stage au Bénin"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-[#262626] outline-none focus:ring-2 focus:ring-[#0070C0] focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[#404040] font-bold block">
                      SLUG URL (optionnel)
                    </label>
                    <input
                      type="text"
                      placeholder="50-sites-emploi-benin"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs outline-none focus:ring-2 focus:ring-[#0070C0] focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[#404040] font-bold block">
                      CATÉGORIE THÉMATIQUE *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as WikiCategory })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs outline-none focus:ring-2 focus:ring-[#0070C0]"
                    >
                      {CATEGORIES_OPTIONS.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[#404040] font-bold block">
                      FORMAT ÉDITORIAL *
                    </label>
                    <select
                      value={formData.content_type}
                      onChange={(e) => setFormData({ ...formData, content_type: e.target.value as WikiContentType })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs outline-none focus:ring-2 focus:ring-[#0070C0]"
                    >
                      {CONTENT_TYPES_OPTIONS.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[#404040] font-bold block">
                      TEMPS DE LECTURE (MINUTES)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={60}
                      value={formData.read_time_minutes}
                      onChange={(e) => setFormData({ ...formData, read_time_minutes: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs outline-none focus:ring-2 focus:ring-[#0070C0]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Attribution et Origine */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0070C0] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>2. Attribution & Provenance</span>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex flex-wrap items-center gap-6">
                    <label className="inline-flex items-center gap-2 cursor-pointer font-mono text-[#404040]">
                      <input
                        type="radio"
                        name="origin"
                        checked={formData.is_tsf_original}
                        onChange={() => setFormData({ ...formData, is_tsf_original: true })}
                        className="text-[#0070C0] focus:ring-[#0070C0]"
                      />
                      <span>Contenu Original TSF (Production Interne)</span>
                    </label>

                    <label className="inline-flex items-center gap-2 cursor-pointer font-mono text-[#404040]">
                      <input
                        type="radio"
                        name="origin"
                        checked={!formData.is_tsf_original}
                        onChange={() => setFormData({ ...formData, is_tsf_original: false })}
                        className="text-[#0070C0] focus:ring-[#0070C0]"
                      />
                      <span>Source Externe Attribuée</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[#404040] block">Nom de la source *</label>
                      <input
                        type="text"
                        required
                        value={formData.source_name}
                        onChange={(e) => setFormData({ ...formData, source_name: e.target.value })}
                        placeholder="Ex: TSF Éditions ou ANPE Bénin"
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[#404040] block">URL de la source (si externe)</label>
                      <input
                        type="url"
                        value={formData.source_url}
                        onChange={(e) => setFormData({ ...formData, source_url: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[#404040] block">Auteur / Rédacteur</label>
                      <input
                        type="text"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        placeholder="Ex: Pôle Éditorial TSF"
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Corps de l'article */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0070C0] uppercase tracking-wider">
                  <Database className="w-4 h-4" />
                  <span>3. Contenu Rédactionnel & Markdown</span>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[#404040] font-bold block">
                    RÉSUMÉ INTRODUCTIF *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Bref résumé de la ressource qui s'affichera dans les listes..."
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#262626] outline-none focus:ring-2 focus:ring-[#0070C0] focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[#404040] font-bold block">
                    CORPS DÉTAILLÉ DE L'ARTICLE *
                  </label>
                  <textarea
                    rows={7}
                    required
                    placeholder="### 1. Introduction&#10;Contenu rédigé avec structure claire, paragraphes et conseils pratiques..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-[#262626] outline-none focus:ring-2 focus:ring-[#0070C0] focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[#404040] font-bold block">
                    CHECKLIST D'ACTIONS (Optionnel — 1 action par ligne)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Obtenir lettre de recommandation&#10;Préparer CV mono-colonne&#10;Téléverser les pièces en PDF"
                    value={formData.checklist_raw}
                    onChange={(e) => setFormData({ ...formData, checklist_raw: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#0070C0] focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[#404040] font-bold block">
                    MOTS-CLÉS / TAGS (séparés par des virgules)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="Emploi, Bénin, Stage, Recrutement"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs outline-none focus:ring-2 focus:ring-[#0070C0] focus:bg-white"
                  />
                </div>
              </div>

              {/* Section 4: Statut et Visibilité */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[#404040] font-bold">Statut :</span>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs outline-none focus:ring-2 focus:ring-[#0070C0]"
                  >
                    <option value="PUBLISHED">Publié (En ligne)</option>
                    <option value="DRAFT">Brouillon (Non visible)</option>
                    <option value="ARCHIVED">Archivé</option>
                  </select>
                </div>

                <label className="inline-flex items-center gap-2 cursor-pointer font-mono text-[#404040]">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded text-[#0070C0] focus:ring-[#0070C0]"
                  />
                  <span>Mettre en avant sur la page d'accueil Wiki</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsEditorModalOpen(false)}
                  className="px-5 py-2.5 border border-slate-200 rounded-xl font-mono text-[#404040] hover:bg-slate-50 cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#0070C0] hover:bg-[#005FA3] text-white font-mono font-bold rounded-xl cursor-pointer shadow-xs transition-colors"
                >
                  {editingResource ? 'Enregistrer les modifications' : 'Publier la ressource'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
