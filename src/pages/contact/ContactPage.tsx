import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Container } from '../../components/ui/Container';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { INSTITUTION_INFO } from '../../data/institutionData';
import { MapPin, Mail, Phone, Building, Send, Check } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    organisation: '',
    email: '',
    objet: 'partenariat-institutionnel',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pb-20 space-y-10">
      <PageHeader
        kicker="Secrétariat & Hubs"
        title="Contact & Présence Panafricaine"
        description="Prenez contact avec le secrétariat général, les délégués territoriaux ou les comités d'alliance stratégique."
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Official Directory */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#262626] font-sans">
                Siège Central & Pôles Régionaux
              </h2>
              <p className="text-sm text-[#595959] leading-relaxed font-sans">
                Talents Sans Frontières est présente au travers de deux hubs opérationnels principaux et d'un réseau de liaison diplomatique et universitaire.
              </p>
            </div>

            <div className="space-y-4">
              <Card padding="md" className="border-l-4 border-l-[#0070C0] bg-white">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#FF6600] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#262626] block text-sm font-sans">
                      Siège Opérationnel Afrique de l’Ouest
                    </strong>
                    <p className="text-xs text-[#595959] mt-0.5">{INSTITUTION_INFO.contacts.siege}</p>
                    <p className="text-xs text-[#7D7D7D] font-mono mt-1">Tel : {INSTITUTION_INFO.contacts.secretariat}</p>
                  </div>
                </div>
              </Card>

              <Card padding="md" className="border-l-4 border-l-[#FF6600] bg-white">
                <div className="flex items-start gap-3">
                  <Building className="w-5 h-5 text-[#0070C0] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#262626] block text-sm font-sans">
                      Hub Régional Afrique Centrale & Orientale
                    </strong>
                    <p className="text-xs text-[#595959] mt-0.5">Kigali Innovation City, Kigali, Rwanda</p>
                    <p className="text-xs text-[#7D7D7D] font-mono mt-1">Liaison diplomatique & R&D</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="bg-[#F5F5F7] border border-[#E8E8E8] p-5 rounded-xl space-y-2 text-xs">
              <span className="font-bold text-[#262626] block font-mono">
                Adresses Électroniques Officielles :
              </span>
              <div className="flex items-center gap-2 text-[#404040]">
                <Mail className="w-4 h-4 text-[#7D7D7D]" />
                <span>Secrétariat Général : <strong className="text-[#262626]">{INSTITUTION_INFO.contacts.email}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-[#404040]">
                <Mail className="w-4 h-4 text-[#7D7D7D]" />
                <span>Alliances & Bailleurs : <strong className="text-[#262626]">{INSTITUTION_INFO.contacts.relationsPartenaires}</strong></span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-6">
            <div className="bg-white border border-[#E8E8E8] rounded-xl p-6 sm:p-8 shadow-xs">
              {submitted ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#ECFDF5] text-[#0E8A5E] flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#262626] font-sans">Message Transmis</h3>
                  <p className="text-xs sm:text-sm text-[#595959] font-sans">
                    Votre communication a été transmise au service compétent de Talents Sans Frontières. Un accusé de traitement vous parviendra dans les meilleurs délais.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSubmitted(false)}
                  >
                    Envoyer un autre message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold text-[#262626] font-sans">
                    Formulaire de Correspondance Institutionnelle
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-[#404040] mb-1">
                      Nom complet & Titre <span className="text-[#FF6600]">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      placeholder="Ex. M. le Directeur..."
                      className="w-full px-3 py-2.5 text-sm border border-[#E8E8E8] rounded-lg focus:ring-2 focus:ring-[#0070C0]/20 focus:border-[#0070C0] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#404040] mb-1">
                      Organisation / Institution représentée <span className="text-[#FF6600]">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.organisation}
                      onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                      placeholder="Entreprise, Ministère, Bailleurs, Université..."
                      className="w-full px-3 py-2.5 text-sm border border-[#E8E8E8] rounded-lg focus:ring-2 focus:ring-[#0070C0]/20 focus:border-[#0070C0] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#404040] mb-1">
                      Adresse Courriel Institutionnelle <span className="text-[#FF6600]">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="contact@institution.org"
                      className="w-full px-3 py-2.5 text-sm border border-[#E8E8E8] rounded-lg focus:ring-2 focus:ring-[#0070C0]/20 focus:border-[#0070C0] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#404040] mb-1">
                      Objet de la correspondance
                    </label>
                    <select
                      value={formData.objet}
                      onChange={(e) => setFormData({ ...formData, objet: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm border border-[#E8E8E8] rounded-lg focus:ring-2 focus:ring-[#0070C0]/20 focus:border-[#0070C0] outline-none bg-white"
                    >
                      <option value="partenariat-institutionnel">Partenariat institutionnel ou accord de siège</option>
                      <option value="bailleurs">Financement d'impact & Bourses</option>
                      <option value="recrutement">Recrutement et accès aux certifiés TSF</option>
                      <option value="presse">Demande presse & Relations médias</option>
                      <option value="autre">Autre correspondance officielle</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#404040] mb-1">
                      Message & Précisions <span className="text-[#FF6600]">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Détaillez l'objet de votre démarche..."
                      className="w-full px-3 py-2.5 text-sm border border-[#E8E8E8] rounded-lg focus:ring-2 focus:ring-[#0070C0]/20 focus:border-[#0070C0] outline-none font-sans"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    fullWidth
                    icon={<Send className="w-3.5 h-3.5" />}
                  >
                    Transmettre au secrétariat TSF
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
