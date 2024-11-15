// Fichier: src/app/consultations/[id]/report/page.tsx

import ConsultationReportClient from './ConsultationReportClient';

interface ReportPageProps {
  params: {
    id: string;
  };
}

export default function ReportPage({ params }: ReportPageProps) {
  return <ConsultationReportClient params={params} />;
}

// Générer les métadonnées pour la page
export async function generateMetadata({ params }: ReportPageProps) {
  return {
    title: `Rapport de consultation #${params.id} - SymptoScribe AI`,
    description: 'Rapport détaillé de la consultation médicale',
  };
}