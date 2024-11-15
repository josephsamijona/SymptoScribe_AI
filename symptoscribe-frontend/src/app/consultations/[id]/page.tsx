// Fichier: src/app/consultations/[id]/page.tsx

import ConsultationDetailClient from './ConsultationDetail';

interface ConsultationDetailProps {
  params: {
    id: string;
  };
}

export default function ConsultationDetailPage({ params }: ConsultationDetailProps) {
  return <ConsultationDetailClient params={params} />;
}

// Métadonnées de la page
export async function generateMetadata({ params }: ConsultationDetailProps) {
  return {
    title: `Consultation ${params.id} - SymptoScribe AI`,
    description: 'Détails de la consultation médicale en cours'
  };
}