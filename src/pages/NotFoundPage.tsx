import React from 'react';
import { useRouter } from '../hooks/useRouter';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="py-24 text-center">
      <Container size="narrow">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF6600]">
          Erreur 404 — Page Non Trouvée
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#262626] font-sans mt-2 mb-4">
          Ressource ou Document Introuvable
        </h1>
        <p className="text-sm sm:text-base text-[#595959] mb-8 max-w-md mx-auto leading-relaxed font-sans">
          La page que vous recherchez n'existe pas ou a été déplacée dans le cadre de la refonte du portail officiel TSF.
        </p>

        <div className="flex justify-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/')}
            icon={<Home className="w-4 h-4" />}
            iconPosition="left"
          >
            Retourner à l'accueil
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/programmes')}
          >
            Consulter les programmes
          </Button>
        </div>
      </Container>
    </div>
  );
};
