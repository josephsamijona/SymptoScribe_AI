"use client";

import React from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Calendar,
  Clock,
  User,
  FileText
} from 'lucide-react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

// Types
interface Consultation {
  id: number;
  patient: string;
  date: string;
  heure: string;
  type: string;
  status: 'en-attente' | 'en-cours' | 'terminé';
}

// Données simulées
const consultations: Consultation[] = [
  {
    id: 1,
    patient: "Jean Martin",
    date: "2024-02-14",
    heure: "09:00",
    type: "Consultation",
    status: "en-attente"
  },
  {
    id: 2,
    patient: "Marie Dubois",
    date: "2024-02-14",
    heure: "10:30",
    type: "Suivi",
    status: "en-cours"
  },
  {
    id: 3,
    patient: "Pierre Lambert",
    date: "2024-02-14",
    heure: "14:00",
    type: "Urgence",
    status: "terminé"
  }
];

const ConsultationsList = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const getStatusStyle = (status: Consultation['status']) => {
    switch (status) {
      case 'en-attente':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200';
      case 'en-cours':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200';
      case 'terminé':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Consultations
        </h1>
        <Link
          href="/consultations/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nouvelle consultation
        </Link>
      </div>

      {/* Filtres et recherche */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une consultation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
          />
        </div>
        <button className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700" title="Filter">
          <Filter className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Liste des consultations */}
      <div className="space-y-4">
        {consultations.map((consultation) => (
          <div
            key={consultation.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {consultation.heure}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {consultation.patient}
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(consultation.status)}`}>
                  {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                </span>
              </div>
              <Link
                href={`/consultations/${consultation.id}`}
                className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              >
                <FileText className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Type</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {consultation.type}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date(consultation.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ConsultationsPage() {
  return (
    <MainLayout>
      <ConsultationsList />
    </MainLayout>
  );
}