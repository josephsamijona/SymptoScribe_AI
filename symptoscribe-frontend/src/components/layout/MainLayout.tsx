import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Gérer la responsivité
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarCollapsed(true);
      }
    };

    // Appel initial
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mainContentStyles = `
    flex-1 flex flex-col min-h-screen
    transition-all duration-300 ease-in-out
    ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}
  `;

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Overlay pour mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 z-40 h-screen
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      {/* Contenu principal */}
      <div className={mainContentStyles}>
        {/* Header */}
        <Header
          showMenuButton={true}
          onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        {/* Zone de contenu principal */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 sm:p-6">
            {children}
          </div>
        </main>

        {/* Footer optionnel */}
        <footer className="py-4 px-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} SymptoScribe AI
            </p>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Assistant IA connecté
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

// HOC pour appliquer le layout
export const withMainLayout = (Component: React.ComponentType) => {
  return function WrappedComponent(props: any) {
    return (
      <MainLayout>
        <Component {...props} />
      </MainLayout>
    );
  };
};

export default MainLayout;