"use client";

import React, { useState } from 'react';
import { 
  Edit, 
  Camera, 
  FileText, 
  MessageSquare,
  Clock,
  Brain,
  Save,
  X
} from 'lucide-react';
import VoiceRecorder from './VoiceRecorder';
import AIAssistant from './AIAssistant';
import PrescriptionForm from './PrescriptionForm';

interface TabProps {
  id: string;
  label: string;
  icon: React.ElementType;
}

const TABS: TabProps[] = [
  { id: 'notes', label: 'Notes', icon: Edit },
  { id: 'images', label: 'Images & Analyses', icon: Camera },
  { id: 'historique', label: 'Historique', icon: FileText },
  { id: 'graphiques', label: 'Graphiques', icon: MessageSquare }
];

interface ConsultationFormProps {
  patientId: string;
  patientName: string;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const ConsultationForm: React.FC<ConsultationFormProps> = ({
  patientId,
  patientName,
  onSubmit,
  onCancel
}) => {
  const [activeTab, setActiveTab] = useState('notes');
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [notes, setNotes] = useState('');
  const [showAIAssistant, setShowAIAssistant] = useState(true);

  // État pour les suggestions de l'IA
  const [aiSuggestions, setAiSuggestions] = useState({
    symptomes: [
      { texte: "Fièvre persistante", confiance: 0.92 },
      { texte: "Toux sèche", confiance: 0.88 },
      { texte: "Fatigue", confiance: 0.85 }
    ],
    diagnosticsSuggeres: [
      { nom: "Grippe saisonnière", probabilite: 0.75 },
      { nom: "Covid-19", probabilite: 0.65 },
      { nom: "Infection virale", probabilite: 0.55 }
    ],
    examensRecommandes: [
      "Test PCR",
      "Bilan sanguin complet",
      "Radiographie thoracique"
    ]
  });

  const handleTranscriptionUpdate = (newTranscription: string) => {
    setTranscription(newTranscription);
    // Ici, vous pourriez déclencher l'analyse IA
  };

  const handleSubmit = () => {
    const consultationData = {
      patientId,
      transcription,
      notes,
      aiSuggestions,
      timestamp: new Date().toISOString()
    };
    onSubmit(consultationData);
  };

  return (
    <div className="flex h-full">
      {/* Zone principale */}
      <div className="flex-1 flex flex-col">
        {/* En-tête */}
        <div className="bg-white dark:bg-gray-800 shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Consultation en cours
                </span>
              </div>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {patientName}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowAIAssistant(!showAIAssistant)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Toggle AI Assistant"
              >
                <Brain className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <button
                onClick={onCancel}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Cancel"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-5 h-5" />
                Terminer
              </button>
            </div>
          </div>

          {/* Onglets */}
          <div className="flex gap-4 mt-4">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Contenu principal */}
        <div className="flex-1 p-6 overflow-auto">
          {activeTab === 'notes' && (
            <div className="space-y-6">
              <VoiceRecorder
                isRecording={isRecording}
                onRecordingStateChange={setIsRecording}
                onTranscriptionUpdate={handleTranscriptionUpdate}
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Notes du médecin
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full h-64 p-4 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700"
                  placeholder="Saisissez vos notes ici..."
                />
              </div>

              <PrescriptionForm />
            </div>
          )}

          {activeTab === 'images' && (
            <div className="grid grid-cols-2 gap-6">
              <div className="border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center">
                <Camera className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">
                  Capturer ou importer une image
                </span>
              </div>
            </div>
          )}

          {/* Autres onglets à implémenter */}
        </div>
      </div>

      {/* Assistant IA */}
      {showAIAssistant && (
        <AIAssistant
          symptomes={aiSuggestions.symptomes}
          diagnosticsSuggeres={aiSuggestions.diagnosticsSuggeres}
          examensRecommandes={aiSuggestions.examensRecommandes}
        />
      )}
    </div>
  );
};

export default ConsultationForm;