import React, { useState } from 'react';
import {
  Home,
  Database,
  Layers,
  Drill,
  FolderOpen,
  LineChart,
  Activity,
  Droplets,
  HardDrive,
  Settings,
  Archive,
  Trash2,
  Search,
  Package,
  Map,
  Tag,
  BarChart3,
  FileText,
  TrendingDown
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: any;
  description: string;
  subsections?: string[];
}

const SiteMap: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Sections' },
    { id: 'data', label: 'Data' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'operations', label: 'Operations' },
    { id: 'system', label: 'System' }
  ];

  const navItems: NavItem[] = [
    {
      id: 'setup',
      label: 'Setup',
      icon: Settings,
      description: 'Get started with system configuration',
      subsections: []
    },
    {
      id: 'overview',
      label: 'Overview',
      icon: Home,
      description: 'Dashboard with metrics and insights',
      subsections: ['Summary', 'Applications', 'Seismic', 'Wells', 'Analytics', 'Querying']
    },
    {
      id: 'seismic',
      label: 'Seismic Data',
      icon: Layers,
      description: 'Manage seismic files and surveys',
      subsections: ['Data View', 'Map View']
    },
    {
      id: 'wells',
      label: 'Well Data',
      icon: Drill,
      description: 'Track wells and drilling data',
      subsections: ['Data View', 'Map View']
    },
    {
      id: 'projects',
      label: 'Project Data',
      icon: FolderOpen,
      description: 'Browse projects by application'
    },
    {
      id: 'management',
      label: 'Data Management',
      icon: Database,
      description: 'Search, filter, tag, and organize data'
    },
    {
      id: 'insights',
      label: 'Data Insights',
      icon: LineChart,
      description: 'Advanced analytics and trends'
    },
    {
      id: 'impact',
      label: 'Impact Analysis',
      icon: Activity,
      description: 'Assess change impact and dependencies'
    },
    {
      id: 'reservoir-simulation',
      label: 'Reservoir Simulation',
      icon: Droplets,
      description: 'Simulation models and tracking'
    },
    {
      id: 'storage',
      label: 'Storage Management',
      icon: HardDrive,
      description: 'Monitor capacity and optimize storage'
    },
    {
      id: 'configuration',
      label: 'Configuration',
      icon: Settings,
      description: 'System settings and preferences',
      subsections: ['General', 'Database', 'Security', 'Notifications', 'Users', 'Licenses', 'Tags']
    },
    {
      id: 'archive',
      label: 'Archive',
      icon: Archive,
      description: 'Access archived data'
    },
    {
      id: 'cleanup',
      label: 'Data Cleanup',
      icon: Trash2,
      description: 'Automated cleanup and batch processing'
    }
  ];

  const getCategoryForItem = (item: NavItem): string => {
    if (['seismic', 'wells', 'projects', 'management'].includes(item.id)) return 'data';
    if (['overview', 'insights', 'impact'].includes(item.id)) return 'analytics';
    if (['archive', 'cleanup', 'storage'].includes(item.id)) return 'operations';
    if (['setup', 'configuration', 'reservoir-simulation'].includes(item.id)) return 'system';
    return 'all';
  };

  const filteredItems = navItems.filter(item => {
    const matchesSearch = searchQuery === '' ||
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.subsections && item.subsections.some(sub => sub.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesCategory = selectedCategory === 'all' || getCategoryForItem(item) === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-cegal-green">Site Map</h2>
        <p className="text-cegal-gray-400 mt-1">
          Quick navigation to all platform features
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card-cegal bg-cegal-darker border-cegal-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-cegal-primary/20 rounded-lg">
              <Package className="h-5 w-5 text-cegal-primary" />
            </div>
            <div>
              <p className="text-xs text-cegal-gray-400">Total Sections</p>
              <p className="text-xl font-bold text-white">{navItems.length}</p>
            </div>
          </div>
        </div>

        <div className="card-cegal bg-cegal-darker border-cegal-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-cegal-green/20 rounded-lg">
              <Layers className="h-5 w-5 text-cegal-green" />
            </div>
            <div>
              <p className="text-xs text-cegal-gray-400">Data Modules</p>
              <p className="text-xl font-bold text-white">4</p>
            </div>
          </div>
        </div>

        <div className="card-cegal bg-cegal-darker border-cegal-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <BarChart3 className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-cegal-gray-400">Analytics</p>
              <p className="text-xl font-bold text-white">3</p>
            </div>
          </div>
        </div>

        <div className="card-cegal bg-cegal-darker border-cegal-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <Settings className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-cegal-gray-400">Config Options</p>
              <p className="text-xl font-bold text-white">7</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card-cegal bg-cegal-darker border-cegal-gray-700 p-6">
        <div className="space-y-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cegal-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sections..."
              className="w-full pl-10 pr-4 py-2.5 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent bg-cegal-dark text-white placeholder-cegal-gray-500"
            />
          </div>

          <div className="flex space-x-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-cegal-primary text-white'
                    : 'bg-cegal-gray-800 text-cegal-gray-400 hover:bg-cegal-gray-700 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map(item => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-cegal-gray-800 border border-cegal-gray-700 rounded-lg p-4 hover:border-cegal-gray-600 transition-all group cursor-pointer"
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-cegal-primary/20 rounded-lg group-hover:bg-cegal-primary/30 transition-colors">
                    <Icon className="h-5 w-5 text-cegal-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white mb-1 group-hover:text-cegal-green transition-colors">
                      {item.label}
                    </h3>
                    <p className="text-xs text-cegal-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                    {item.subsections && item.subsections.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-cegal-gray-700">
                        <div className="flex flex-wrap gap-1.5">
                          {item.subsections.map(sub => (
                            <span
                              key={sub}
                              className="px-2 py-0.5 bg-cegal-gray-700 rounded text-xs text-cegal-gray-300"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-cegal-gray-600 mx-auto mb-3" />
            <p className="text-cegal-gray-400">No sections found</p>
            <p className="text-sm text-cegal-gray-500 mt-1">Try a different search or category</p>
          </div>
        )}
      </div>

      <div className="card-cegal bg-cegal-darker border-cegal-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="flex items-center space-x-2 px-4 py-3 bg-cegal-gray-800 hover:bg-cegal-gray-700 border border-cegal-gray-700 rounded-lg text-left transition-colors group">
            <Package className="h-4 w-4 text-cegal-gray-400 group-hover:text-cegal-primary" />
            <span className="text-sm text-white">7 Applications</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-3 bg-cegal-gray-800 hover:bg-cegal-gray-700 border border-cegal-gray-700 rounded-lg text-left transition-colors group">
            <Map className="h-4 w-4 text-cegal-gray-400 group-hover:text-cegal-green" />
            <span className="text-sm text-white">2 Map Views</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-3 bg-cegal-gray-800 hover:bg-cegal-gray-700 border border-cegal-gray-700 rounded-lg text-left transition-colors group">
            <Tag className="h-4 w-4 text-cegal-gray-400 group-hover:text-amber-400" />
            <span className="text-sm text-white">Tag Merging</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-3 bg-cegal-gray-800 hover:bg-cegal-gray-700 border border-cegal-gray-700 rounded-lg text-left transition-colors group">
            <LineChart className="h-4 w-4 text-cegal-gray-400 group-hover:text-blue-400" />
            <span className="text-sm text-white">Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SiteMap;
