"use client";

// src/components/ai-assistant/AIChatModal.tsx
import React, { useState } from 'react';
import { X, Mic, Send, Minimize2, Maximize2 } from 'lucide-react';
import VoiceAnimation, { AIVoiceAnimation } from '@/components/ai-assistant/VoiceAnimation';


interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  aiName?: string;
}

const AIChatModal: React.FC<AIChatModalProps> = ({
  isOpen,
  onClose,
  aiName = "Assistant IA"
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed ${
        isMinimized ? 'bottom-4 right-4 w-72' : 'inset-0'
      } bg-gray-50 dark:bg-gray-900 shadow-xl rounded-lg transition-all duration-300 z-50`}
    >
      {/* En-tête */}
      <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <h3 className="font-medium text-gray-900 dark:text-white">
            {aiName}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button 
            title="Minimize or Maximize"
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button 
            title="none"
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Corps */}
      {!isMinimized && (
        <div className="flex flex-col h-[calc(100%-4rem)]">
          {/* Zone de visualisation de l'onde */}
          <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-blue-500/5 to-purple-500/5">
            {isAISpeaking ? (
              <AIVoiceAnimation isActive={true} />
            ) : isUserSpeaking ? (
              <VoiceAnimation isActive={true} />
            ) : (
              <div className="text-gray-400 dark:text-gray-500">
                Appuyez sur le micro pour parler...
              </div>
            )}
          </div>

          {/* Contrôles */}
          <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-center gap-4">
              <button
                title="Toggle microphone"
                onClick={() => setIsUserSpeaking(!isUserSpeaking)}
                className={`p-4 rounded-full transition-all ${
                  isUserSpeaking
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-500'
                }`}
              >
                <Mic className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatModal;