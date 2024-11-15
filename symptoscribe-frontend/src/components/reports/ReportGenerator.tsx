"use client";

import React, { useState } from 'react';
import { 
  Calendar,
  Filter,
  Download,
  FileText,
  PieChart,
  BarChart,
  Users,
  Clock,
  ChevronDown,
  Printer
} from 'lucide-react';

type ReportType = 'performance' | 'patients' | 'consultations' | 'custom';
type TimeRange = 'day' | 'week' | 'month' | 'year' | 'custom';

interface ReportGeneratorProps {
  onGenerate?: (reportData: any) => void;
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({ onGenerate }) => {
  const [reportType, setReportType] = useState<ReportType>('consultations');
  const [timeRange, setTimeRange] = useState<TimeRange>('month');
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTypes = [
    { id: 'consultations', label: 'Consultations', icon: FileText },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'performance', label: 'Performance', icon: BarChart },
    { id: 'custom', label: 'Personnalisé', icon: PieChart }
  ] as const;

  const timeRanges = [
    { id: 'day', label: 'Aujourdhui' },
    { id: 'week', label: 'Cette semaine' },
    { id: 'month', label: 'Ce mois' },
    { id: 'year', label: 'Cette année' },
    { id: 'custom', label: 'Personnalisé' }
  ] as const;

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulation
      // Ici, appel API pour générer le rapport
      onGenerate?.({
        type: reportType,
        timeRange,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Erreur lors de la génération:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Générateur de Rapports
      </h2>

      {/* Type de rapport */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Type de rapport
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {reportTypes.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setReportType(id)}
              className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all hover:-translate-y-1 ${
                reportType === id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <Icon className={`w-5 h-5 ${
                reportType === id 
                  ? 'text-blue-500'
                  : 'text-gray-400'
              }`} />
              <span className="font-medium">
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Période */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Période
        </label>
        <div className="flex flex-wrap gap-3">
          {timeRanges.map(range => (
            <button
              key={range.id}
              onClick={() => setTimeRange(range.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                timeRange === range.id
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filtres supplémentaires */}
      <div className="mb-6">
        <button className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          <Filter className="w-4 h-4" />
          Filtres supplémentaires
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
          <Printer className="w-5 h-5" />
          Aperçu
        </button>
        <button
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Génération...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Générer
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ReportGenerator;