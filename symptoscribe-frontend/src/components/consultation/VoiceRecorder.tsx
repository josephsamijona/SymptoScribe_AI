"use client";

import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Pause, Play } from 'lucide-react';

interface VoiceRecorderProps {
  onTranscriptionUpdate?: (transcription: string) => void;
  isRecording?: boolean;
  onRecordingStateChange?: (isRecording: boolean) => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  onTranscriptionUpdate,
  isRecording = false,
  onRecordingStateChange
}) => {
  const [transcription, setTranscription] = useState<string>('');
  const [elapsedTime, setElapsedTime] = useState(0);

  // Simuler la transcription en temps réel
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
        // Simulation de nouvelle transcription
        const newText = "Le patient se plaint de fièvre depuis trois jours";
        setTranscription(prev => {
          const updated = prev + (prev ? ' ' : '') + newText;
          onTranscriptionUpdate?.(updated);
          return updated;
        });
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isRecording, onTranscriptionUpdate]);

  const toggleRecording = () => {
    onRecordingStateChange?.(!isRecording);
  };

  // Formatage du temps écoulé
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {/* Timer et contrôles */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {formatTime(elapsedTime)}
          </div>
          <div className="text-sm text-blue-600 dark:text-blue-400">
            Consultation en cours
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleRecording}
            className={`p-3 rounded-full transition-colors ${
              isRecording 
                ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 hover:bg-red-200' 
                : 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 hover:bg-blue-200'
            }`}
          >
            {isRecording ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Zone de transcription */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Transcription en direct
          </span>
          {isRecording && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm text-red-500">Enregistrement en cours</span>
            </div>
          )}
        </div>
        <div className="min-h-[100px] p-4 bg-white dark:bg-gray-800 rounded-lg font-mono text-sm text-gray-600 dark:text-gray-300">
          {transcription || 'Prêt à enregistrer...'}
        </div>
      </div>
    </div>
  );
};

export default VoiceRecorder;