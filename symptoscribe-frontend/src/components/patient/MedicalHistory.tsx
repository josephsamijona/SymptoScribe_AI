"use client";

import React from 'react';
import { 
  Activity,
  Calendar,
  FileText,
  Pill,
  AlertTriangle,
  ChevronDown,
  Filter
} from 'lucide-react';

interface Antecedent {
  date: string;
  description: string;
  type: 'chirurgie' | 'maladie' | 'traitement' | 'allergie';
}

interface Consultation {
  date: string;
  type: string;
  diagnostic: string;
  prescriptions?: string[];
}

interface MedicalHistoryProps {
  antecedents: Antecedent[];
  consultations: Consultation[];
  allergies: string[];
}

const MedicalHistory: React.FC<MedicalHistoryProps> = ({
  antecedents,
  consultations,
  allergies
}) => {
  const [activeSection, setActiveSection] = React.useState<string>('all');
  const [isTimelineExpanded, setIsTimelineExpanded] = React.useState(true);

  // Fonction pour obtenir l'icône selon le type d'antécédent
  const getAntecedentIcon = (type: Antecedent['type']) => {
    switch (type) {
      case 'chirurgie':
        return <Activity className="w-5 h-5 text-blue-500" />;
      case 'maladie':
        return <FileText className="w-5 h-5 text-yellow-500" />;
      case 'traitement':
        return <Pill className="w-5 h-5 text-green-500" />;
      case 'allergie':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Alertes allergies */}
      {allergies.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h3 className="font-medium text-red-800 dark:text-red-200">
              Allergies connues
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {allergies.map((allergie, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-200 rounded-full text-sm"
              >
                {allergie}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Filtres */}
      <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <Filter className="w-5 h-5 text-gray-400" />
        <div className="flex gap-2">
          {['all', 'chirurgie', 'maladie', 'traitement'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveSection(filter)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                activeSection === filter
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline des antécédents */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setIsTimelineExpanded(!isTimelineExpanded)}
            className="flex items-center justify-between w-full"
          >
            <h3 className="font-medium text-gray-900 dark:text-white">
              Historique médical
            </h3>
            <ChevronDown className={`w-5 h-5 text-gray-400 transform transition-transform ${
              isTimelineExpanded ? 'rotate-180' : ''
            }`} />
          </button>
        </div>
        
        {isTimelineExpanded && (
          <div className="p-4">
            <div className="space-y-6">
              {antecedents
                .filter(ant => activeSection === 'all' || ant.type === activeSection)
                .map((antecedent, index) => (
                <div
                  key={index}
                  className="relative pl-6 pb-6 last:pb-0 border-l-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full" />
                  <div className="ml-4">
                    <div className="flex items-center gap-2 mb-1">
                      {getAntecedentIcon(antecedent.type)}
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {antecedent.date}
                      </span>
                    </div>
                    <p className="text-gray-900 dark:text-white">
                      {antecedent.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Consultations récentes */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-medium text-gray-900 dark:text-white">
            Consultations récentes
          </h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {consultations.map((consultation, index) => (
            <div
              key={index}
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {consultation.date}
                  </span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {consultation.type}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {consultation.diagnostic}
              </p>
              {consultation.prescriptions && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {consultation.prescriptions.map((prescription, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-xs"
                    >
                      {prescription}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;