"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { 
  Users,
  Clock,
  TrendingUp,
  Brain,
  Calendar, 
  Download
} from 'lucide-react';

interface AnalyticsDashboardProps {
  data?: any; // À typer selon vos besoins
  period?: 'day' | 'week' | 'month' | 'year';
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ 
  period = 'month',
  data 
}) => {
  // Données simulées pour les graphiques
  const consultationsData = [
    { month: 'Jan', consultations: 65, moyenne: 45 },
    { month: 'Fév', consultations: 75, moyenne: 48 },
    { month: 'Mar', consultations: 85, moyenne: 52 },
    { month: 'Avr', consultations: 70, moyenne: 50 },
    { month: 'Mai', consultations: 90, moyenne: 55 }
  ];

  const performanceData = [
    { name: 'Grippe', value: 30 },
    { name: 'Hypertension', value: 25 },
    { name: 'Diabète', value: 20 },
    { name: 'Allergies', value: 15 },
    { name: 'Autres', value: 10 }
  ];

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Patients actifs", value: "1,234", icon: Users, trend: "+12%" },
          { title: "Temps moyen/consultation", value: "28 min", icon: Clock, trend: "-5%" },
          { title: "Taux de satisfaction", value: "94%", icon: TrendingUp, trend: "+3%" },
          { title: "Précision IA", value: "95%", icon: Brain, trend: "+2%" }
        ].map((kpi, index) => {
          const Icon = kpi.icon;
          const isPositive = kpi.trend.startsWith('+');
          return (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span className={`text-sm font-medium ${
                  isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {kpi.trend}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {kpi.value}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {kpi.title}
              </p>
            </div>
          );
        })}
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Évolution des consultations */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Évolution des consultations
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={consultationsData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="consultations" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="moyenne" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution des diagnostics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Distribution des diagnostics
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Timeline des rapports générés */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Derniers rapports générés
        </h3>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="flex items-center gap-4">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Rapport mensuel {index + 1}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Généré le {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600" title="Download report">
                <Download className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;