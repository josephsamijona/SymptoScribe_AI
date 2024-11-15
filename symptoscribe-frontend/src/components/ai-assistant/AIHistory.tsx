"use client";

// src/components/ai-assistant/AIHistory.tsx
import React from 'react';
import { 
  Calendar,
  MessageSquare,
  Mic,
  FileText,
  BarChart2,
  ChevronRight
} from 'lucide-react';

interface Interaction {
  id: string;
  type: 'chat' | 'voice' | 'analysis' | 'report';
  title: string;
  date: string;
  summary?: string;
}

const AIHistory = () => {
  const interactions: Interaction[] = [
    {
      id: '1',
      type: 'voice',
      title: 'Consultation Dr. Martin',
      date: '2024-02-14 09:30',
      summary: 'Discussion sur le diagnostic de grippe'
    },
    {
      id: '2',
      type: 'chat',
      title: 'Analyse radiologie',
      date: '2024-02-13 14:15',
      summary: 'Interprétation des résultats IRM'
    },
    {
      id: '3',
      type: 'analysis',
      title: 'Analyse données patient',
      date: '2024-02-12 11:00',
      summary: 'Analyse des tendances sur 6 mois'
    },
    {
      id: '4',
      type: 'report',
      title: 'Génération rapport',
      date: '2024-02-11 16:45',
      summary: 'Rapport mensuel de suivi'
    }
  ];

  const getIcon = (type: Interaction['type']) => {
    switch (type) {
      case 'chat':
        return MessageSquare;
      case 'voice':
        return Mic;
      case 'analysis':
        return BarChart2;
      case 'report':
        return FileText;
      default:
        return MessageSquare;
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Historique des interactions
          </h3>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Filtres */}
        <div className="flex gap-2">
          {['Tout', 'Chat', 'Vocal', 'Analyses', 'Rapports'].map((filter) => (
            <button
              key={filter}
              className="px-3 py-1 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Liste des interactions */}
      <div className="space-y-4">
        {interactions.map((interaction) => {
          const Icon = getIcon(interaction.type);
          return (
            <div
              key={interaction.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20`}>
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {interaction.title}
                    </h4>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {interaction.summary}
                  </p>
                  
                  <div className="text-xs text-gray-400 dark:text-gray-500">
                    {new Date(interaction.date).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charge plus */}
      <div className="text-center">
        <button className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
          Voir plus d&apos;interactions
        </button>
      </div>
    </div>
  );
};

export default AIHistory;