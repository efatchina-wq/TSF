import React, { useState } from 'react';
import { OSC_DIAGNOSTIC_QUESTIONS } from '../../data/partnersData';
import { 
  OscDiagnosticDimension, 
  OscMaturityResult, 
  MaturityLevelId 
} from '../../types/partner';
import { 
  ClipboardCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  Award, 
  Download, 
  ShieldAlert, 
  Sparkles, 
  ArrowRight, 
  Info 
} from 'lucide-react';

export const OscDiagnosticView: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [diagnosticResult, setDiagnosticResult] = useState<OscMaturityResult | null>(null);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const currentQ = OSC_DIAGNOSTIC_QUESTIONS[currentQuestionIndex];
  const totalQuestions = OSC_DIAGNOSTIC_QUESTIONS.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleSelectOption = (questionId: string, points: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: points
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateResult();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateResult = () => {
    let totalPoints = 0;
    const maxPoints = totalQuestions * 4;

    const dimensionScoresMap: Record<OscDiagnosticDimension, {
      label: string;
      scorePercent: number;
      pointsObtained: number;
      maxPoints: number;
      analysis: string;
    }> = {} as any;

    OSC_DIAGNOSTIC_QUESTIONS.forEach(q => {
      const pts = answers[q.id] || 2; // Default fallback if skipped
      totalPoints += pts;
      const dimPercent = Math.round((pts / 4) * 100);

      let analysis = '';
      if (dimPercent >= 75) {
        analysis = 'Niveau de maîtrise élevé, conforme aux standards institutionnels internationaux.';
      } else if (dimPercent >= 50) {
        analysis = 'Structuration solide mais nécessitant une formalisation des procédures écrites.';
      } else {
        analysis = 'Zone prioritaire de vulnérabilité nécessitant un renforcement d’urgence.';
      }

      dimensionScoresMap[q.dimension] = {
        label: q.dimensionLabel,
        scorePercent: dimPercent,
        pointsObtained: pts,
        maxPoints: 4,
        analysis
      };
    });

    const overallScorePercent = Math.round((totalPoints / maxPoints) * 100);

    let maturityId: MaturityLevelId = 'structuration';
    let maturityLabel = 'Structuration';
    let maturityDesc = 'L’organisation dispose des bases statutaires et opérationnelles, mais doit sécuriser ses processus fiduciaires et son modèle de financement.';
    let maturityColor = 'text-blue-600 bg-blue-50 border-blue-200';

    if (overallScorePercent >= 85) {
      maturityId = 'rayonnement';
      maturityLabel = 'Rayonnement Institutionnel';
      maturityDesc = 'Excellence avérée sur l’ensemble des fonctions critiques, capacité à porter des consortiums panafricains et à inspirer la société civile.';
      maturityColor = 'text-emerald-700 bg-emerald-50 border-emerald-300';
    } else if (overallScorePercent >= 70) {
      maturityId = 'consolidation';
      maturityLabel = 'Consolidation';
      maturityDesc = 'Organisation mature, reconnue par ses pairs et prête à absorber des subventions pluriannuelles substantielles avec suivi d’impact rigoureux.';
      maturityColor = 'text-purple-700 bg-purple-50 border-purple-200';
    } else if (overallScorePercent < 40) {
      maturityId = 'emergence';
      maturityLabel = 'Émergence';
      maturityDesc = 'Phase d’amorçage communautaire avec fort engagement citoyen mais vulnérabilités administratives et financières aiguës.';
      maturityColor = 'text-amber-700 bg-amber-50 border-amber-200';
    }

    const recommendations = [
      {
        dimension: 'Gouvernance & Redevabilité',
        title: 'Mise en place d’une Charte Éthique & Renouvellement Périodique du Conseil',
        actionPlan: 'Formaliser les délégations de pouvoirs, créer un registre des conflits d’intérêts et instaurer une revue annuelle par les membres fondateurs.',
        recommendedTsfProgram: 'Séminaire Croissance & Métanoïa — Éthique Publique & Gouvernance',
        timeframe: 'Mois 1 à 3'
      },
      {
        dimension: 'Financement & Diversification',
        title: 'Développement d’Activités Génératrices de Revenus (AGR) & Réserve de Sécurité',
        actionPlan: 'Structurer au moins une prestation de services rémunérée ou cotisation communautaire pour constituer 6 mois de fonds de roulement autonome.',
        recommendedTsfProgram: 'Guichet d’Accompagnement SourceFund Africa — Ingénierie Financière',
        timeframe: 'Mois 3 à 6'
      },
      {
        dimension: 'Digitalisation & Suivi-Évaluation',
        title: 'Adoption d’un Outil de Collecte Numérique Terrain & Données Désagrégées',
        actionPlan: 'Migrer les questionnaires papier vers un outil open-source (KoboToolbox/ODK) et formaliser le cadre logique avec cibles annuelles.',
        recommendedTsfProgram: 'Ateliers Techniques Hubs Régionaux TSF — Data & Souveraineté',
        timeframe: 'Mois 2 à 4'
      }
    ];

    setDiagnosticResult({
      overallScorePercent,
      maturityLevel: {
        id: maturityId,
        label: maturityLabel,
        description: maturityDesc,
        color: maturityColor
      },
      dimensionScores: dimensionScoresMap,
      priorityRecommendations: recommendations,
      evaluatedAt: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      disclaimerNote: 'Ce score doit être présenté comme un outil d’orientation interne et non comme une certification officielle.'
    });
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setDiagnosticResult(null);
  };

  return (
    <div className="space-y-10">
      {/* Intro Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#B45309] font-bold uppercase tracking-wider">
          <ClipboardCheck className="w-4 h-4" />
          <span>OUTIL D'AUTO-ÉVALUATION & DE STRUCTURATION</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1B3D]">
          TSF OSC DIAGNOSTIC — Indice de Maturité Organisationnelle
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
          Évaluez en 7 questions fondamentales la solidité de votre organisation de la société civile (OSC) sur les axes de gouvernance, financement, digitalisation, ressources humaines, communication, suivi-évaluation et mobilisation de ressources.
        </p>

        {/* MANDATORY DISCLAIMER CALLOUT BANNER */}
        <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-xs text-amber-900 space-y-1">
          <div className="flex items-center gap-1.5 font-bold uppercase font-mono tracking-wide text-amber-800">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Mention Méthodologique Importante</span>
          </div>
          <p className="font-medium">
            Ce score doit être présenté comme un outil d'orientation interne et non comme une certification officielle. Il constitue un miroir d'auto-évaluation destiné à identifier vos priorités de renforcement et à cibler les appuis techniques TSF.
          </p>
        </div>
      </div>

      {/* QUESTIONNAIRE PROGRESS & ACTIVE STEP */}
      {!diagnosticResult ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-500">
              <span>Dimension {currentQuestionIndex + 1} sur {totalQuestions} : <strong>{currentQ.dimensionLabel}</strong></span>
              <span>{Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-[#0B1B3D] h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-mono text-[#B45309] font-bold uppercase tracking-wider block">
              Question {currentQuestionIndex + 1}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-[#0B1B3D]">
              {currentQ.text}
            </h3>
            <p className="text-xs text-slate-500 italic">
              {currentQ.explanation}
            </p>
          </div>

          {/* Options Radio List */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt, idx) => {
              const isSelected = answers[currentQ.id] === opt.points;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(currentQ.id, opt.points)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? 'border-[#0B1B3D] bg-slate-50 shadow-xs ring-1 ring-[#0B1B3D]'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected ? 'border-[#0B1B3D] bg-[#0B1B3D]' : 'border-slate-300'
                  }`}>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 block">
                      {opt.label}
                    </span>
                    <p className="text-xs text-slate-600">
                      {opt.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Stepper Navigation */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-mono text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Précédent</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!answers[currentQ.id]}
              className="px-6 py-2.5 rounded-lg bg-[#0B1B3D] hover:bg-[#122856] text-white text-xs font-mono font-medium disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-xs"
            >
              <span>{isLastQuestion ? 'Calculer le diagnostic' : 'Suivant'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* STRUCTURED RESULT : MATURITÉ ORGANISATIONNELLE */
        <div className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#B45309] font-bold block">
                  BILAN DU DIAGNOSTIC TSF
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0B1B3D]">
                  Rapport de Maturité Organisationnelle
                </h3>
                <span className="text-xs font-mono text-slate-500 block mt-0.5">
                  Évaluation réalisée le {diagnosticResult.evaluatedAt}
                </span>
              </div>

              <button
                onClick={handleReset}
                className="px-3.5 py-2 border border-slate-300 rounded-lg text-xs font-mono text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Recommencer le test</span>
              </button>
            </div>

            {/* Score & Maturity Level Header Card */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-6 bg-slate-50 rounded-2xl border border-slate-200/80">
              <div className="md:col-span-4 text-center border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-6 space-y-1">
                <span className="text-xs font-mono text-slate-500 uppercase block">SCORE GLOBAL</span>
                <div className="text-5xl font-extrabold font-mono text-[#0B1B3D]">
                  {diagnosticResult.overallScorePercent}<span className="text-2xl text-slate-400">/100</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-2">
                  <div 
                    className="bg-[#0B1B3D] h-full rounded-full" 
                    style={{ width: `${diagnosticResult.overallScorePercent}%` }}
                  />
                </div>
              </div>

              <div className="md:col-span-8 space-y-2">
                <span className="text-xs font-mono text-slate-500 uppercase block">PALIER DE MATURITÉ ÉVALUÉ :</span>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold font-mono border ${diagnosticResult.maturityLevel.color}`}>
                  {diagnosticResult.maturityLevel.label}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {diagnosticResult.maturityLevel.description}
                </p>
              </div>
            </div>

            {/* Crucial Disclaimer Reminder in Result */}
            <div className="p-3.5 bg-amber-50/80 border border-amber-300 rounded-xl text-xs text-amber-900 font-mono flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Avertissement :</strong> {diagnosticResult.disclaimerNote}
              </span>
            </div>

            {/* Breakdown of the 7 Dimensions */}
            <div className="space-y-4">
              <h4 className="text-base font-bold text-[#0B1B3D] font-mono uppercase tracking-wide">
                Détail des 7 Piliers Évalués :
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(diagnosticResult.dimensionScores).map(([key, val]) => (
                  <div key={key} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-900">{val.label}</span>
                      <span className="font-mono font-bold text-[#0B1B3D]">{val.scorePercent}%</span>
                    </div>

                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          val.scorePercent >= 75 ? 'bg-emerald-600' : val.scorePercent >= 50 ? 'bg-[#0B1B3D]' : 'bg-amber-600'
                        }`}
                        style={{ width: `${val.scorePercent}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-slate-600 leading-snug">
                      {val.analysis}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Structured Recommendations */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B45309]" />
                <h4 className="text-base font-bold text-[#0B1B3D] font-mono uppercase tracking-wide">
                  Recommandations Stratégiques & Plan d'Appui TSF :
                </h4>
              </div>

              <div className="space-y-4">
                {diagnosticResult.priorityRecommendations.map((rec, i) => (
                  <div key={i} className="p-5 border border-slate-200 rounded-xl bg-white space-y-2 shadow-2xs">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-bold uppercase">
                        {rec.dimension} • Horizon : {rec.timeframe}
                      </span>
                      <span className="text-[11px] font-mono text-[#B45309] font-bold">
                        Appui recommandé : {rec.recommendedTsfProgram}
                      </span>
                    </div>

                    <h5 className="font-bold text-sm text-[#0B1B3D]">{rec.title}</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">{rec.actionPlan}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs text-[#7D7D7D] font-mono">
                Transmettez ce rapport pour solliciter l'accompagnement d'un mentor TSF.
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setDownloadNotice('Synthèse PDF du diagnostic générée et prête pour téléchargement.')}
                  className="px-4 py-2 border border-[#E8E8E8] rounded-lg text-xs font-mono text-[#404040] hover:bg-[#F5F5F7] flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Télécharger la synthèse PDF</span>
                </button>
                <a
                  href="/contact"
                  className="px-5 py-2 bg-[#0070C0] hover:bg-[#005FA3] text-white text-xs font-mono rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <span>Demander un accompagnement TSF</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {downloadNotice && (
              <div className="p-3 bg-[#EBF5FC] border border-[#A3D1F1] rounded-lg text-xs text-[#004D85] flex items-center justify-between">
                <span>{downloadNotice}</span>
                <button type="button" onClick={() => setDownloadNotice(null)} className="text-[#0070C0] font-bold text-xs ml-2 cursor-pointer">
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
