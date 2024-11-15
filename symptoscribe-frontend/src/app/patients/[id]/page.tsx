"use client";

import React from 'react';
import { 
  ArrowLeft,
  Edit,
  Calendar,
  Clock,
  Download,
  Share2,
  Plus,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import MedicalHistory from '@/components/patient/MedicalHistory';

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

interface PatientDetail {
  id: number;
  nom: string;
  age: number;
  dateNaissance: string;
  telephone: string;
  email: string;
  adresse: string;
  status: string;
  allergies: string[];
  antecedents: Antecedent[];
  consultations: Consultation[];
}

// Données simulées
const patientData: PatientDetail = {
  id: 1,
  nom: "Jean Martin",
  age: 45,
  dateNaissance: "1979-05-15",
  telephone: "+33 6 12 34 56 78",
  email: "jean.martin@email.com",
  adresse: "123 rue de Paris, 75001 Paris",
  status: "Actif",
  allergies: ["Pénicilline", "Arachides"],
  antecedents: [
    { 
      date: "2023-05", 
      description: "Intervention chirurgicale - Appendicite",
      type: "chirurgie" as const
    },
    { 
      date: "2022-11", 
      description: "Fracture bras droit",
      type: "maladie" as const
    }
  ],
  consultations: [
    { 
      date: "2024-02-08", 
      type: "Suivi", 
      diagnostic: "Contrôle routine",
      prescriptions: ["Paracétamol 1000mg", "Vitamine D"]
    },
    { 
      date: "2024-01-15", 
      type: "Urgence", 
      diagnostic: "Grippe sévère",
      prescriptions: ["Tamiflu", "Paracétamol"]
    }
  ]
};

const PatientDetailContent = () => {
  const [activeTab, setActiveTab] = React.useState('info');

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/patients"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {patientData.nom}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                {patientData.age} ans - Dossier #{patientData.id}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button title="Share" className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <button title="Download" className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Download className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-5 h-5" />
                Nouvelle consultation
              </button>
            </div>
          </div>

          {/* Onglets */}
          <div className="flex gap-4">
            {[
              { id: 'info', label: 'Informations' },
              { id: 'history', label: 'Historique médical' },
              { id: 'documents', label: 'Documents' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      {activeTab === 'info' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informations personnelles */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Informations personnelles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Contact
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">
                      {patientData.telephone}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">
                      {patientData.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">
                      {patientData.adresse}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Informations médicales
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">
                      Né(e) le {new Date(patientData.dateNaissance).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Prochains rendez-vous */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Prochains rendez-vous
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    15 Février 2024
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Consultation de suivi
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <MedicalHistory
          antecedents={patientData.antecedents}
          consultations={patientData.consultations}
          allergies={patientData.allergies}
        />
      )}

      {activeTab === 'documents' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Documents médicaux
          </h2>
          {/* Contenu des documents à implémenter */}
        </div>
      )}
    </div>
  );
};

export default function PatientDetailPage() {
  return (
    <MainLayout>
      <PatientDetailContent />
    </MainLayout>
  );
}