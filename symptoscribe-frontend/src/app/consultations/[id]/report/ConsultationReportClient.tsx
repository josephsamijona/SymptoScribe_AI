"use client";

// Fichier: src/app/consultations/[id]/report/ConsultationReportClient.tsx
import React from 'react';
import { useRouter } from 'next/navigation';
import ConsultationReport from '@/components/consultation/ConsultationReport';
import MainLayout from '@/components/layout/MainLayout';

interface ConsultationReportClientProps {
  params: {
    id: string;
  };
}

const ConsultationReportContainer = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleFinalize = async () => {
    try {
      setIsSubmitting(true);
      // Ici, vous pourriez avoir un appel API pour finaliser le rapport
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulation d'appel API
      
      // Redirection vers la liste des consultations une fois terminé
      router.push('/consultations');
    } catch (error) {
      console.error('Erreur lors de la finalisation:', error);
      // Gérer l'erreur (vous pourriez ajouter un toast ici)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveTemplate = async (templateName: string) => {
    try {
      // Logique pour sauvegarder le template
      console.log('Sauvegarde du template:', templateName);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du template:', error);
    }
  };

  const handleShare = async (recipientId: string) => {
    try {
      // Logique pour partager le rapport
      console.log('Partage avec:', recipientId);
    } catch (error) {
      console.error('Erreur lors du partage:', error);
    }
  };

  return (
    <div>
      {/* Barre de notification en haut (optionnelle) */}
      {isSubmitting && (
        <div className="fixed top-0 left-0 right-0 bg-blue-500 text-white py-2 px-4 text-center z-50">
          Finalisation en cours...
        </div>
      )}

      {/* Composant principal */}
      <ConsultationReport
        consultationId={params.id}
        onFinalize={handleFinalize}
      />
    </div>
  );
};

// Composant Client principal
const ConsultationReportClient: React.FC<ConsultationReportClientProps> = ({ params }) => {
  return (
    <MainLayout>
      <ConsultationReportContainer params={params} />
    </MainLayout>
  );
};

export default ConsultationReportClient;