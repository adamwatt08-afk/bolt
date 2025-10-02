import React from 'react';
import {
  BarChart3,
  Database,
  FileText,
  Trash2,
  Archive,
  TrendingDown,
  Activity,
  MapPin,
  Layers,
  Drill,
  Settings,
  ChevronRight,
  Droplets,
  HardDrive,
  Wrench
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface NavSection {
  title: string;
  items: { id: string; label: string; icon: React.ElementType }[];
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navigationSections: NavSection[] = [
    {
      title: 'Command Centre',
      items: [
        { id: 'setup', label: 'Setup', icon: Wrench },
      ]
    },
    {
      title: 'Core',
      items: [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
      ]
    },
    {
      title: 'Domains',
      items: [
        { id: 'seismic', label: 'Seismic Data', icon: Layers },
        { id: 'wells', label: 'Well Data', icon: Drill },
        { id: 'projects', label: 'Projects', icon: FileText },
        { id: 'reservoir-simulation', label: 'Reservoir Simulation', icon: Droplets },
      ]
    },
    {
      title: 'Ecosystem',
      items: [
        { id: 'insights', label: 'Insights', icon: Activity },
        { id: 'impact', label: 'Impact Analysis', icon: TrendingDown },
        { id: 'storage', label: 'Storage Management', icon: HardDrive },
      ]
    },
    {
      title: 'Operations',
      items: [
        { id: 'management', label: 'Management', icon: Database },
        { id: 'cleanup', label: 'Cleanup', icon: Trash2 },
        { id: 'archive', label: 'Archive', icon: Archive },
      ]
    },
    {
      title: 'Settings',
      items: [
        { id: 'configuration', label: 'Configuration', icon: Settings },
      ]
    }
  ];

  return (
    <aside className="bg-cegal-darker text-white w-64 min-h-screen border-r border-cegal-gray-700 flex flex-col">
      <div className="p-6 flex-1 overflow-y-auto">

        <nav className="space-y-6">
          {navigationSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="text-xs font-semibold text-cegal-gray-400 uppercase tracking-wider mb-3 px-3">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                        isActive
                          ? 'bg-gradient-cegal text-white shadow-cegal'
                          : 'text-cegal-gray-300 hover:bg-cegal-gray-700/50 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-cegal-gray-400 group-hover:text-cegal-green'}`} />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                      {isActive && (
                        <ChevronRight className="h-4 w-4 text-white" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <div className="p-6 border-t border-cegal-gray-700">
        <div className="flex items-center space-x-3 text-xs text-cegal-gray-400">
          <div className="w-2 h-2 bg-cegal-green rounded-full animate-pulse"></div>
          <span>System Online</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;