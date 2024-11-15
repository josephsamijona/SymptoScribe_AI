import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  Users, Calendar, FileText, 
  BarChart2, Settings, Brain,
  Layout, Bell, Menu
} from 'lucide-react';

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

// Définition des liens de navigation
const navigationLinks = [
  {
    label: "Dashboard",
    icon: Layout,
    href: "/dashboard",
  },
  {
    label: "Patients",
    icon: Users,
    href: "/patients",
  },
  {
    label: "Consultations",
    icon: Calendar,
    href: "/consultations",
  },
  {
    label: "Rapports",
    icon: FileText,
    href: "/reports",
  },
  
  {
    label: "Assistant IA",
    icon: Brain,
    href: "/ai-assistant",
  },
  
  {
    label: "Paramètres",
    icon: Settings,
    href: "/settings",
  },
];

const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed = false,
  onToggle
}) => {
  const router = useRouter();
  const pathname = usePathname();

  // Fonction pour déterminer si un lien est actif
  const isActiveLink = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <aside 
      className={`
        fixed top-0 left-0 z-40 h-screen transition-width duration-300 ease-in-out
        bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* En-tête du Sidebar */}
      <div className="flex items-center justify-between p-4 h-16">
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            SymptoScribe
          </h1>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label={isCollapsed ? "Développer" : "Réduire"}
        >
          <Menu className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      {/* Navigation principale */}
      <nav className="px-4 pt-4">
        <ul className="space-y-2">
          {navigationLinks.map((link) => {
            const isActive = isActiveLink(link.href);
            const Icon = link.icon;

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`
                    flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} 
                    p-3 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} />
                  {!isCollapsed && (
                    <span className="font-medium">{link.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* État Assistant IA */}
      <div className={`
        absolute bottom-0 left-0 right-0 p-4
        border-t border-gray-200 dark:border-gray-700
      `}>
        <div className={`
          flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}
          text-sm text-gray-600 dark:text-gray-400
        `}>
          {!isCollapsed && <span>Assistant IA</span>}
          <div className="flex items-center gap-2">
            <span className="block w-2 h-2 bg-green-500 rounded-full"></span>
            {!isCollapsed && <span>En ligne</span>}
          </div>
        </div>
      </div>
    </aside>
  );
};

// Pour le layout responsive, vous aurez besoin d'un composant wrapper
export const SidebarWrapper: React.FC<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
}> = ({ children, sidebar }) => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {sidebar}
      <main className="flex-1 ml-64">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;