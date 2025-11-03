import React from 'react';
import {
  Home as HomeIcon,
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
  ArrowRight,
  Package,
  Map,
  BarChart3,
  Zap,
  Shield,
  TrendingUp
} from 'lucide-react';

interface ModuleCardProps {
  icon: any;
  title: string;
  description: string;
  features: string[];
  color: string;
  onClick: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ icon: Icon, title, description, features, color, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="card-cegal bg-cegal-darker border-cegal-gray-700 p-6 hover:border-cegal-primary/50 transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 ${color} rounded-lg group-hover:scale-110 transition-transform`}>
          <Icon className="h-6 w-6" />
        </div>
        <ArrowRight className="h-5 w-5 text-cegal-gray-600 group-hover:text-cegal-primary group-hover:translate-x-1 transition-all" />
      </div>

      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cegal-green transition-colors">
        {title}
      </h3>
      <p className="text-sm text-cegal-gray-400 mb-4 leading-relaxed">
        {description}
      </p>

      <div className="space-y-2">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-cegal-primary rounded-full"></div>
            <span className="text-xs text-cegal-gray-400">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

interface HomeProps {
  onNavigate: (tab: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const modules = [
    {
      id: 'overview',
      icon: BarChart3,
      title: 'Overview Dashboard',
      description: 'Your command center for monitoring system health, data quality, and performance metrics across all modules.',
      features: ['Real-time system metrics', 'Application analytics', 'Data quality insights'],
      color: 'bg-blue-500/20 text-blue-400'
    },
    {
      id: 'seismic',
      icon: Layers,
      title: 'Seismic Data',
      description: 'Manage and visualize seismic surveys with advanced search, duplicate detection, and geographic mapping.',
      features: ['File management', 'Map visualization', 'Duplicate analysis'],
      color: 'bg-cegal-green/20 text-cegal-green'
    },
    {
      id: 'wells',
      icon: Drill,
      title: 'Well Data',
      description: 'Track drilling operations, well logs, and production data with interactive maps and comprehensive metadata.',
      features: ['Well tracking', 'Geographic maps', 'Production data'],
      color: 'bg-amber-500/20 text-amber-400'
    },
    {
      id: 'projects',
      icon: FolderOpen,
      title: 'Project Data',
      description: 'Centralized project management across Petrel, Techlog, Eclipse, and other subsurface applications.',
      features: ['Multi-app support', 'Project analytics', 'Storage tracking'],
      color: 'bg-purple-500/20 text-purple-400'
    },
    {
      id: 'management',
      icon: Database,
      title: 'Data Management',
      description: 'Powerful tools for searching, filtering, tagging, and organizing your subsurface data assets.',
      features: ['Advanced search', 'Metadata tagging', 'Bulk operations'],
      color: 'bg-cegal-primary/20 text-cegal-primary'
    },
    {
      id: 'insights',
      icon: LineChart,
      title: 'Data Insights',
      description: 'Advanced analytics and predictive insights to optimize storage, identify trends, and improve efficiency.',
      features: ['Trend analysis', 'Predictive analytics', 'Usage patterns'],
      color: 'bg-emerald-500/20 text-emerald-400'
    },
    {
      id: 'impact',
      icon: Activity,
      title: 'Impact Analysis',
      description: 'Assess the impact of changes and understand dependencies across your data ecosystem.',
      features: ['Dependency tracking', 'Risk assessment', 'Change impact'],
      color: 'bg-red-500/20 text-red-400'
    },
    {
      id: 'reservoir-simulation',
      icon: Droplets,
      title: 'Reservoir Simulation',
      description: 'Manage simulation models, track runs, and analyze results for Eclipse, Intersect, and other simulators.',
      features: ['Model management', 'Run tracking', 'Result analysis'],
      color: 'bg-cyan-500/20 text-cyan-400'
    },
    {
      id: 'storage',
      icon: HardDrive,
      title: 'Storage Management',
      description: 'Monitor capacity, optimize allocation, and plan for future storage needs across all data types.',
      features: ['Capacity planning', 'Usage monitoring', 'Optimization tools'],
      color: 'bg-orange-500/20 text-orange-400'
    },
    {
      id: 'archive',
      icon: Archive,
      title: 'Archive',
      description: 'Safely archive older data while maintaining accessibility for compliance and historical analysis.',
      features: ['Data archiving', 'Retrieval system', 'Compliance tools'],
      color: 'bg-slate-500/20 text-slate-400'
    },
    {
      id: 'cleanup',
      icon: Trash2,
      title: 'Data Cleanup',
      description: 'Automated tools for identifying and removing duplicate, corrupt, or obsolete data to free up space.',
      features: ['Duplicate detection', 'Batch processing', 'Quality checks'],
      color: 'bg-rose-500/20 text-rose-400'
    },
    {
      id: 'configuration',
      icon: Settings,
      title: 'Configuration',
      description: 'System-wide settings for security, notifications, users, licenses, and advanced tag management.',
      features: ['Security settings', 'User management', 'Tag administration'],
      color: 'bg-yellow-500/20 text-yellow-400'
    }
  ];

  const stats = [
    { icon: Package, label: 'Applications', value: '7', color: 'text-blue-400' },
    { icon: Database, label: 'Data Modules', value: '4', color: 'text-cegal-green' },
    { icon: Zap, label: 'Analytics Tools', value: '3', color: 'text-amber-400' },
    { icon: Shield, label: 'Security Features', value: 'RLS + Auth', color: 'text-purple-400' }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 py-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-cegal rounded-2xl shadow-cegal mb-4">
          <HomeIcon className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white">
          Welcome to <span className="text-cegal-green">Cegal</span> Data Platform
        </h1>
        <p className="text-lg text-cegal-gray-400 max-w-3xl mx-auto">
          Your comprehensive solution for managing, analyzing, and optimizing subsurface data across the entire oil and gas workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card-cegal bg-cegal-darker border-cegal-gray-700 p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-cegal-gray-800 rounded-lg">
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-cegal-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Explore Modules</h2>
          <button
            onClick={() => onNavigate('sitemap')}
            className="flex items-center space-x-2 px-4 py-2 bg-cegal-gray-800 hover:bg-cegal-gray-700 border border-cegal-gray-700 rounded-lg text-sm text-white transition-colors"
          >
            <Map className="h-4 w-4" />
            <span>View Site Map</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map(module => (
            <ModuleCard
              key={module.id}
              icon={module.icon}
              title={module.title}
              description={module.description}
              features={module.features}
              color={module.color}
              onClick={() => onNavigate(module.id)}
            />
          ))}
        </div>
      </div>

      <div className="card-cegal bg-gradient-to-r from-cegal-primary/10 to-cegal-green/10 border-cegal-primary/30 p-8">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white">Getting Started</h3>
            <p className="text-cegal-gray-400 max-w-2xl">
              New to the platform? Start with the Setup wizard to configure your system, or jump straight into the Overview dashboard to see your data at a glance.
            </p>
            <div className="flex space-x-3 pt-4">
              <button
                onClick={() => onNavigate('setup')}
                className="px-6 py-3 bg-gradient-cegal text-white rounded-lg font-medium hover:shadow-cegal transition-all"
              >
                Start Setup
              </button>
              <button
                onClick={() => onNavigate('overview')}
                className="px-6 py-3 bg-cegal-gray-800 text-white rounded-lg font-medium hover:bg-cegal-gray-700 transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
          <TrendingUp className="h-24 w-24 text-cegal-green/20" />
        </div>
      </div>

      <div className="card-cegal bg-cegal-darker border-cegal-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => onNavigate('overview')}
            className="flex items-center space-x-2 px-4 py-3 bg-cegal-gray-800 hover:bg-cegal-gray-700 border border-cegal-gray-700 rounded-lg text-left transition-colors group"
          >
            <BarChart3 className="h-4 w-4 text-cegal-gray-400 group-hover:text-blue-400" />
            <span className="text-sm text-white">Dashboard</span>
          </button>
          <button
            onClick={() => onNavigate('seismic')}
            className="flex items-center space-x-2 px-4 py-3 bg-cegal-gray-800 hover:bg-cegal-gray-700 border border-cegal-gray-700 rounded-lg text-left transition-colors group"
          >
            <Layers className="h-4 w-4 text-cegal-gray-400 group-hover:text-cegal-green" />
            <span className="text-sm text-white">Seismic</span>
          </button>
          <button
            onClick={() => onNavigate('wells')}
            className="flex items-center space-x-2 px-4 py-3 bg-cegal-gray-800 hover:bg-cegal-gray-700 border border-cegal-gray-700 rounded-lg text-left transition-colors group"
          >
            <Drill className="h-4 w-4 text-cegal-gray-400 group-hover:text-amber-400" />
            <span className="text-sm text-white">Wells</span>
          </button>
          <button
            onClick={() => onNavigate('configuration')}
            className="flex items-center space-x-2 px-4 py-3 bg-cegal-gray-800 hover:bg-cegal-gray-700 border border-cegal-gray-700 rounded-lg text-left transition-colors group"
          >
            <Settings className="h-4 w-4 text-cegal-gray-400 group-hover:text-yellow-400" />
            <span className="text-sm text-white">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
