import React, { useState } from 'react';
import { useRouter } from '../../hooks/useRouter';
import { PageHeader } from '../../components/layout/PageHeader';
import { Container } from '../../components/ui/Container';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Shield, User, Building, Award, ArrowRight, Lock, KeyRound } from 'lucide-react';

export const EspaceTsfPage: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedRole, setSelectedRole] = useState<'talent' | 'partenaire' | 'evaluateur'>('talent');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [resetNotice, setResetNotice] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setLoggedIn(true);
    }
  };

  return (
    <div className="pb-20 space-y-10">
      <PageHeader
        kicker="Portail Numérique Sécurisé"
        title="Espace TSF — Infrastructure Digitale"
        description="Point d'accès unifié pour les talents évalués, lauréats certifiés, recruteurs accrédités et membres des jurys d'évaluation."
      />

      <Container>
        {loggedIn ? (
          <div className="max-w-4xl mx-auto bg-white border border-[#E8E8E8] rounded-xl p-8 sm:p-10 space-y-6 shadow-xs font-sans">
            <div className="flex items-center justify-between pb-6 border-b border-[#E8E8E8]">
              <div>
                <span className="text-xs font-mono uppercase text-[#0E8A5E] bg-[#ECFDF5] px-2.5 py-0.5 rounded-md font-bold border border-[#A7F3D0]">
                  Session Active
                </span>
                <h2 className="text-2xl font-bold text-[#262626] mt-2 font-sans">
                  Bienvenue sur votre Espace TSF
                </h2>
                <p className="text-xs text-[#7D7D7D] font-mono mt-0.5">
                  Profil connecté : {email} · Rôle : {selectedRole.toUpperCase()}
                </p>
              </div>

              <Button
                variant="tertiary"
                size="sm"
                onClick={() => setLoggedIn(false)}
              >
                Déconnexion
              </Button>
            </div>

            {/* Role specific quick panel */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <Card padding="md" hoverEffect className="border-l-4 border-l-[#0070C0]">
                <span className="text-xs font-mono text-[#7D7D7D] uppercase block">Statut Dossier</span>
                <h4 className="font-bold text-[#262626] mt-1">Évaluation Validée</h4>
                <p className="text-xs text-[#7D7D7D] mt-1">Index de Potentiel : 94 / 100</p>
              </Card>

              <Card padding="md" hoverEffect className="border-l-4 border-l-[#FF6600]">
                <span className="text-xs font-mono text-[#7D7D7D] uppercase block">Programme</span>
                <h4 className="font-bold text-[#262626] mt-1">Horizon Excellence</h4>
                <p className="text-xs text-[#7D7D7D] mt-1">Promotion 2026-2027</p>
              </Card>

              <Card padding="md" hoverEffect className="border-l-4 border-l-[#0E8A5E]">
                <span className="text-xs font-mono text-[#7D7D7D] uppercase block">Certification</span>
                <h4 className="font-bold text-[#262626] mt-1">Passeport Actif</h4>
                <p className="text-xs text-[#7D7D7D] mt-1">Certificat cryptographique prêt</p>
              </Card>
            </div>

            <div className="p-4 bg-[#F5F5F7] border border-[#E8E8E8] rounded-lg text-xs text-[#404040] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <span>Vous avez 2 notifications institutionnelles et 1 mission recommandée en attente.</span>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/talents/opportunites')}
              >
                Consulter mes opportunités
              </Button>
            </div>
          </div>
        ) : (
          <div className="max-w-xl mx-auto space-y-8 font-sans">
            {/* Role Switcher */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 p-1 bg-[#F5F5F7] border border-[#E8E8E8] rounded-xl">
              <button
                type="button"
                onClick={() => setSelectedRole('talent')}
                className={`py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedRole === 'talent'
                    ? 'bg-white text-[#0070C0] shadow-xs'
                    : 'text-[#595959] hover:text-[#262626]'
                }`}
              >
                Talent / Candidat
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('partenaire')}
                className={`py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedRole === 'partenaire'
                    ? 'bg-white text-[#0070C0] shadow-xs'
                    : 'text-[#595959] hover:text-[#262626]'
                }`}
              >
                Partenaire / Recruteur
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('evaluateur')}
                className={`py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedRole === 'evaluateur'
                    ? 'bg-white text-[#0070C0] shadow-xs'
                    : 'text-[#595959] hover:text-[#262626]'
                }`}
              >
                Jury / Évaluateur
              </button>
            </div>

            {/* Login Card */}
            <div className="bg-white border border-[#E8E8E8] rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#EBF5FC] text-[#0070C0] border border-[#A3D1F1] flex items-center justify-center">
                  <Lock className="w-5 h-5 text-[#0070C0]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#262626]">
                    Authentification Sécurisée
                  </h3>
                  <span className="text-xs text-[#7D7D7D] font-mono">
                    Accès réservé aux comptes homologués TSF
                  </span>
                </div>
              </div>

              {resetNotice && (
                <div className="p-3 bg-[#EBF5FC] border border-[#A3D1F1] rounded-lg text-xs text-[#004D85] flex items-center justify-between">
                  <span>{resetNotice}</span>
                  <button type="button" onClick={() => setResetNotice(null)} className="text-[#0070C0] font-bold text-xs ml-2 cursor-pointer">
                    ✕
                  </button>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#404040] mb-1">
                    Identifiant TSF ou Courriel
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="prenom.nom@candidat.tsf.org"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E8E8E8] rounded-lg focus:border-[#0070C0] focus:ring-2 focus:ring-[#0070C0]/20 outline-none text-[#262626]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-[#404040]">
                      Mot de passe
                    </label>
                    <button
                      type="button"
                      onClick={() => setResetNotice('Veuillez contacter le secrétariat TSF (contact@tsf.africa) pour réinitialiser vos identifiants.')}
                      className="text-[11px] text-[#0070C0] hover:underline cursor-pointer"
                    >
                      Identifiants perdus ?
                    </button>
                  </div>
                  <input
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E8E8E8] rounded-lg focus:border-[#0070C0] focus:ring-2 focus:ring-[#0070C0]/20 outline-none text-[#262626]"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  fullWidth
                  icon={<KeyRound className="w-3.5 h-3.5" />}
                >
                  Accéder à mon espace
                </Button>
              </form>

              <div className="pt-4 border-t border-[#E8E8E8] text-center">
                <span className="text-xs text-[#7D7D7D]">
                  Pas encore de dossier enregistré ?{' '}
                </span>
                <button
                  type="button"
                  onClick={() => navigate('/talents/inscription')}
                  className="text-xs font-bold text-[#0070C0] hover:underline cursor-pointer"
                >
                  Déposer une candidature d'évaluation
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};
