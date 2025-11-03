import React, { useState } from 'react';
import { Command, Settings, BarChart3 } from 'lucide-react';
import Setup from './Setup';
import Overview from './Overview';

const CenovaCommand: React.FC = () => {
  const [activeView, setActiveView] = useState<'overview' | 'setup'>('overview');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <Command className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Cenova Command</h2>
            <p className="text-cegal-gray-400">System control and monitoring center</p>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setActiveView('overview')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeView === 'overview'
                ? 'bg-gradient-cegal text-white shadow-cegal'
                : 'bg-cegal-gray-800 text-cegal-gray-400 hover:bg-cegal-gray-700 hover:text-white'
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setActiveView('setup')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeView === 'setup'
                ? 'bg-gradient-cegal text-white shadow-cegal'
                : 'bg-cegal-gray-800 text-cegal-gray-400 hover:bg-cegal-gray-700 hover:text-white'
            }`}
          >
            <Settings className="h-4 w-4" />
            <span>Setup</span>
          </button>
        </div>
      </div>

      <div>
        {activeView === 'overview' && <Overview />}
        {activeView === 'setup' && <Setup />}
      </div>
    </div>
  );
};

export default CenovaCommand;
