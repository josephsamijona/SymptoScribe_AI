"use client";

import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';

interface PatientCardProps {
  patient: {
    id: number;
    nom: string;
    age: number;
    derniereConsultation: string;
    prochaineConsultation: string;
    status: 'Actif' | 'Inactif';
    telephone?: string;
    email?: string;
    allergies?: string[];
  };
}

const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  return (
    <Link 
      href={`/patients/${patient.id}`}
      className="block bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
    >
      <div className="p-6">
        {/* En-tête */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white text-lg">
              {patient.nom}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {patient.age} ans
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            patient.status === 'Actif'
              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
          }`}>
            {patient.status}
          </span>
        </div>

        {/* Informations de contact */}
        <div className="space-y-2 mb-4">
          {patient.telephone && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Phone className="w-4 h-4" />
              {patient.telephone}
            </div>
          )}
          {patient.email && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Mail className="w-4 h-4" />
              {patient.email}
            </div>
          )}
        </div>

        {/* Allergies */}
        {patient.allergies && patient.allergies.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-red-500">Allergies</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {patient.allergies.map((allergie, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-200 rounded-full text-xs"
                >
                  {allergie}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Consultations */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Dernière consultation</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {new Date(patient.derniereConsultation).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Prochaine consultation</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {new Date(patient.prochaineConsultation).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Flèche de navigation */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </Link>
  );
};

export default PatientCard;