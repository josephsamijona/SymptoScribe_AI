import React from 'react';
import { 
  Search, 
  Bell, 
  Sun, 
  Moon,
  Menu as MenuIcon
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

interface HeaderProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  showMenuButton = true,
  onSearch
}) => {
  const [notifications] = React.useState([
    // Simuler quelques notifications
    { id: 1, type: 'info', unread: true },
    { id: 2, type: 'warning', unread: true }
  ]);

  const { theme, setTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  // Gérer la soumission de la recherche
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 h-16 flex items-center justify-between">
        {/* Partie gauche */}
        <div className="flex items-center gap-4">
          {showMenuButton && (
            <button
              onClick={onMenuClick}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
              aria-label="Menu"
            >
              <MenuIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          )}

          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`
                  pl-10 pr-4 py-2 w-full sm:w-64 md:w-80 
                  rounded-lg border border-gray-200 dark:border-gray-600 
                  bg-white dark:bg-gray-800
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  transition-all
                  ${isSearchOpen ? 'w-full' : ''}
                `}
              />
            </div>
          </form>
        </div>

        {/* Partie droite */}
        <div className="flex items-center gap-3">
          {/* Bouton mode sombre */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Changer le thème"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button 
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              {notifications.some(n => n.unread) && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full" />
              )}
            </button>
          </div>

          {/* Profil utilisateur */}
          <div className="flex items-center">
            <button className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" title="Profil utilisateur">
              <div className="relative w-8 h-8">
                <Image
                  src="/api/placeholder/32/32"
                  alt="Photo de profil"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Barre de recherche mobile */}
      {isSearchOpen && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 lg:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800"
            />
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;