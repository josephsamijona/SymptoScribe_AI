"use client";

// Fichier: src/app/consultations/[id]/ConsultationDetail.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import ConsultationForm from '@/components/consultation/ConsultationForm';
import { Loader2 } from 'lucide-react';

interface ConsultationDetailProps {
  params: {
    id: string;
  };
}

const ConsultationDetailClient: React.FC<ConsultationDetailProps> = ({ params }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Consultation data:', data);
      
      // Redirection vers la page de rapport
      router.push(`/consultations/${params.id}/report`);
    } catch (error) {
      console.error('Error saving consultation:', error);
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/consultations');
  };

  return (
    <MainLayout>
      <div className="h-full min-h-screen bg-gray-50 dark:bg-gray-900 relative">
        {/* Indicateur de chargement */}
        {isSubmitting && (
          <div className="fixed inset-0 bg-black/20 dark:bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg flex items-center gap-3">
              <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
              <span className="text-gray-900 dark:text-white font-medium">
                Sauvegarde en cours...
              </span>
            </div>
          </div>
        )}

        {/* Formulaire de consultation */}
        <ConsultationForm
          patientId={params.id}
          patientName="Jean Dupont" // À remplacer par les vraies données
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      </div>
    </MainLayout>
  );
};

export default ConsultationDetailClient;