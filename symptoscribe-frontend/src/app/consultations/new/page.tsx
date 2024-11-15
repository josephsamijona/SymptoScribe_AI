"use client";

import React, { useState } from 'react';
import { 
  Search, 
  User, 
  UserPlus,
  ChevronRight,
  AlertTriangle,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';

type UrgencyLevel = 'normal' | 'prioritaire' | 'urgent';

interface ConsultationSetupProps {
  onPatientSelect?: (patientId: string) => void;
  onUrgencySelect?: (level: UrgencyLevel) => void;
}

const ConsultationSetup: React.FC<ConsultationSetupProps> = ({
  onPatientSelect,
  onUrgencySelect
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUrgency, setSelectedUrgency] = useState<UrgencyLevel | null>(null);
  const router = useRouter();

  const handleUrgencySelect = (level: UrgencyLevel) => {
    setSelectedUrgency(level);
    onUrgencySelect?.(level);
  };

  const getUrgencyStyle = (level: UrgencyLevel) => {
    const baseStyle = "p-4 rounded-lg border-2 transition-all hover:-translate-y-1 hover:shadow-md";
    
    switch (level) {
      case 'normal':
        return `${baseStyle} ${
          selectedUrgency === 'normal'
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-200 dark:border-gray-700'
        }`;
      case 'prioritaire':
        return `${baseStyle} ${
          selectedUrgency === 'prioritaire'
            ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
            : 'border-gray-200 dark:border-gray-700'
        }`;
      case 'urgent':
        return `${baseStyle} ${
          selectedUrgency === 'urgent'
            ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
            : 'border-gray-200 dark:border-gray-700'
        }`;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* En-tête */}
      <div className="flex items-center gap-4">
        <Link
          href="/consultations"
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Nouvelle Consultation
        </h1>
      </div>

      {/* Recherche patient */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un patient (nom, numéro de sécurité sociale...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 h-12 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700"
          />
        </div>

        {/* Options de création */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => router.push('/consultations/new/existing')}
            className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all hover:-translate-y-1"
          >
            <div className="flex items-center gap-3">
              <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <div className="text-left">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Patient existant
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Consultation rapide
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={() => router.push('/patients/new')}
            className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-all hover:-translate-y-1"
          >
            <div className="flex items-center gap-3">
              <UserPlus className="w-6 h-6 text-green-600 dark:text-green-400" />
              <div className="text-left">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Nouveau patient
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Créer un dossier
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Niveau d'urgence */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Niveau d&apos;urgence
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => handleUrgencySelect('normal')}
            className={getUrgencyStyle('normal')}
          >
            <span className="text-blue-600 dark:text-blue-400 font-medium">Normal</span>
          </button>
          <button
            onClick={() => handleUrgencySelect('prioritaire')}
            className={getUrgencyStyle('prioritaire')}
          >
            <span className="text-yellow-600 dark:text-yellow-400 font-medium">Prioritaire</span>
          </button>
          <button
            onClick={() => handleUrgencySelect('urgent')}
            className={getUrgencyStyle('urgent')}
          >
            <span className="text-red-600 dark:text-red-400 font-medium">Urgent</span>
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Link
          href="/consultations"
          className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          Annuler
        </Link>
        <button
          disabled={!selectedUrgency}
          onClick={() => router.push('/consultations/new/start')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Commencer la consultation
        </button>
      </div>
    </div>
  );
};

export default function NewConsultationPage() {
  return (
    <MainLayout>
      <ConsultationSetup />
    </MainLayout>
  );
}