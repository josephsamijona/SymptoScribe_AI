"use client";

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PatientForm from '@/components/patient/PatientForm';
import MainLayout from '@/components/layout/MainLayout';

const NewPatientContent = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      // Ici, vous ajouteriez l'appel API pour créer le patient
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulation
      router.push('/patients');
    } catch (error) {
      console.error('Erreur lors de la création du patient:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center gap-4">
        <Link
          href="/patients"
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Nouveau patient
        </h1>
      </div>

      {/* Formulaire */}
      <PatientForm
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default function NewPatientPage() {
  return (
    <MainLayout>
      <NewPatientContent />
    </MainLayout>
  );
}