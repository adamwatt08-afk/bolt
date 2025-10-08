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
  ChevronRight,
  ChevronDown,
  Search,
  Map,
  Tag,
  Users,
  Shield,
  Bell,
  Key,
  Package
} from 'lucide-react';

interface NavigationItem {
  id: string;
  label: string;
  icon: any;
  description: string;
  children?: NavigationItem[];
  badge?: string;
}

const SiteMap: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['overview', 'configuration']));
  const [searchQuery, setSearchQuery] = useState('');

  const navigationStructure: NavigationItem[] = [
    {
      id: 'setup',
      label: 'Setup',
      icon: Settings,
      description: 'Initial system configuration and onboarding wizard'
    },
    {
      id: 'overview',
      label: 'Overview',
      icon: Home,
      description: 'System-wide dashboard with key metrics and insights',
      children: [
        {
          id: 'overview-summary',
          label: 'Summary',
          icon: Activity,
          description: 'System metrics, storage overview, and data quality indicators'
        },
        {
          id: 'overview-applications',
          label: 'Applications',
          icon: Package,
          description: 'Petrel, Techlog, Eclipse, ResInsight, Intersect, Kingdom, GeoFrame'
        },
        {
          id: 'overview-seismic',
          label: 'Seismic',
          icon: Layers,
          description: 'Seismic data overview and duplicate analysis'
        },
        {
          id: 'overview-wells',
          label: 'Wells',
          icon: Drill,
          description: 'Well data overview and duplicate analysis'
        },
        {
          id: 'overview-analytics',
          label: 'Analytics',
          icon: LineChart,
          description: 'File analytics and usage patterns'
        },
        {
          id: 'overview-querying',
          label: 'Querying',
          icon: Search,
          description: 'Query performance metrics and history'
        }
      ]
    },
    {
      id: 'seismic',
      label: 'Seismic Data',
      icon: Layers,
      description: 'Seismic data management and visualization',
      children: [
        {
          id: 'seismic-data',
          label: 'Data View',
          icon: Database,
          description: 'File listings, details, and metadata'
        },
        {
          id: 'seismic-map',
          label: 'Map View',
          icon: Map,
          description: 'Geographic visualization with interactive map'
        }
      ]
    },
    {
      id: 'wells',
      label: 'Well Data',
      icon: Drill,
      description: 'Well data management and visualization',
      children: [
        {
          id: 'wells-data',
          label: 'Data View',
          icon: Database,
          description: 'Well file listings and metadata'
        },
        {
          id: 'wells-map',
          label: 'Map View',
          icon: Map,
          description: 'Geographic visualization with well locations'
        }
      ]
    },
    {
      id: 'projects',
      label: 'Project Data',
      icon: FolderOpen,
      description: 'Project listings by application with storage information'
    },
    {
      id: 'management',
      label: 'Data Management',
      icon: Database,
      description: 'Data search, filtering, tagging, and bulk operations'
    },
    {
      id: 'insights',
      label: 'Data Insights',
      icon: LineChart,
      description: 'Advanced analytics, trends, and predictive insights'
    },
    {
      id: 'impact',
      label: 'Impact Analysis',
      icon: Activity,
      description: 'Change impact assessment and dependency analysis'
    },
    {
      id: 'reservoir-simulation',
      label: 'Reservoir Simulation',
      icon: Droplets,
      description: 'Simulation data management and model tracking'
    },
    {
      id: 'storage',
      label: 'Storage Management',
      icon: HardDrive,
      description: 'Storage allocation, capacity planning, and optimization'
    },
    {
      id: 'configuration',
      label: 'Configuration',
      icon: Settings,
      description: 'System settings and preferences',
      children: [
        {
          id: 'config-general',
          label: 'General Settings',
          icon: Settings,
          description: 'Company info, timezone, language, date format'
        },
        {
          id: 'config-database',
          label: 'Database Settings',
          icon: Database,
          description: 'Connection, backup, and performance configuration'
        },
        {
          id: 'config-security',
          label: 'Security Settings',
          icon: Shield,
          description: 'API keys, authentication, and password policies'
        },
        {
          id: 'config-notifications',
          label: 'Notification Settings',
          icon: Bell,
          description: 'Email, SMS, and Slack alert configuration'
        },
        {
          id: 'config-users',
          label: 'User Management',
          icon: Users,
          description: 'User limits, roles, SSO, and LDAP integration'
        },
        {
          id: 'config-licenses',
          label: 'License Management',
          icon: Key,
          description: 'Module licenses and expiration tracking'
        },
        {
          id: 'config-tags',
          label: 'Tag Management',
          icon: Tag,
          description: 'Create, edit, merge tags with tree visualization',
          badge: 'NEW'
        }
      ]
    },
    {
      id: 'archive',
      label: 'Archive',
      icon: Archive,
      description: 'Archived data management and retrieval system'
    },
    {
      id: 'cleanup',
      label: 'Data Cleanup',
      icon: Trash2,
      description: 'Automated cleanup tools and batch processing'
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const filterItems = (items: NavigationItem[]): NavigationItem[] => {
    if (!searchQuery) return items;

    const query = searchQuery.toLowerCase();
    return items
      .map(item => {
        const matchesItem =
          item.label.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query);

        const filteredChildren = item.children
          ? filterItems(item.children)
          : undefined;

        if (matchesItem || (filteredChildren && filteredChildren.length > 0)) {
          return {
            ...item,
            children: filteredChildren
          };
        }
        return null;
      })
      .filter((item): item is NavigationItem => item !== null);
  };

  const filteredStructure = filterItems(navigationStructure);

  const renderNavigationItem = (item: NavigationItem, level: number = 0) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSections.has(item.id);

    return (
      <div key={item.id} className="space-y-2">
        <div
          className={`flex items-start space-x-4 p-4 rounded-lg border transition-all ${
            level === 0
              ? 'bg-cegal-gray-800 border-cegal-gray-700 hover:border-cegal-gray-600'
              : 'bg-cegal-gray-800/50 border-cegal-gray-700/50 hover:border-cegal-gray-600/50'
          }`}
          style={{ marginLeft: `${level * 24}px` }}
        >
          <div className="flex-shrink-0">
            <div className={`p-2 rounded-lg ${
              level === 0
                ? 'bg-cegal-primary/20'
                : 'bg-cegal-gray-700'
            }`}>
              <Icon className={`h-5 w-5 ${
                level === 0
                  ? 'text-cegal-primary'
                  : 'text-cegal-gray-400'
              }`} />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className={`font-semibold ${
                level === 0
                  ? 'text-white text-base'
                  : 'text-cegal-gray-300 text-sm'
              }`}>
                {item.label}
              </h4>
              {item.badge && (
                <span className="px-2 py-0.5 bg-cegal-green/20 border border-cegal-green/30 rounded text-xs text-cegal-green font-medium">
                  {item.badge}
                </span>
              )}
              {hasChildren && (
                <span className="text-xs text-cegal-gray-500">
                  ({item.children!.length} {item.children!.length === 1 ? 'section' : 'sections'})
                </span>
              )}
            </div>
            <p className="text-sm text-cegal-gray-400 leading-relaxed">
              {item.description}
            </p>
          </div>

          {hasChildren && (
            <button
              onClick={() => toggleSection(item.id)}
              className="flex-shrink-0 p-2 hover:bg-cegal-gray-700 rounded text-cegal-gray-400 hover:text-white transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </button>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="space-y-2">
            {item.children!.map(child => renderNavigationItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const totalSections = navigationStructure.length;
  const totalSubsections = navigationStructure.reduce(
    (sum, item) => sum + (item.children?.length || 0),
    0
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-cegal-green">Site Map</h2>
        <p className="text-white mt-1">
          Complete navigation structure and feature overview
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card-cegal bg-cegal-darker border-cegal-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-cegal-primary/20 rounded-lg">
              <Package className="h-6 w-6 text-cegal-primary" />
            </div>
            <div>
              <p className="text-sm text-cegal-gray-400">Main Sections</p>
              <p className="text-2xl font-bold text-white">{totalSections}</p>
            </div>
          </div>
        </div>

        <div className="card-cegal bg-cegal-darker border-cegal-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-cegal-green/20 rounded-lg">
              <Layers className="h-6 w-6 text-cegal-green" />
            </div>
            <div>
              <p className="text-sm text-cegal-gray-400">Subsections</p>
              <p className="text-2xl font-bold text-white">{totalSubsections}</p>
            </div>
          </div>
        </div>

        <div className="card-cegal bg-cegal-darker border-cegal-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Map className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-cegal-gray-400">Total Features</p>
              <p className="text-2xl font-bold text-white">{totalSections + totalSubsections}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card-cegal bg-cegal-darker border-cegal-gray-700 p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cegal-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sections and features..."
              className="w-full pl-10 pr-4 py-3 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent bg-cegal-dark text-white"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredStructure.map(item => renderNavigationItem(item))}
        </div>

        {filteredStructure.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-cegal-gray-500 mx-auto mb-3" />
            <p className="text-cegal-gray-400">No sections found matching your search</p>
          </div>
        )}
      </div>

      <div className="card-cegal bg-cegal-darker border-cegal-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Key Capabilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-cegal-primary/20 rounded">
              <Package className="h-4 w-4 text-cegal-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white mb-1">Multi-Application Support</h4>
              <p className="text-xs text-cegal-gray-400">
                7 subsurface applications including Petrel, Techlog, Eclipse, and more
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-2 bg-cegal-green/20 rounded">
              <Map className="h-4 w-4 text-cegal-green" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white mb-1">Geographic Visualization</h4>
              <p className="text-xs text-cegal-gray-400">
                Interactive maps for seismic and well data with location tracking
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-2 bg-blue-500/20 rounded">
              <Settings className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white mb-1">Comprehensive Configuration</h4>
              <p className="text-xs text-cegal-gray-400">
                7 configuration tabs covering security, users, licenses, and tag management
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-2 bg-amber-500/20 rounded">
              <Tag className="h-4 w-4 text-amber-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white mb-1">Advanced Tag Management</h4>
              <p className="text-xs text-cegal-gray-400">
                Tree-based tag merging with visual hierarchy and primary tag selection
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-2 bg-emerald-500/20 rounded">
              <LineChart className="h-4 w-4 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white mb-1">Analytics & Insights</h4>
              <p className="text-xs text-cegal-gray-400">
                File analytics, usage patterns, and query performance monitoring
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-2 bg-red-500/20 rounded">
              <HardDrive className="h-4 w-4 text-red-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white mb-1">Storage Management</h4>
              <p className="text-xs text-cegal-gray-400">
                Capacity planning, allocation tracking, and optimization tools
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteMap;
