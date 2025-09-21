import React from 'react';
import { PageId } from '@/types';

interface PageIndicatorProps {
  currentPage: PageId;
}

const pages: PageId[] = ['home', 'about', 'projects', 'skills', 'contact'];

export const PageIndicator: React.FC<PageIndicatorProps> = ({ currentPage }) => {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 hidden md:block">
      <div className="flex items-center space-x-3 bg-black/40 backdrop-blur-lg rounded-full px-6 py-3 border border-white/10">
        {pages.map((page, index) => (
          <div key={page} className="flex items-center">
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentPage === page 
                  ? 'bg-cyan-400 w-8 shadow-lg shadow-cyan-400/50' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            ></div>
            {index < pages.length - 1 && (
              <div className="w-6 h-px bg-gradient-to-r from-gray-600 to-transparent ml-3"></div>
            )}
          </div>
        ))}
        
        {/* Page Name Display */}
        <div className="ml-4 text-xs text-gray-400 font-medium capitalize">
          {currentPage}
        </div>
      </div>
    </div>
  );
};