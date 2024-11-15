"use client";

// Fichier: src/app/reports/ReportsPageClient.tsx
import React, { useState } from 'react';
import { Filter, Download, Share2, Calendar } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import ReportGenerator from '@/components/reports/ReportGenerator';
import AnalyticsDashboard from '@/components/reports/AnalyticsDashboard';

const ReportsPageClient = () => {
  const [activeTab, setActiveTab] = useState<'generator' | 'analytics'>('analytics');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  const handleGenerateReport = async (reportConfig: any) => {
    try {
      setIsGeneratingReport(true);
      // Ici, appel API pour générer le rapport
      console.log('Génération du rapport avec config:', reportConfig);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulation
    } catch (error) {
      console.error('Erreur lors de la génération du rapport:', error);
    } finally {
      setIsGeneratingReport(false);
    }
  };

  return (
    <MainLayout>
      <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* En-tête */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Rapports et Analyses
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Générez des rapports détaillés et visualisez vos statistiques
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Sélecteur de période */}
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm">
              <Calendar className="w-5 h-5 text-gray-400" />
              <label htmlFor="period-select" className="sr-only">Sélectionner la période</label>
              <select
                id="period-select"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-transparent border-none text-gray-600 dark:text-gray-300 focus:ring-0"
              >
                <option value="day">Aujourd&apos;hui</option>
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
                <option value="year">Cette année</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button title="Share" className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button title="Download" className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mb-6">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'analytics'
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Vue d&apos;ensemble
            </button>
            <button
              onClick={() => setActiveTab('generator')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'generator'
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Générateur de rapports
            </button>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="space-y-6">
          {activeTab === 'analytics' ? (
            <AnalyticsDashboard period={selectedPeriod as any} />
          ) : (
            <ReportGenerator 
              onGenerate={handleGenerateReport}
            />
          )}

          {/* Message de chargement */}
          {isGeneratingReport && (
            <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl flex items-center gap-4">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  Génération du rapport en cours...
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ReportsPageClient;