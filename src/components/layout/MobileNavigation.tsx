import React from 'react';
import { Home, User, Briefcase, Code, Mail } from 'lucide-react';
import { PageId } from '@/types';

interface MobileNavigationProps {
  currentPage: PageId;
  onPageChange: (page: PageId) => void;
}

const navigationItems = [
  { id: 'home' as PageId, label: 'Home', icon: Home },
  { id: 'about' as PageId, label: 'About', icon: User },
  { id: 'projects' as PageId, label: 'Projects', icon: Briefcase },
  { id: 'skills' as PageId, label: 'Skills', icon: Code },
  { id: 'contact' as PageId, label: 'Contact', icon: Mail },
];

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  currentPage,
  onPageChange
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-white/10 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-around">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`flex flex-col items-center px-3 py-2 rounded-lg transition-all ${
                currentPage === item.id
                  ? 'bg-cyan-600/30 text-cyan-400'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
              }`}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};