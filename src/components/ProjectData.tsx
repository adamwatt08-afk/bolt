import React, { useState } from 'react';
import {
  Folder,
  CheckCircle,
  AlertCircle,
  Archive,
  TrendingUp,
  Calendar,
  User,
  Database,
  MapPin,
  HardDrive,
  FileText,
  Clock,
  Package,
  Globe
} from 'lucide-react';

interface ProjectData {
  id: string;
  name: string;
  category: string;
  version: string;
  size: string;
  date: string;
  owner: string;
  status: 'Active' | 'Warning' | 'Archived';
  description: string;
  location: string;
  fileCount: number;
  lastModified: string;
  tags: string[];
  crs: string;
  appType: string;
}

interface AppAnalysis {
  appName: string;
  projectCount: number;
  totalSize: number;
  avgSize: number;
  versions: string[];
  lastModified: string;
  crsUsed: string[];
}

const ProjectData: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All Projects');

  const mockProjectData: ProjectData[] = [
    {
      id: '1',
      name: 'North Sea Exploration',
      category: 'Petrel Project',
      version: 'v2023.2',
      size: '45.2 GB',
      date: 'Jan 10, 2025',
      owner: 'Sarah Chen',
      status: 'Active',
      description: 'Seismic interpretation and prospect evaluation for North Sea exploration blocks',
      location: '/projects/exploration/north_sea_2025',
      fileCount: 1243,
      lastModified: '2 hours ago',
      tags: ['Seismic', 'Exploration', 'North Sea'],
      crs: 'EPSG:23031 (ED50 / UTM Zone 31N)',
      appType: 'Petrel'
    },
    {
      id: '2',
      name: 'Gulf of Mexico Survey',
      category: 'Petrel Project',
      version: 'v2023.1',
      size: '78.6 GB',
      date: 'Dec 28, 2024',
      owner: 'Mike Rodriguez',
      status: 'Active',
      description: 'Pre-stack depth migration and velocity model building for GOM deepwater',
      location: '/projects/exploration/gulf_mexico',
      fileCount: 2891,
      lastModified: '1 day ago',
      tags: ['Seismic', 'Deepwater', 'GOM'],
      crs: 'EPSG:32615 (WGS 84 / UTM Zone 15N)',
      appType: 'Petrel'
    },
    {
      id: '3',
      name: 'Well Log Analysis - Block 15',
      category: 'Techlog Project',
      version: 'v2023.3',
      size: '12.4 GB',
      date: 'Jan 12, 2025',
      owner: 'Emma Wilson',
      status: 'Active',
      description: 'Petrophysical evaluation and formation analysis for development wells',
      location: '/projects/wells/block15_analysis',
      fileCount: 457,
      lastModified: '3 hours ago',
      tags: ['Petrophysics', 'Well Logs', 'Formation Evaluation'],
      crs: 'EPSG:32631 (WGS 84 / UTM Zone 31N)',
      appType: 'Techlog'
    },
    {
      id: '4',
      name: 'Reservoir Characterization',
      category: 'RMS Project',
      version: 'v13.1',
      size: '34.8 GB',
      date: 'Jan 8, 2025',
      owner: 'John Peterson',
      status: 'Warning',
      description: 'Static reservoir model with structural and stratigraphic framework',
      location: '/projects/reservoir/characterization_2025',
      fileCount: 892,
      lastModified: '5 days ago',
      tags: ['Reservoir', 'Modeling', 'Static Model'],
      crs: 'EPSG:23031 (ED50 / UTM Zone 31N)',
      appType: 'RMS'
    },
    {
      id: '5',
      name: 'West Africa Legacy Data',
      category: 'Archive',
      version: 'v2021.4',
      size: '156.3 GB',
      date: 'Mar 15, 2023',
      owner: 'Legacy Team',
      status: 'Archived',
      description: 'Historical exploration data and legacy seismic volumes from West Africa campaigns',
      location: '/archive/west_africa/legacy_2021',
      fileCount: 5432,
      lastModified: '2 years ago',
      tags: ['Legacy', 'Archive', 'West Africa'],
      crs: 'EPSG:32632 (WGS 84 / UTM Zone 32N)',
      appType: 'Archive'
    },
    {
      id: '6',
      name: 'Production Simulation',
      category: 'Eclipse Project',
      version: 'v2023.2',
      size: '89.1 GB',
      date: 'Dec 20, 2024',
      owner: 'Ana Silva',
      status: 'Active',
      description: 'Dynamic reservoir simulation for field development optimization',
      location: '/projects/simulation/production_2024',
      fileCount: 1876,
      lastModified: '6 hours ago',
      tags: ['Simulation', 'Production', 'Dynamic Model'],
      crs: 'EPSG:23031 (ED50 / UTM Zone 31N)',
      appType: 'Eclipse'
    }
  ];

  const tabs = ['All Projects', 'Petrel', 'Techlog', 'RMS', 'Eclipse'];

  const totalProjects = mockProjectData.length;
  const activeProjects = mockProjectData.filter(p => p.status === 'Active').length;
  const warningProjects = mockProjectData.filter(p => p.status === 'Warning').length;
  const archivedProjects = mockProjectData.filter(p => p.status === 'Archived').length;
  const totalSize = mockProjectData.reduce((sum, p) => {
    const size = parseFloat(p.size.replace(' GB', ''));
    return sum + size;
  }, 0);

  const getAppAnalysis = (): AppAnalysis[] => {
    const apps = ['Petrel', 'Techlog', 'RMS', 'Eclipse'];
    return apps.map(app => {
      const appProjects = mockProjectData.filter(p => p.appType === app);
      const totalSize = appProjects.reduce((sum, p) => {
        const size = parseFloat(p.size.replace(' GB', ''));
        return sum + size;
      }, 0);
      const versions = [...new Set(appProjects.map(p => p.version))];
      const crsUsed = [...new Set(appProjects.map(p => p.crs))];
      const mostRecent = appProjects.length > 0
        ? appProjects.reduce((latest, p) => {
            const pTime = new Date(p.date).getTime();
            const latestTime = new Date(latest.date).getTime();
            return pTime > latestTime ? p : latest;
          }).lastModified
        : 'N/A';

      return {
        appName: app,
        projectCount: appProjects.length,
        totalSize,
        avgSize: appProjects.length > 0 ? totalSize / appProjects.length : 0,
        versions,
        lastModified: mostRecent,
        crsUsed
      };
    }).filter(app => app.projectCount > 0);
  };

  const appAnalysis = getAppAnalysis();

  const filteredProjects = activeTab === 'All Projects'
    ? mockProjectData
    : mockProjectData.filter(p => p.appType === activeTab);

  const filteredAppAnalysis = activeTab === 'All Projects'
    ? appAnalysis
    : appAnalysis.filter(app => app.appName === activeTab);

  const filteredStats = {
    total: filteredProjects.length,
    active: filteredProjects.filter(p => p.status === 'Active').length,
    warning: filteredProjects.filter(p => p.status === 'Warning').length,
    archived: filteredProjects.filter(p => p.status === 'Archived').length,
    size: filteredProjects.reduce((sum, p) => {
      const size = parseFloat(p.size.replace(' GB', ''));
      return sum + size;
    }, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-blue-500/10 rounded-lg">
          <Folder className="h-6 w-6 text-cegal-primary" />
        </div>
        <h2 className="text-2xl font-bold text-white">Projects</h2>
      </div>

      {/* Tabs */}
      <div className="border-b border-cegal-gray-700">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                activeTab === tab
                  ? 'text-cegal-primary'
                  : 'text-cegal-gray-400 hover:text-cegal-gray-300'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cegal-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* High-Level Summary - Only on All Projects tab */}
      {activeTab === 'All Projects' && (
        <div className="bg-gradient-to-br from-cegal-darker to-cegal-gray-800 border border-cegal-gray-700 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Database className="h-6 w-6 text-cegal-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Portfolio Summary</h3>
              <p className="text-sm text-cegal-gray-400">Enterprise-wide project portfolio overview</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-cegal-gray-300 uppercase tracking-wide">Project Distribution</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-cegal-gray-400">Petrel Projects</span>
                  <span className="text-lg font-bold text-white">{mockProjectData.filter(p => p.appType === 'Petrel').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-cegal-gray-400">Techlog Projects</span>
                  <span className="text-lg font-bold text-white">{mockProjectData.filter(p => p.appType === 'Techlog').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-cegal-gray-400">RMS Projects</span>
                  <span className="text-lg font-bold text-white">{mockProjectData.filter(p => p.appType === 'RMS').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-cegal-gray-400">Eclipse Projects</span>
                  <span className="text-lg font-bold text-white">{mockProjectData.filter(p => p.appType === 'Eclipse').length}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-cegal-gray-300 uppercase tracking-wide">Storage Analytics</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-cegal-gray-400">Total Storage</span>
                  <span className="text-lg font-bold text-cegal-primary">{totalSize.toFixed(1)} GB</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-cegal-gray-400">Total Files</span>
                  <span className="text-lg font-bold text-white">{mockProjectData.reduce((sum, p) => sum + p.fileCount, 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-cegal-gray-400">Avg Project Size</span>
                  <span className="text-lg font-bold text-white">{(totalSize / mockProjectData.length).toFixed(1)} GB</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-cegal-gray-400">Largest Project</span>
                  <span className="text-lg font-bold text-white">{Math.max(...mockProjectData.map(p => parseFloat(p.size.replace(' GB', '')))).toFixed(1)} GB</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-cegal-gray-300 uppercase tracking-wide">Coordinate Systems</h4>
              <div className="space-y-2">
                {[...new Set(mockProjectData.map(p => p.crs))].map((crs, idx) => (
                  <div key={idx} className="bg-cegal-darker rounded px-3 py-2 border border-cegal-gray-700">
                    <div className="text-xs text-cegal-gray-400 mb-1">Used in {mockProjectData.filter(p => p.crs === crs).length} {mockProjectData.filter(p => p.crs === crs).length === 1 ? 'project' : 'projects'}</div>
                    <div className="text-xs font-mono text-cegal-primary">{crs}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overview Section */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-1">{activeTab === 'All Projects' ? 'Projects Overview' : `${activeTab} Overview`}</h3>
        <p className="text-sm text-cegal-gray-400 mb-6">Subsurface application projects and their metadata</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-cegal-darker border border-cegal-gray-700 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-2">
              <Folder className="h-5 w-5 text-cegal-primary" />
              <span className="text-sm text-cegal-gray-400">Total Projects</span>
            </div>
            <div className="text-3xl font-bold text-white">{filteredStats.total}</div>
          </div>

          <div className="bg-cegal-darker border border-cegal-gray-700 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-emerald-500" />
              <span className="text-sm text-cegal-gray-400">Active</span>
            </div>
            <div className="text-3xl font-bold text-white">{filteredStats.active}</div>
          </div>

          <div className="bg-cegal-darker border border-cegal-gray-700 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <span className="text-sm text-cegal-gray-400">Needs Attention</span>
            </div>
            <div className="text-3xl font-bold text-white">{filteredStats.warning}</div>
          </div>

          <div className="bg-cegal-darker border border-cegal-gray-700 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-2">
              <Archive className="h-5 w-5 text-slate-500" />
              <span className="text-sm text-cegal-gray-400">Archived</span>
            </div>
            <div className="text-3xl font-bold text-white">{filteredStats.archived}</div>
          </div>

          <div className="bg-cegal-darker border border-cegal-gray-700 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-cegal-primary" />
              <span className="text-sm text-cegal-gray-400">Total Size</span>
            </div>
            <div className="text-3xl font-bold text-white">{filteredStats.size.toFixed(1)} GB</div>
          </div>
        </div>

        {/* Application Analysis */}
        <div className="space-y-4 mb-6">
          {filteredAppAnalysis.map((app) => (
            <div key={app.appName} className="bg-cegal-darker border border-cegal-gray-700 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Package className="h-5 w-5 text-cegal-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">{app.appName} Projects</h4>
                  <p className="text-sm text-cegal-gray-400">Application analysis and metadata</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-cegal-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Folder className="h-4 w-4 text-cegal-gray-500" />
                    <span className="text-xs text-cegal-gray-400">Project Count</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{app.projectCount}</div>
                </div>

                <div className="bg-cegal-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <HardDrive className="h-4 w-4 text-cegal-gray-500" />
                    <span className="text-xs text-cegal-gray-400">Total Size</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{app.totalSize.toFixed(1)} GB</div>
                </div>

                <div className="bg-cegal-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-cegal-gray-500" />
                    <span className="text-xs text-cegal-gray-400">Avg Size</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{app.avgSize.toFixed(1)} GB</div>
                </div>

                <div className="bg-cegal-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-cegal-gray-500" />
                    <span className="text-xs text-cegal-gray-400">Last Modified</span>
                  </div>
                  <div className="text-lg font-bold text-white">{app.lastModified}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-cegal-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Database className="h-4 w-4 text-cegal-primary" />
                    <span className="text-sm font-medium text-white">Application Versions</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {app.versions.map((version, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-cegal-darker text-cegal-primary text-sm font-medium rounded-full border border-cegal-primary/30"
                      >
                        {version}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-cegal-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="h-4 w-4 text-cegal-primary" />
                    <span className="text-sm font-medium text-white">Coordinate Reference Systems</span>
                  </div>
                  <div className="space-y-2">
                    {app.crsUsed.map((crs, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-2 bg-cegal-darker text-cegal-gray-300 text-xs font-mono rounded border border-cegal-gray-700"
                      >
                        {crs}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-cegal-darker border border-cegal-gray-700 rounded-lg p-5 hover:border-cegal-gray-600 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Folder className="h-5 w-5 text-cegal-primary" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white">{project.name}</h4>
                    <p className="text-sm text-cegal-gray-400">{project.category}</p>
                  </div>
                </div>
                <div
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                    project.status === 'Active'
                      ? 'bg-emerald-500/10 text-emerald-500'
                      : project.status === 'Warning'
                      ? 'bg-amber-500/10 text-amber-500'
                      : 'bg-slate-500/10 text-slate-400'
                  }`}
                >
                  {project.status === 'Active' && <CheckCircle className="h-3 w-3" />}
                  {project.status === 'Warning' && <AlertCircle className="h-3 w-3" />}
                  {project.status === 'Archived' && <Archive className="h-3 w-3" />}
                  {project.status}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-cegal-gray-400 leading-relaxed">{project.description}</p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-xs">
                    <Database className="h-3.5 w-3.5 text-cegal-gray-500" />
                    <span className="text-cegal-gray-400">{project.version}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <HardDrive className="h-3.5 w-3.5 text-cegal-gray-500" />
                    <span className="text-cegal-gray-400">{project.size}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Calendar className="h-3.5 w-3.5 text-cegal-gray-500" />
                    <span className="text-cegal-gray-400">{project.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <User className="h-3.5 w-3.5 text-cegal-gray-500" />
                    <span className="text-cegal-primary">{project.owner}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <FileText className="h-3.5 w-3.5 text-cegal-gray-500" />
                    <span className="text-cegal-gray-400">{project.fileCount.toLocaleString()} files</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Clock className="h-3.5 w-3.5 text-cegal-gray-500" />
                    <span className="text-cegal-gray-400">{project.lastModified}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-cegal-gray-700">
                  <div className="flex items-center gap-2 text-xs">
                    <MapPin className="h-3.5 w-3.5 text-cegal-gray-500" />
                    <span className="text-cegal-gray-500 font-mono">{project.location}</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <Globe className="h-3.5 w-3.5 text-cegal-gray-500 mt-0.5 flex-shrink-0" />
                    <span className="text-cegal-gray-400 leading-relaxed">{project.crs}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-cegal-gray-800 text-cegal-gray-300 text-xs rounded-full border border-cegal-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectData;