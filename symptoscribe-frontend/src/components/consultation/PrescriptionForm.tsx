"use client";

import React, { useState } from 'react';
import { 
  Plus, 
  Trash, 
  Pill,
  Calendar,
  Clock,
  AlertTriangle
} from 'lucide-react';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

const PrescriptionForm: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [currentMedication, setCurrentMedication] = useState<Medication>({
    id: '',
    name: '',
    dosage: '',
    frequency: '',
    duration: ''
  });

  const handleAddMedication = () => {
    const newMedication = {
      ...currentMedication,
      id: Date.now().toString()
    };
    setMedications([...medications, newMedication]);
    setCurrentMedication({
      id: '',
      name: '',
      dosage: '',
      frequency: '',
      duration: ''
    });
    setShowForm(false);
  };

  const handleRemoveMedication = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Prescriptions
        </h3>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Ajouter
        </button>
      </div>

      {/* Liste des médicaments */}
      <div className="space-y-3">
        {medications.map((medication) => (
          <div
            key={medication.id}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Pill className="w-5 h-5 text-blue-500" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {medication.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {medication.dosage} - {medication.frequency}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Durée: {medication.duration}
                  </p>
                  {medication.instructions && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                      {medication.instructions}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleRemoveMedication(medication.id)}
                className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                title="Remove medication"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Formulaire d'ajout */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Médicament
              </label>
              <input
                type="text"
                value={currentMedication.name}
                onChange={(e) => setCurrentMedication({
                  ...currentMedication,
                  name: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700"
                placeholder="Nom du médicament"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Dosage
              </label>
              <input
                type="text"
                value={currentMedication.dosage}
                onChange={(e) => setCurrentMedication({
                  ...currentMedication,
                  dosage: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700"
                placeholder="ex: 1000mg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Fréquence
              </label>
              <input
                type="text"
                value={currentMedication.frequency}
                onChange={(e) => setCurrentMedication({
                  ...currentMedication,
                  frequency: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700"
                placeholder="ex: 3 fois par jour"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Durée
              </label>
              <input
                type="text"
                value={currentMedication.duration}
                onChange={(e) => setCurrentMedication({
                  ...currentMedication,
                  duration: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700"
                placeholder="ex: 5 jours"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Instructions spéciales
            </label>
            <textarea
              value={currentMedication.instructions}
              onChange={(e) => setCurrentMedication({
                ...currentMedication,
                instructions: e.target.value
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700"
              placeholder="Instructions particulières..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleAddMedication}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ajouter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrescriptionForm;