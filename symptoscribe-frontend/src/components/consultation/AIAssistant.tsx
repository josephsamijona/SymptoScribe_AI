"use client";

import React from 'react';
import { 
  Brain, 
  AlertTriangle, 
  Sparkles, 
  ChevronRight,
  Stethoscope
} from 'lucide-react';

interface Symptom {
  texte: string;
  confiance: number;
}

interface Diagnostic {
  nom: string;
  probabilite: number;
}

interface AIAssistantProps {
  symptomes?: Symptom[];
  diagnosticsSuggeres?: Diagnostic[];
  examensRecommandes?: string[];
  alertes?: {
    type: string;
    message: string;
    severite: 'haute' | 'moyenne' | 'basse';
  }[];
  onDiagnosticSelect?: (diagnostic: string) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({
  symptomes = [],
  diagnosticsSuggeres = [],
  examensRecommandes = [],
  alertes = [],
  onDiagnosticSelect
}) => {
  return (
    <div className="w-96 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* En-tête */}
        <div className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Assistant IA
          </h2>
        </div>

        {/* Suggestions en temps réel */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Suggestions en temps réel
            </h3>
          </div>
          <p className="text-sm text-blue-600 dark:text-blue-300">
            L&apos;IA analyse votre saisie et la transcription...
          </p>
        </div>

        {/* Symptômes détectés */}
        {symptomes.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Symptômes détectés
            </h3>
            {symptomes.map((symptom, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <span className="text-gray-900 dark:text-white">
                  {symptom.texte}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {Math.round(symptom.confiance * 100)}%
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Diagnostics suggérés */}
        {diagnosticsSuggeres.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Diagnostics suggérés
            </h3>
            {diagnosticsSuggeres.map((diagnostic, index) => (
              <button
                key={index}
                onClick={() => onDiagnosticSelect?.(diagnostic.nom)}
                className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {diagnostic.nom}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {Math.round(diagnostic.probabilite * 100)}%
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Examens recommandés */}
        {examensRecommandes.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Examens recommandés
            </h3>
            {examensRecommandes.map((examen, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <Stethoscope className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900 dark:text-white">{examen}</span>
              </div>
            ))}
          </div>
        )}

        {/* Alertes */}
        {alertes.map((alerte, index) => (
          <div
            key={index}
            className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span className="font-medium text-red-800 dark:text-red-200">
                {alerte.type}
              </span>
            </div>
            <p className="text-sm text-red-600 dark:text-red-300">
              {alerte.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIAssistant;