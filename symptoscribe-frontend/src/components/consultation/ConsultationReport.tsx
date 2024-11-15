"use client";

import React, { useState } from 'react';
import {
  FileText,
  Book,
  Layout,
  Microscope,
  TrendingUp,
  Share2,
  Download,
  CheckCircle,
  Languages,
  Wand2,
  Brain,
  Archive,
  MessageSquare,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

type ReportStyle = 'standard' | 'detaille' | 'resume' | 'urgence' | 'suivi';

interface Symptom {
  texte: string;
  confiance: string;
}

interface Prescription {
  medicament: string;
  posologie: string;
  duree: string;
}

interface Patient {
  nom: string;
  age: string;
  sexe: string;
}

interface ConsultationData {
  patient: Patient;
  symptomes: Symptom[];
  diagnostic: string;
  prescriptions: Prescription[];
}

interface ConsultationReportProps {
  consultationId: string;
  onFinalize: () => void;
}

const reportStyles = [
  { id: 'standard' as const, label: 'Standard', icon: FileText },
  { id: 'detaille' as const, label: 'Détaillé', icon: Book },
  { id: 'resume' as const, label: 'Résumé', icon: Layout },
  { id: 'urgence' as const, label: 'Urgence', icon: Microscope },
  { id: 'suivi' as const, label: 'Suivi', icon: TrendingUp }
];

const ConsultationReport: React.FC<ConsultationReportProps> = ({
    consultationId,
    onFinalize
  }) => {
    const [selectedStyle, setSelectedStyle] = useState<ReportStyle>('standard');
    const [showAIAssistant, setShowAIAssistant] = useState(true);
  
    // Données simulées pour le rapport
    const reportData: ConsultationData = {
      patient: {
        nom: "Jean Dupont",
        age: "45 ans",
        sexe: "M"
      },
      symptomes: [
        { texte: "Fièvre persistante", confiance: "92%" },
        { texte: "Toux sèche", confiance: "88%" },
        { texte: "Fatigue", confiance: "85%" }
      ],
      diagnostic: "Grippe saisonnière",
      prescriptions: [
        { 
          medicament: "Paracétamol",
          posologie: "1000mg x 3/jour",
          duree: "5 jours"
        },
        {
          medicament: "Ibuprofène",
          posologie: "400mg x 3/jour",
          duree: "3 jours"
        }
      ]
    };
  
    const handleShare = () => {
      // Implémenter la logique de partage
      console.log('Partager le rapport');
    };
  
    const handleDownload = () => {
      // Implémenter la logique de téléchargement
      console.log('Télécharger le rapport');
    };
  
    const handleStyleChange = (style: ReportStyle) => {
      setSelectedStyle(style);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* En-tête avec actions */}
          <div className="bg-white dark:bg-gray-800 shadow-sm p-6 mb-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Rapport de Consultation
                  </h1>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleShare}
                    title="Partager"
                    className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  <button 
                    onClick={handleDownload}
                    title="Télécharger"
                    className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  </button>
                  <button 
                    onClick={onFinalize}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Finaliser
                  </button>
                </div>
              </div>
    
              {/* Styles de rapport */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Style de rapport
                </h3>
                <div className="grid grid-cols-5 gap-4">
                  {reportStyles.map((style) => {
                    const Icon = style.icon;
                    return (
                      <button
                        key={style.id}
                        onClick={() => handleStyleChange(style.id)}
                        className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all hover:-translate-y-1 ${
                          selectedStyle === style.id
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <Icon className={`w-6 h-6 mb-2 ${
                          selectedStyle === style.id
                            ? 'text-blue-500'
                            : 'text-gray-400'
                        }`} />
                        <span className="text-sm font-medium">
                          {style.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              {/* Améliorations IA */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="flex items-center gap-3 p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 transition-colors">
              <Wand2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <div className="text-left">
                <span className="block font-medium text-purple-900 dark:text-purple-200">
                  Enrichissement automatique
                </span>
                <span className="text-sm text-purple-600 dark:text-purple-400">
                  Ajouter des détails pertinents
                </span>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 hover:bg-green-100 transition-colors">
              <Languages className="w-5 h-5 text-green-600 dark:text-green-400" />
              <div className="text-left">
                <span className="block font-medium text-green-900 dark:text-green-200">
                  Multi-langue
                </span>
                <span className="text-sm text-green-600 dark:text-green-400">
                  Traduire le rapport
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex gap-6">
          {/* Zone principale du rapport */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            {/* En-tête patient */}
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {reportData.patient.nom}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Âge:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">{reportData.patient.age}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Sexe:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">{reportData.patient.sexe}</span>
                </div>
              </div>
            </div>

            {/* Symptômes */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Symptômes présentés
              </h3>
              <div className="space-y-2">
                {reportData.symptomes.map((symptom, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-gray-900 dark:text-white">{symptom.texte}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {symptom.confiance} de confiance
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Diagnostic */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Diagnostic
              </h3>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-blue-900 dark:text-blue-200">
                  {reportData.diagnostic}
                </p>
              </div>
            </div>

            {/* Prescriptions */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Prescriptions
              </h3>
              <div className="space-y-3">
                {reportData.prescriptions.map((prescription, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {prescription.medicament}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {prescription.posologie} - {prescription.duree}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Assistant IA */}
          {showAIAssistant && (
            <div className="w-80 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Assistant IA
                </h3>
              </div>

              {/* Suggestions d'amélioration */}
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-yellow-600" />
                    <h4 className="font-medium text-yellow-800 dark:text-yellow-200">
                      Suggestion d&apos;amélioration
                    </h4>
                  </div>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Ajouter plus de détails sur la durée des symptômes
                  </p>
                  <button className="mt-2 text-sm text-yellow-600 hover:underline">
                    Appliquer
                  </button>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-green-600" />
                    <h4 className="font-medium text-green-800 dark:text-green-200">
                      Recommandation
                    </h4>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Inclure les résultats des tests précédents
                  </p>
                  <button className="mt-2 text-sm text-green-600 hover:underline">
                    Ajouter
                  </button>
                </div>
              </div>

              {/* Actions rapides */}
              <div className="space-y-2">
                <button className="w-full p-2 flex items-center gap-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Archive className="w-4 h-4" />
                  <span>Sauvegarder comme template</span>
                </button>
                <button className="w-full p-2 flex items-center gap-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <MessageSquare className="w-4 h-4" />
                  <span>Partager avec un confrère</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultationReport;