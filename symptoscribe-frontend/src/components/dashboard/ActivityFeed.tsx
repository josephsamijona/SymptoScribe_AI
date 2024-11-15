import React from 'react';

interface Activity {
  id: number;
  patient: string;
  type: 'consultation' | 'suivi' | 'urgence';
  time: string;
  status: 'en-attente' | 'en-cours' | 'terminé';
}

interface ActivityFeedProps {
  activities: Activity[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  const getStatusStyle = (status: Activity['status']) => {
    switch (status) {
      case 'en-attente':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200';
      case 'en-cours':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200';
      case 'terminé':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Activités Récentes
        </h2>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {activity.patient}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {activity.time} - {activity.type}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(activity.status)}`}>
                {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;