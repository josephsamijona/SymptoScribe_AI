// src/app/reports/page.tsx

import React from 'react';
import ReportsPageClient from './ReportsPageClient';

export const metadata = {
  title: 'Rapports & Analyses - SymptoScribe AI',
  description: 'Générateur de rapports et statistiques détaillées des consultations médicales',
  keywords: 'rapports médicaux, analyses statistiques, consultations, SymptoScribe AI',
};

export default function ReportsPage() {
  // Cette page est un Server Component, donc elle peut faire des appels serveur directs si nécessaire
  // Par exemple, charger des données initiales pour le rapport

  return (
    // On envoie le tout au composant client qui gère l'interactivité
    <ReportsPageClient />
  );
}