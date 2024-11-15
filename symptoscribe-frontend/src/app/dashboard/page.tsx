"use client";

import React from 'react';
import { 
  Users, 
  Clock, 
  Brain, 
  TrendingUp,
  Bell,
  Search,
  Download
} from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import ChartComponent from '@/components/dashboard/ChartComponent';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import MainLayout from '@/components/layout/MainLayout';

const consultationData = [
  { month: 'Jan', consultations: 65, moyenne: 45 },
  { month: 'Fév', consultations: 75, moyenne: 48 },
  { month: 'Mar', consultations: 85, moyenne: 52 },
  { month: 'Avr', consultations: 70, moyenne: 50 },
  { month: 'Mai', consultations: 90, moyenne: 55 }
];

const recentActivities = [
  { 
    id: 1, 
    patient: "Jean Martin", 
    type: "consultation" as const, 
    time: "09:00", 
    status: "en-attente" as const
  },
  { 
    id: 2, 
    patient: "Marie Dubois", 
    type: "suivi" as const, 
    time: "10:30", 
    status: "en-cours" as const
  },
  { 
    id: 3, 
    patient: "Pierre Lambert", 
    type: "urgence" as const, 
    time: "14:00", 
    status: "terminé" as const
  }
];

const DashboardContent = () => {
  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Tableau de bord
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
            <Brain className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-700 dark:text-blue-300">
              IA Active
            </span>
          </div>
          <button className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all transform hover:scale-105" title="Download">
            <Download className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Stats rapides avec animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Consultations aujourd'hui", value: "8/12", icon: Users, metric: "66%" },
          { title: "Temps moyen/patient", value: "25 min", icon: Clock, metric: "25 min" },
          { title: "Patients en attente", value: "3", icon: Bell, metric: "3 patients" },
          { title: "Score IA", value: "94%", icon: Brain, metric: "94%" }
        ].map((item, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <item.icon className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {item.title}
                </span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Graphique et Activités */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartComponent
            title="Évolution des consultations"
            data={consultationData}
            xAxisKey="month"
            lines={[
              { key: 'consultations', color: '#3B82F6', name: 'Consultations' },
              { key: 'moyenne', color: '#10B981', name: 'Moyenne' }
            ]}
          />
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-400" />
                Consultations du Jour
              </h2>
              <ActivityFeed activities={recentActivities} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Page principale avec le layout
export default function DashboardPage() {
  return (
    <MainLayout>
      <DashboardContent />
    </MainLayout>
  );
}