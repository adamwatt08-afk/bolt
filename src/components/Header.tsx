import React from 'react';
import { Search, Settings, User, Menu } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-cegal-darker border-b border-cegal-gray-700 shadow-cegal">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              {/* Cegal Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-cegal rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <div className="h-8 w-px bg-cegal-gray-300"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-cegal-green">Cenova</h1>
                <p className="text-xs text-cegal-gray-500 -mt-1">by Cegal</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cegal-gray-400" />
              <input
                type="text"
                placeholder="Search data assets..."
                className="pl-10 pr-4 py-2 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent text-sm w-64 bg-cegal-dark text-white placeholder-cegal-gray-400"
              />
            </div>
            
            <button className="p-2 text-cegal-gray-400 hover:text-cegal-green transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            
            <div className="flex items-center space-x-2 bg-cegal-dark rounded-lg px-3 py-2 border border-cegal-gray-600">
              <User className="h-4 w-4 text-cegal-gray-500" />
              <span className="text-sm text-white">John Smith</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;