"use client";

// src/app/ai-assistant/chat/page.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Send,
  Upload,
  Globe,
  History,
  Settings,
  ChevronDown,
  X,
  Pause,
  Play,
  Bot,
  MessageSquare,
  Volume2,
  VolumeX
} from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
  isAudio?: boolean;
}

interface VoiceState {
  isRecording: boolean;
  isPaused: boolean;
}

const AIChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [voiceState, setVoiceState] = useState<VoiceState>({
    isRecording: false,
    isPaused: false
  });
  const [aiVersion, setAiVersion] = useState('gpt-4');
  const [interactionMode, setInteractionMode] = useState<'chat' | 'voice'>('chat');
  const [isMuted, setIsMuted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const audioWaveRef = useRef<HTMLDivElement>(null);

  // Animation de l'onde sonore
  useEffect(() => {
    if (voiceState.isRecording && !voiceState.isPaused) {
      // Ici, ajoutez l'animation de l'onde sonore
    }
  }, [voiceState]);

  const handleSend = async () => {
    if (!inputValue.trim() && !voiceState.isRecording) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      type: 'user',
      timestamp: new Date(),
      isAudio: interactionMode === 'voice'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsProcessing(true);

    // Simuler une réponse de l'IA
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Je suis là pour vous aider avec votre consultation.",
        type: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 1000);
  };

  const toggleVoice = () => {
    if (voiceState.isRecording) {
      setVoiceState({ ...voiceState, isPaused: !voiceState.isPaused });
    } else {
      setVoiceState({ isRecording: true, isPaused: false });
      setInteractionMode('voice');
    }
  };

  const stopRecording = () => {
    setVoiceState({ isRecording: false, isPaused: false });
    handleSend();
  };

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar Historique */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Historique
          </h2>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg" title="History">
            <History className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Liste des conversations passées */}
        <div className="space-y-2">
          {['Consultation précédente', 'Analyse radiologie', 'Discussion protocole'].map((item, index) => (
            <button
              key={index}
              className="w-full text-left p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {item}
              </div>
              <div className="text-xs text-gray-500">
                {new Date().toLocaleDateString()}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Zone principale */}
      <div className="flex-1 flex flex-col">
        {/* En-tête */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <select
                  aria-label="Select AI Version"
                  value={aiVersion}
                  onChange={(e) => setAiVersion(e.target.value)}
                  className="appearance-none bg-gray-100 dark:bg-gray-700 px-4 py-2 pr-10 rounded-lg focus:outline-none"
                >
                  <option value="gpt-4">GPT-4</option>
                  <option value="gpt-3.5">GPT-3.5</option>
                  <option value="custom">Custom Model</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-gray-500" />
                ) : (
                  <Volume2 className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg" title="Upload">
                <Upload className="w-5 h-5 text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg" title="Globe">
                <Globe className="w-5 h-5 text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg" title="Settings">
                <Settings className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Zone de chat */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-4 ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800'
                }`}
              >
                {message.isAudio && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-current rounded-full animate-pulse" />
                    <span className="text-sm">Audio message</span>
                  </div>
                )}
                <p>{message.content}</p>
                <div className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}

          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-200ms" />
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-400ms" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Zone de saisie */}
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleVoice}
              className={`p-3 rounded-full transition-colors ${
                voiceState.isRecording
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-500'
              }`}
            >
              {voiceState.isRecording ? (
                voiceState.isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </button>

            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Écrivez votre message..."
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none"
                disabled={voiceState.isRecording}
              />
              
              {/* Onde sonore pour le mode vocal */}
              {voiceState.isRecording && (
                <div
                  ref={audioWaveRef}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {/* Animation de l'onde ici */}
                </div>
              )}
            </div>

            {voiceState.isRecording ? (
              <button
                onClick={stopRecording}
                className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600"
                title="Stop Recording"
              >
                <X className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSend}
                className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                title="Send Message"
              >
                <Send className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatInterface;