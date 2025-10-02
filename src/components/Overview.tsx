import React, { useState } from 'react';
import {
  Database,
  HardDrive,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Layers,
  Drill,
  FolderOpen,
  Plus,
  Minus,
  Copy,
  ChevronDown,
  ChevronUp,
  Search,
  BarChart3
} from 'lucide-react';
import MetricCard from './MetricCard';
import ChartCard from './ChartCard';
import DataQualityAnalysis from './DataQualityAnalysis';
import DataSearchFilter from './DataSearchFilter';
import MetadataTagging from './MetadataTagging';
import BulkActions from './BulkActions';
import FileListView from './FileListView';
import QueryAnalytics from './QueryAnalytics';
import FileAnalytics from './FileAnalytics';
import { analyzeFiles, FileMetadata } from '../utils/fileAnalytics';

interface Project {
  name: string;
  size: string;
  lastModified: string;
  owner: string;
}

interface DuplicateGroup {
  id: string;
  projects: string[];
  size: string;
  similarity: number;
}

const Overview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'applications' | 'seismic' | 'wells' | 'dataManagement' | 'queryAnalytics' | 'analytics'>('applications');
  const [expandedApp, setExpandedApp] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [filters, setFilters] = useState<any>({});
  const [viewMode, setViewMode] = useState<'corrupt' | 'old' | 'stale' | 'all'>('all');

  const mockFileMetadata: FileMetadata[] = [
    {
      name: 'North_Sea_Legacy_2019.segy',
      path: '/seismic/archived/',
      extension: 'segy',
      size: 1200000000000,
      lastAccess: new Date('2023-08-15'),
      lastModified: new Date('2023-08-10'),
      createDate: new Date('2019-03-15'),
      fileOwners: ['Geophysics Team']
    },
    {
      name: 'Training_Data_2020.las',
      path: '/wells/training/',
      extension: 'las',
      size: 450000000000,
      lastAccess: new Date('2023-11-20'),
      lastModified: new Date('2023-11-15'),
      createDate: new Date('2020-05-22'),
      fileOwners: ['Training Team']
    },
    {
      name: 'Backup_Petrel_Project.pet',
      path: '/projects/backups/',
      extension: 'pet',
      size: 890000000000,
      lastAccess: new Date('2024-03-10'),
      lastModified: new Date('2024-03-08'),
      createDate: new Date('2023-01-20'),
      fileOwners: ['Interpretation Team']
    },
    {
      name: 'Corrupted_Survey_2023.sgy',
      path: '/seismic/processing/',
      extension: 'sgy',
      size: 2300000000000,
      lastAccess: new Date('2024-01-05'),
      lastModified: new Date('2024-01-03'),
      createDate: new Date('2023-08-10'),
      fileOwners: ['Processing Team']
    },
    {
      name: 'Old_Simulation_2018.data',
      path: '/reservoir/legacy/',
      extension: 'data',
      size: 680000000000,
      lastAccess: new Date('2023-09-22'),
      lastModified: new Date('2023-09-20'),
      createDate: new Date('2018-12-05'),
      fileOwners: ['Reservoir Team']
    },
    {
      name: 'North_Sea_Block_15-25_3D.segy',
      path: '/seismic/active/',
      extension: 'segy',
      size: 8500000000000,
      lastAccess: new Date('2024-12-20'),
      lastModified: new Date('2024-12-18'),
      createDate: new Date('2024-06-10'),
      fileOwners: ['Geophysics Team', 'Processing Team']
    },
    {
      name: 'Johan_Sverdrup_4D_Baseline.sgy',
      path: '/seismic/active/',
      extension: 'sgy',
      size: 6800000000000,
      lastAccess: new Date('2024-12-18'),
      lastModified: new Date('2024-12-15'),
      createDate: new Date('2024-04-22'),
      fileOwners: ['Reservoir Team']
    },
    {
      name: 'NS_15-25-A_Complete_Suite.las',
      path: '/wells/active/',
      extension: 'las',
      size: 1200000000,
      lastAccess: new Date('2024-12-20'),
      lastModified: new Date('2024-12-19'),
      createDate: new Date('2024-11-05'),
      fileOwners: ['Petrophysics Team']
    },
    {
      name: 'Johan_Sverdrup_P1_Logs.dlis',
      path: '/wells/active/',
      extension: 'dlis',
      size: 980000000,
      lastAccess: new Date('2024-12-18'),
      lastModified: new Date('2024-12-17'),
      createDate: new Date('2024-10-12'),
      fileOwners: ['Well Logging Team']
    },
    {
      name: 'Johan_Sverdrup_Field_Model.ecl',
      path: '/reservoir/active/',
      extension: 'ecl',
      size: 1400000000000,
      lastAccess: new Date('2024-12-20'),
      lastModified: new Date('2024-12-19'),
      createDate: new Date('2024-08-15'),
      fileOwners: ['Reservoir Team']
    }
  ];

  const fileAnalytics = analyzeFiles(mockFileMetadata);

  const mockFiles = [
    {
      id: '1',
      name: 'North_Sea_Legacy_2019.segy',
      path: '/seismic/archived/',
      size: '1.2 TB',
      lastAccess: '2023-08-15',
      owner: 'Geophysics Team',
      tags: ['archived', 'old'],
      isCorrupt: false,
      ageCategory: 'old'
    },
    {
      id: '2',
      name: 'Training_Data_2020.las',
      path: '/wells/training/',
      size: '450 GB',
      lastAccess: '2023-11-20',
      owner: 'Training Team',
      tags: ['training', 'deprecated'],
      isCorrupt: false,
      ageCategory: 'old'
    },
    {
      id: '3',
      name: 'Backup_Petrel_Project.pet',
      path: '/projects/backups/',
      size: '890 GB',
      lastAccess: '2024-03-10',
      owner: 'Interpretation Team',
      tags: ['backup'],
      isCorrupt: false,
      ageCategory: 'stale'
    },
    {
      id: '4',
      name: 'Corrupted_Survey_2023.sgy',
      path: '/seismic/processing/',
      size: '2.3 TB',
      lastAccess: '2024-01-05',
      owner: 'Processing Team',
      tags: ['corrupt', 'review-needed'],
      isCorrupt: true,
      ageCategory: 'recent'
    },
    {
      id: '5',
      name: 'Old_Simulation_2018.data',
      path: '/reservoir/legacy/',
      size: '680 GB',
      lastAccess: '2023-09-22',
      owner: 'Reservoir Team',
      tags: ['archived', 'deprecated'],
      isCorrupt: false,
      ageCategory: 'old'
    }
  ];

  const filteredFiles = mockFiles.filter(file => {
    if (viewMode === 'corrupt' && !file.isCorrupt) return false;
    if (viewMode === 'old' && file.ageCategory !== 'old') return false;
    if (viewMode === 'stale' && file.ageCategory !== 'stale') return false;

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const matchesSearch =
        file.name.toLowerCase().includes(searchLower) ||
        file.path.toLowerCase().includes(searchLower) ||
        file.owner.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some((tag: string) => file.tags.includes(tag));
      if (!hasMatchingTag) return false;
    }

    if (filters.dataQuality && filters.dataQuality.length > 0) {
      let matchesQuality = false;
      for (const quality of filters.dataQuality) {
        if (quality === 'Corrupt' && file.isCorrupt) matchesQuality = true;
        if (quality === 'Old (>1 year)' && file.ageCategory === 'old') matchesQuality = true;
        if (quality === 'Stale (>6 months)' && file.ageCategory === 'stale') matchesQuality = true;
        if (quality === 'Healthy' && !file.isCorrupt && file.ageCategory !== 'old' && file.ageCategory !== 'stale') matchesQuality = true;
      }
      if (!matchesQuality) return false;
    }

    if (filters.dateFrom) {
      if (new Date(file.lastAccess) < new Date(filters.dateFrom)) return false;
    }

    if (filters.dateTo) {
      if (new Date(file.lastAccess) > new Date(filters.dateTo)) return false;
    }

    return true;
  });

  const availableTags = ['archived', 'production', 'testing', 'backup', 'deprecated', 'critical', 'review-needed', 'ready-to-delete', 'training', 'corrupt'];

  const handleFileSelect = (fileId: string) => {
    setSelectedFiles(prev =>
      prev.includes(fileId)
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === filteredFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(filteredFiles.map(f => f.id));
    }
  };

  const handleBulkAction = (action: string, data?: any) => {
    console.log(`Bulk action: ${action}`, data, selectedFiles);
    setSelectedFiles([]);
  };

  const handleTagsApplied = (tags: string[]) => {
    console.log('Tags applied:', tags, selectedFiles);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleViewQualityCategory = (category: 'corrupt' | 'old' | 'stale') => {
    setActiveTab('dataManagement');
    setViewMode(category);
  };

  const metrics = [
    {
      title: 'Total Data Assets',
      value: '2,847',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Database,
      description: 'Active seismic, well & project data'
    },
    {
      title: 'Storage Used',
      value: '47.3 TB',
      change: '-8%',
      changeType: 'negative' as const,
      icon: HardDrive,
      description: 'After recent optimization'
    },
    {
      title: 'Cost Savings',
      value: '$127K',
      change: '+23%',
      changeType: 'positive' as const,
      icon: TrendingDown,
      description: 'Monthly operational savings'
    },
    {
      title: 'Data Quality Score',
      value: '87%',
      change: '+5%',
      changeType: 'positive' as const,
      icon: Activity,
      description: 'Overall data health index'
    }
  ];

  const recentActivities = [
    {
      type: 'cleanup',
      message: 'Archived 127 obsolete seismic surveys',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      type: 'alert',
      message: 'Duplicate well logs detected in Project Alpha',
      time: '4 hours ago',
      icon: AlertTriangle,
      color: 'text-yellow-600'
    },
    {
      type: 'analysis',
      message: 'Data quality assessment completed for North Sea assets',
      time: '6 hours ago',
      icon: Activity,
      color: 'text-blue-600'
    },
    {
      type: 'pending',
      message: 'Scheduled cleanup for legacy interpretation data',
      time: '1 day ago',
      icon: Clock,
      color: 'text-gray-500'
    }
  ];

  const applicationsData = {
    petrel: {
      chartData: [
        { name: 'Jan', value: 8.5 },
        { name: 'Feb', value: 9.2 },
        { name: 'Mar', value: 9.8 },
        { name: 'Apr', value: 10.3 },
        { name: 'May', value: 11.1 },
        { name: 'Jun', value: 11.8 },
        { name: 'Jul', value: 12.3 },
        { name: 'Aug', value: 12.8 },
        { name: 'Sep', value: 13.2 },
        { name: 'Oct', value: 13.6 },
        { name: 'Nov', value: 14.1 },
        { name: 'Dec', value: 14.5 }
      ],
      added: [
        { name: 'North Sea Interpretation 2024', size: '2.3 TB', lastModified: '2024-12-15', owner: 'Geophysics Team' },
        { name: 'Gulf of Mexico 4D Analysis', size: '1.8 TB', lastModified: '2024-12-10', owner: 'Reservoir Team' },
        { name: 'Barents Sea Prospects', size: '890 GB', lastModified: '2024-11-28', owner: 'Exploration Team' }
      ],
      removed: [
        { name: 'Legacy North Sea 2019', size: '1.2 TB', lastModified: '2024-12-01', owner: 'Archived' },
        { name: 'Obsolete Training Projects', size: '450 GB', lastModified: '2024-11-15', owner: 'Archived' }
      ],
      projects: [
        { name: 'North Sea Block 15/25', size: '3.2 TB', lastModified: '2024-12-20', owner: 'Geophysics Team' },
        { name: 'Johan Sverdrup Field', size: '2.8 TB', lastModified: '2024-12-18', owner: 'Reservoir Team' },
        { name: 'Gulf of Mexico Deepwater', size: '2.1 TB', lastModified: '2024-12-15', owner: 'Exploration Team' },
        { name: 'Barents Sea Regional', size: '1.9 TB', lastModified: '2024-12-12', owner: 'Geophysics Team' },
        { name: 'West Africa Margin', size: '1.7 TB', lastModified: '2024-12-10', owner: 'Exploration Team' },
        { name: 'Campos Basin Pre-Salt', size: '1.5 TB', lastModified: '2024-12-08', owner: 'Reservoir Team' }
      ],
      duplicates: [
        {
          id: '1',
          projects: ['North Sea Block 15/25 (2024)', 'North Sea Block 15/25 (Backup)'],
          size: '3.2 TB',
          similarity: 98.5
        },
        {
          id: '2',
          projects: ['Gulf of Mexico v1', 'Gulf of Mexico v2 (Copy)'],
          size: '2.1 TB',
          similarity: 95.2
        }
      ]
    },
    techlog: {
      chartData: [
        { name: 'Jan', value: 5.2 },
        { name: 'Feb', value: 5.4 },
        { name: 'Mar', value: 5.6 },
        { name: 'Apr', value: 5.9 },
        { name: 'May', value: 6.2 },
        { name: 'Jun', value: 6.5 },
        { name: 'Jul', value: 6.8 },
        { name: 'Aug', value: 7.0 },
        { name: 'Sep', value: 7.3 },
        { name: 'Oct', value: 7.5 },
        { name: 'Nov', value: 7.8 },
        { name: 'Dec', value: 8.0 }
      ],
      added: [
        { name: 'Well Alpha-7H Logs', size: '340 GB', lastModified: '2024-12-18', owner: 'Petrophysics Team' },
        { name: 'Beta-12 Formation Evaluation', size: '280 GB', lastModified: '2024-12-12', owner: 'Well Team' }
      ],
      removed: [
        { name: 'Old Training Logs 2020', size: '125 GB', lastModified: '2024-12-05', owner: 'Archived' }
      ],
      projects: [
        { name: 'North Sea Wells Q4 2024', size: '1.8 TB', lastModified: '2024-12-20', owner: 'Petrophysics Team' },
        { name: 'Permian Basin Analysis', size: '1.5 TB', lastModified: '2024-12-18', owner: 'Well Team' },
        { name: 'Gulf Coast Exploration', size: '1.3 TB', lastModified: '2024-12-15', owner: 'Petrophysics Team' },
        { name: 'Offshore Brazil Logs', size: '1.1 TB', lastModified: '2024-12-12', owner: 'Well Team' },
        { name: 'Bakken Formation Study', size: '980 GB', lastModified: '2024-12-10', owner: 'Petrophysics Team' }
      ],
      duplicates: [
        {
          id: '1',
          projects: ['North Sea Wells Q4 2024', 'North Sea Wells Q4 2024 (Working Copy)'],
          size: '1.8 TB',
          similarity: 97.8
        }
      ]
    },
    eclipse: {
      chartData: [
        { name: 'Jan', value: 3.8 },
        { name: 'Feb', value: 3.9 },
        { name: 'Mar', value: 4.1 },
        { name: 'Apr', value: 4.2 },
        { name: 'May', value: 4.4 },
        { name: 'Jun', value: 4.6 },
        { name: 'Jul', value: 4.8 },
        { name: 'Aug', value: 5.0 },
        { name: 'Sep', value: 5.1 },
        { name: 'Oct', value: 5.3 },
        { name: 'Nov', value: 5.4 },
        { name: 'Dec', value: 5.6 }
      ],
      added: [
        { name: 'Johan Sverdrup Phase 2', size: '890 GB', lastModified: '2024-12-16', owner: 'Reservoir Team' },
        { name: 'Thunder Horse Expansion', size: '720 GB', lastModified: '2024-12-08', owner: 'Production Team' }
      ],
      removed: [
        { name: 'Legacy Simulation 2018', size: '340 GB', lastModified: '2024-11-30', owner: 'Archived' }
      ],
      projects: [
        { name: 'Johan Sverdrup Field Model', size: '1.4 TB', lastModified: '2024-12-20', owner: 'Reservoir Team' },
        { name: 'Lula Field Brazil', size: '1.2 TB', lastModified: '2024-12-17', owner: 'Production Team' },
        { name: 'Thunder Horse GOM', size: '980 GB', lastModified: '2024-12-14', owner: 'Reservoir Team' },
        { name: 'Kashagan Kazakhstan', size: '850 GB', lastModified: '2024-12-11', owner: 'Production Team' }
      ],
      duplicates: [
        {
          id: '1',
          projects: ['Johan Sverdrup Field Model v3', 'Johan Sverdrup Field Model v3 (Backup)'],
          size: '1.4 TB',
          similarity: 99.1
        }
      ]
    },
    resinsight: {
      chartData: [
        { name: 'Jan', value: 2.1 },
        { name: 'Feb', value: 2.2 },
        { name: 'Mar', value: 2.3 },
        { name: 'Apr', value: 2.4 },
        { name: 'May', value: 2.5 },
        { name: 'Jun', value: 2.6 },
        { name: 'Jul', value: 2.7 },
        { name: 'Aug', value: 2.8 },
        { name: 'Sep', value: 2.9 },
        { name: 'Oct', value: 3.0 },
        { name: 'Nov', value: 3.1 },
        { name: 'Dec', value: 3.2 }
      ],
      added: [
        { name: 'Production Analysis 2024 Q4', size: '450 GB', lastModified: '2024-12-19', owner: 'Visualization Team' }
      ],
      removed: [
        { name: 'Test Visualizations 2023', size: '180 GB', lastModified: '2024-12-03', owner: 'Archived' }
      ],
      projects: [
        { name: 'Field Performance Dashboard', size: '890 GB', lastModified: '2024-12-20', owner: 'Visualization Team' },
        { name: 'Well Performance Analysis', size: '740 GB', lastModified: '2024-12-18', owner: 'Production Team' },
        { name: 'Reservoir Monitoring 2024', size: '620 GB', lastModified: '2024-12-15', owner: 'Visualization Team' },
        { name: 'Historical Production Review', size: '510 GB', lastModified: '2024-12-12', owner: 'Production Team' }
      ],
      duplicates: []
    }
  };

  const seismicData = {
    chartData: [
      { name: 'Jan', value: 23.8 },
      { name: 'Feb', value: 23.6 },
      { name: 'Mar', value: 23.4 },
      { name: 'Apr', value: 23.2 },
      { name: 'May', value: 23.1 },
      { name: 'Jun', value: 23.0 },
      { name: 'Jul', value: 22.9 },
      { name: 'Aug', value: 22.8 },
      { name: 'Sep', value: 22.7 },
      { name: 'Oct', value: 22.6 },
      { name: 'Nov', value: 22.5 },
      { name: 'Dec', value: 23.5 }
    ],
    added: [
      { name: 'North Sea 3D Survey 2024.segy', size: '4.2 TB', lastModified: '2024-12-18', owner: 'Acquisition Team' },
      { name: 'GulfOfMexico_4D_Monitor.sgy', size: '3.8 TB', lastModified: '2024-12-10', owner: 'Processing Team' },
      { name: 'Barents_Sea_Regional.seg', size: '2.1 TB', lastModified: '2024-11-25', owner: 'Geophysics Team' }
    ],
    removed: [
      { name: 'Legacy_2D_1998.segy', size: '890 GB', lastModified: '2024-12-01', owner: 'Archived' },
      { name: 'Test_Processing_2023.sgy', size: '1.2 TB', lastModified: '2024-11-20', owner: 'Archived' }
    ],
    files: [
      { name: 'North_Sea_Block_15-25_3D.segy', size: '8.5 TB', lastModified: '2024-12-20', owner: 'Geophysics Team' },
      { name: 'Johan_Sverdrup_4D_Baseline.sgy', size: '6.8 TB', lastModified: '2024-12-18', owner: 'Reservoir Team' },
      { name: 'GOM_Deepwater_3D_Final.segy', size: '5.4 TB', lastModified: '2024-12-15', owner: 'Processing Team' },
      { name: 'Barents_Regional_2D.seg', size: '3.2 TB', lastModified: '2024-12-12', owner: 'Acquisition Team' },
      { name: 'West_Africa_PreSTM.segy', size: '4.9 TB', lastModified: '2024-12-10', owner: 'Processing Team' },
      { name: 'Brazil_PreSalt_3D.sgy', size: '7.1 TB', lastModified: '2024-12-08', owner: 'Geophysics Team' }
    ],
    duplicates: [
      {
        id: '1',
        projects: ['North_Sea_Block_15-25_3D.segy', 'North_Sea_Block_15-25_3D_backup.segy'],
        size: '8.5 TB',
        similarity: 99.8
      },
      {
        id: '2',
        projects: ['GOM_Deepwater_3D_Final.segy', 'GOM_Deepwater_3D_Final_v2.segy'],
        size: '5.4 TB',
        similarity: 98.9
      }
    ]
  };

  const wellsData = {
    chartData: [
      { name: 'Jan', value: 13.2 },
      { name: 'Feb', value: 13.1 },
      { name: 'Mar', value: 13.0 },
      { name: 'Apr', value: 12.9 },
      { name: 'May', value: 12.8 },
      { name: 'Jun', value: 12.7 },
      { name: 'Jul', value: 12.6 },
      { name: 'Aug', value: 12.5 },
      { name: 'Sep', value: 12.5 },
      { name: 'Oct', value: 12.4 },
      { name: 'Nov', value: 12.4 },
      { name: 'Dec', value: 12.8 }
    ],
    added: [
      { name: 'Well_Alpha-7H_Composite.las', size: '450 MB', lastModified: '2024-12-19', owner: 'Petrophysics Team' },
      { name: 'Beta-12_Formation_Eval.dlis', size: '680 MB', lastModified: '2024-12-14', owner: 'Well Logging Team' },
      { name: 'Gamma-3_Raw_Data.lis', size: '320 MB', lastModified: '2024-12-08', owner: 'Acquisition Team' }
    ],
    removed: [
      { name: 'Training_Well_2019.las', size: '120 MB', lastModified: '2024-12-02', owner: 'Archived' },
      { name: 'Legacy_Logs_1995.lis', size: '280 MB', lastModified: '2024-11-18', owner: 'Archived' }
    ],
    files: [
      { name: 'NS_15-25-A_Complete_Suite.las', size: '1.2 GB', lastModified: '2024-12-20', owner: 'Petrophysics Team' },
      { name: 'Johan_Sverdrup_P1_Logs.dlis', size: '980 MB', lastModified: '2024-12-18', owner: 'Well Logging Team' },
      { name: 'GOM_Thunder_Horse_A3.las', size: '850 MB', lastModified: '2024-12-16', owner: 'Petrophysics Team' },
      { name: 'Barents_Wildcat_7220-8-1.lis', size: '720 MB', lastModified: '2024-12-14', owner: 'Acquisition Team' },
      { name: 'Brazil_Lula_Production_23.dlis', size: '1.1 GB', lastModified: '2024-12-12', owner: 'Well Logging Team' },
      { name: 'North_Sea_15-9-19SR_M.las', size: '640 MB', lastModified: '2024-12-10', owner: 'Petrophysics Team' },
      { name: 'Permian_Horizontal_Well_H7.las', size: '890 MB', lastModified: '2024-12-08', owner: 'Petrophysics Team' }
    ],
    duplicates: [
      {
        id: '1',
        projects: ['NS_15-25-A_Complete_Suite.las', 'NS_15-25-A_Complete_Suite_backup.las'],
        size: '1.2 GB',
        similarity: 99.5
      },
      {
        id: '2',
        projects: ['Permian_Horizontal_Well_H7.las', 'Permian_Horizontal_Well_H7_v2.las'],
        size: '890 MB',
        similarity: 97.3
      }
    ]
  };

  const toggleExpanded = (appName: string) => {
    setExpandedApp(expandedApp === appName ? null : appName);
  };

  const renderApplicationDetails = (appName: string, appData: any) => {
    const isExpanded = expandedApp === appName;

    const getTitleAndDescription = () => {
      switch (appName) {
        case 'petrel':
          return { title: 'Petrel Projects', description: 'Seismic interpretation and modeling' };
        case 'techlog':
          return { title: 'Techlog Projects', description: 'Petrophysical analysis and well logging' };
        case 'eclipse':
          return { title: 'Eclipse Simulations', description: 'Reservoir simulation models' };
        case 'resinsight':
          return { title: 'ResInsight Projects', description: 'Post-processing and visualization' };
        case 'seismic':
          return { title: 'Seismic Data Files', description: '.seg, .segy, .sgy file formats' };
        case 'wells':
          return { title: 'Well Log Files', description: '.las, .lis, .dlis file formats' };
        default:
          return { title: '', description: '' };
      }
    };

    const { title, description } = getTitleAndDescription();
    const dataLabel = appName === 'seismic' || appName === 'wells' ? 'All Files' : 'All Projects';

    return (
      <div className="space-y-6">
        <div className="card-cegal bg-cegal-darker border-cegal-gray-700">
          <div className="p-4 border-b border-cegal-gray-700 flex items-center justify-between">
            <div>
              <h4 className="text-md font-semibold text-white">{title}</h4>
              <p className="text-xs text-cegal-gray-400 mt-1">{description}</p>
            </div>
            <button
              onClick={() => toggleExpanded(appName)}
              className="p-2 text-cegal-gray-400 hover:text-cegal-green transition-colors"
            >
              {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>
          <div className="p-4">
            <ChartCard
              title=""
              description=""
              data={appData.chartData}
              chartType="line"
            />
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card-cegal p-6 bg-cegal-darker border-cegal-gray-700">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Plus className="h-4 w-4 text-green-600" />
                  </div>
                  <h5 className="text-sm font-semibold text-white">Recently Added</h5>
                </div>
                <div className="space-y-3">
                  {appData.added.map((project: Project, idx: number) => (
                    <div key={idx} className="bg-cegal-gray-800 p-3 rounded-lg">
                      <p className="text-sm font-medium text-white">{project.name}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-cegal-gray-400">{project.size}</span>
                        <span className="text-xs text-cegal-gray-500">{project.owner}</span>
                      </div>
                      <p className="text-xs text-cegal-gray-500 mt-1">Modified: {project.lastModified}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-cegal p-6 bg-cegal-darker border-cegal-gray-700">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Minus className="h-4 w-4 text-red-600" />
                  </div>
                  <h5 className="text-sm font-semibold text-white">Recently Removed</h5>
                </div>
                <div className="space-y-3">
                  {appData.removed.map((project: Project, idx: number) => (
                    <div key={idx} className="bg-cegal-gray-800 p-3 rounded-lg">
                      <p className="text-sm font-medium text-white">{project.name}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-cegal-gray-400">{project.size}</span>
                        <span className="text-xs text-cegal-gray-500">{project.owner}</span>
                      </div>
                      <p className="text-xs text-cegal-gray-500 mt-1">Removed: {project.lastModified}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card-cegal p-6 bg-cegal-darker border-cegal-gray-700">
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FolderOpen className="h-4 w-4 text-cegal-primary" />
                </div>
                <h5 className="text-sm font-semibold text-white">{dataLabel}</h5>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-cegal-gray-800 border-b border-cegal-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-cegal-gray-400">
                        {appName === 'seismic' || appName === 'wells' ? 'File Name' : 'Project Name'}
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-cegal-gray-400">Size</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-cegal-gray-400">Last Modified</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-cegal-gray-400">Owner</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cegal-gray-700">
                    {(appData.files || appData.projects).map((item: Project, idx: number) => (
                      <tr key={idx} className="hover:bg-cegal-gray-800 transition-colors">
                        <td className="px-4 py-3 text-sm text-white">{item.name}</td>
                        <td className="px-4 py-3 text-sm text-cegal-gray-300">{item.size}</td>
                        <td className="px-4 py-3 text-sm text-cegal-gray-300">{item.lastModified}</td>
                        <td className="px-4 py-3 text-sm text-cegal-gray-300">{item.owner}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {appData.duplicates.length > 0 && (
              <div className="card-cegal p-6 bg-cegal-darker border-cegal-gray-700">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Copy className="h-4 w-4 text-yellow-600" />
                  </div>
                  <h5 className="text-sm font-semibold text-white">Duplicate Groups Detected</h5>
                </div>
                <div className="space-y-3">
                  {appData.duplicates.map((group: DuplicateGroup) => (
                    <div key={group.id} className="bg-yellow-900/20 border border-yellow-700/50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-yellow-500">
                          {group.similarity}% Similar
                        </span>
                        <span className="text-sm text-yellow-300">{group.size} total</span>
                      </div>
                      <div className="space-y-1">
                        {group.projects.map((project, idx) => (
                          <div key={idx} className="text-sm text-yellow-200 ml-2">
                            • {project}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-cegal-green">Data Overview</h2>
        <div className="flex space-x-3">
          <button className="btn-cegal-primary">
            Generate Report
          </button>
          <button className="btn-cegal-secondary">
            Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="card-cegal bg-cegal-darker border-cegal-gray-700">
        <div className="p-6 border-b border-cegal-gray-700">
          <h3 className="text-lg font-semibold text-cegal-green">Storage Usage Over Time</h3>
          <p className="text-sm text-cegal-gray-400 mt-1">Total storage consumption (TB) across all data assets</p>
        </div>
        <div className="p-6">
          <ChartCard
            title="12-Month Storage Trend"
            description="Storage optimization showing gradual reduction in total usage"
            data={[
              { name: 'Jan', value: 52.1 },
              { name: 'Feb', value: 51.3 },
              { name: 'Mar', value: 50.2 },
              { name: 'Apr', value: 49.5 },
              { name: 'May', value: 48.9 },
              { name: 'Jun', value: 48.1 },
              { name: 'Jul', value: 47.8 },
              { name: 'Aug', value: 47.3 },
              { name: 'Sep', value: 47.0 },
              { name: 'Oct', value: 46.5 },
              { name: 'Nov', value: 46.2 },
              { name: 'Dec', value: 47.3 }
            ]}
            chartType="line"
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-cegal-green">Data Trends by Category</h3>
          <div className="flex space-x-2 border-b border-cegal-gray-700">
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'applications'
                  ? 'text-cegal-green border-b-2 border-cegal-green'
                  : 'text-cegal-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <FolderOpen className="h-4 w-4" />
                <span>Applications</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('seismic')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'seismic'
                  ? 'text-cegal-green border-b-2 border-cegal-green'
                  : 'text-cegal-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Layers className="h-4 w-4" />
                <span>Seismic</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('wells')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'wells'
                  ? 'text-cegal-green border-b-2 border-cegal-green'
                  : 'text-cegal-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Drill className="h-4 w-4" />
                <span>Wells</span>
              </div>
            </button>
            <button
              onClick={() => { setActiveTab('dataManagement'); setViewMode('all'); }}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'dataManagement'
                  ? 'text-cegal-green border-b-2 border-cegal-green'
                  : 'text-cegal-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4" />
                <span>Data Management</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('queryAnalytics')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'queryAnalytics'
                  ? 'text-cegal-green border-b-2 border-cegal-green'
                  : 'text-cegal-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Query & Analytics</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'analytics'
                  ? 'text-cegal-green border-b-2 border-cegal-green'
                  : 'text-cegal-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4" />
                <span>File Analytics</span>
              </div>
            </button>
          </div>
        </div>

        {activeTab === 'applications' && (
          <div className="space-y-6">
            {renderApplicationDetails('petrel', applicationsData.petrel)}
            {renderApplicationDetails('techlog', applicationsData.techlog)}
            {renderApplicationDetails('eclipse', applicationsData.eclipse)}
            {renderApplicationDetails('resinsight', applicationsData.resinsight)}
          </div>
        )}

        {activeTab === 'seismic' && (
          <div className="space-y-6">
            {renderApplicationDetails('seismic', seismicData)}
          </div>
        )}

        {activeTab === 'wells' && (
          <div className="space-y-6">
            {renderApplicationDetails('wells', wellsData)}
          </div>
        )}

        {activeTab === 'dataManagement' && (
          <div className="space-y-6">
            <DataQualityAnalysis
              corruptFiles={mockFiles.filter(f => f.isCorrupt).length}
              oldFiles={mockFiles.filter(f => f.ageCategory === 'old').length}
              staleFiles={mockFiles.filter(f => f.ageCategory === 'stale').length}
              totalSize="5.2 TB"
              onViewCorrupt={() => handleViewQualityCategory('corrupt')}
              onViewOld={() => handleViewQualityCategory('old')}
              onViewStale={() => handleViewQualityCategory('stale')}
            />

            <DataSearchFilter
              onFilterChange={handleFilterChange}
              availableTags={availableTags}
            />

            {selectedFiles.length > 0 && (
              <BulkActions
                selectedFiles={selectedFiles}
                onAction={handleBulkAction}
                onClearSelection={() => setSelectedFiles([])}
              />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <FileListView
                  files={filteredFiles}
                  selectedFiles={selectedFiles}
                  onFileSelect={handleFileSelect}
                  onSelectAll={handleSelectAll}
                />
              </div>

              <div>
                <MetadataTagging
                  selectedFiles={selectedFiles}
                  onTagsApplied={handleTagsApplied}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'queryAnalytics' && (
          <div className="space-y-6">
            <QueryAnalytics />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <FileAnalytics analytics={fileAnalytics} />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard
            title="Storage by Data Type"
            description="Distribution of storage across different data categories"
            data={[
              { name: 'Seismic Data', value: 23.5 },
              { name: 'Well Logs', value: 12.8 },
              { name: 'Project Files', value: 8.4 },
              { name: 'Interpretations', value: 2.6 }
            ]}
            chartType="pie"
          />
        </div>

        <div className="card-cegal bg-cegal-darker border-cegal-gray-700">
          <div className="p-6 border-b border-cegal-gray-200">
            <h3 className="text-lg font-semibold text-cegal-green">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <Icon className={`h-5 w-5 mt-0.5 ${activity.color}`} />
                    <div className="flex-1">
                      <p className="text-sm text-white">{activity.message}</p>
                      <p className="text-xs text-cegal-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
