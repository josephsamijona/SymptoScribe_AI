'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Lock, Mail, Brain, ArrowRight } from 'lucide-react';

const AuthPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulation d'une connexion
    try {
      // Ici viendra l'appel à l'API d'authentification
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Redirection vers le dashboard après connexion
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Erreur de connexion:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Partie gauche - Formulaire */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo et Titre */}
          <div className="text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Brain className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                SymptoScribe AI
              </h1>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Connexion à votre espace
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Assistant médical intelligent
            </p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Se souvenir de moi
                </label>
              </div>

              <Link 
                href="/auth/reset-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full flex items-center justify-center gap-2 
                px-4 py-2 rounded-lg
                bg-blue-600 hover:bg-blue-700 
                text-white font-medium
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors
              `}
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Autres options */}
          <div className="mt-6">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Nouveau sur SymptoScribe ?{' '}
              <Link 
                href="/auth/register"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Partie droite - Image/Illustration */}
      <div className="hidden lg:flex lg:flex-1 bg-blue-600">
        <div className="relative w-full h-full">
          <Image
            src="/api/placeholder/1200/800"
            alt="Medical illustration"
            fill
            className="opacity-20 object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="max-w-lg text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Bienvenue sur SymptoScribe AI
              </h2>
              <p className="text-lg text-blue-100">
                L&apos;assistant intelligent qui révolutionne la pratique médicale.
                Gagnez en efficacité et en précision dans vos consultations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;