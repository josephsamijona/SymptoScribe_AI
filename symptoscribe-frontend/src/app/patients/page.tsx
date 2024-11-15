"use client";

import React from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  UserPlus,
  SlidersHorizontal
} from 'lucide-react';
import Link from 'next/link';
import PatientCard from '@/components/patient/PatientCard';
import MainLayout from '@/components/layout/MainLayout';

// Type pour les patients
interface Patient {
  id: number;
  nom: string;
  age: number;
  derniereConsultation: string;
  prochaineConsultation: string;
  status: 'Actif' | 'Inactif';
  telephone?: string;
  email?: string;
  allergies?: string[];
}

// Données simulées
const patients: Patient[] = [
  {
    id: 1,
    nom: "Jean Martin",
    age: 45,
    derniereConsultation: "2024-02-08",
    prochaineConsultation: "2024-02-15",
    status: "Actif",
    telephone: "+33 6 12 34 56 78",
    email: "jean.martin@email.com",
    allergies: ["Pénicilline", "Arachides"]
  },
  {
    id: 2,
    nom: "Marie Dubois",
    age: 32,
    derniereConsultation: "2024-02-10",
    prochaineConsultation: "2024-02-20",
    status: "Actif",
    telephone: "+33 6 98 76 54 32",
    email: "marie.dubois@email.com",
    allergies: ["Lactose"]
  }
];

const PatientList = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<'all' | 'Actif' | 'Inactif'>('all');

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Patients
        </h1>
        <Link 
          href="/patients/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <UserPlus className="w-5 h-5" />
          Nouveau patient
        </Link>
      </div>

      {/* Filtres et recherche */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un patient..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 transition-shadow"
          />
        </div>
        <div className="flex gap-2">
          <button title="Filter" className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Filter className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <button title="Adjust settings" className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <SlidersHorizontal className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Liste des patients */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients
          .filter(patient => 
            patient.nom.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (statusFilter === 'all' || patient.status === statusFilter)
          )
          .map(patient => (
            <PatientCard key={patient.id} patient={patient} />
          ))
        }
      </div>
    </div>
  );
};

export default function PatientsPage() {
  return (
    <MainLayout>
      <PatientList />
    </MainLayout>
  );
}