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
  const [activeTab, setActiveTab] = useState<'summary' | 'applications' | 'seismic' | 'wells' | 'analytics' | 'querying'>('summary');
  const [expandedApp, setExpandedApp] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [filters, setFilters] = useState<any>({});
  const [viewMode, setViewMode] = useState<'corrupt' | 'old' | 'stale' | 'all'>('all');

  const mockFileMetadata: FileMetadata[] = [
    {
      name: 'North_Sea_Legacy_2019.segy',
      path: '/seismic/archived/',
      extension: 'segy',
      size: 198000000000000,
      lastAccess: new Date('2023-08-15'),
      lastModified: new Date('2023-08-10'),
      createDate: new Date('2019-03-15'),
      fileOwners: ['Geophysics Team']
    },
    {
      name: 'Training_Data_2020.las',
      path: '/wells/training/',
      extension: 'las',
      size: 87000000000000,
      lastAccess: new Date('2023-11-20'),
      lastModified: new Date('2023-11-15'),
      createDate: new Date('2020-05-22'),
      fileOwners: ['Training Team']
    },
    {
      name: 'Backup_Petrel_Project.pet',
      path: '/projects/backups/',
      extension: 'pet',
      size: 412000000000000,
      lastAccess: new Date('2024-03-10'),
      lastModified: new Date('2024-03-08'),
      createDate: new Date('2023-01-20'),
      fileOwners: ['Interpretation Team']
    },
    {
      name: 'Corrupted_Survey_2023.sgy',
      path: '/seismic/processing/',
      extension: 'sgy',
      size: 634000000000000,
      lastAccess: new Date('2024-01-05'),
      lastModified: new Date('2024-01-03'),
      createDate: new Date('2023-08-10'),
      fileOwners: ['Processing Team']
    },
    {
      name: 'Old_Simulation_2018.data',
      path: '/reservoir/legacy/',
      extension: 'data',
      size: 156000000000000,
      lastAccess: new Date('2023-09-22'),
      lastModified: new Date('2023-09-20'),
      createDate: new Date('2018-12-05'),
      fileOwners: ['Reservoir Team']
    },
    {
      name: 'North_Sea_Block_15-25_3D.segy',
      path: '/seismic/active/',
      extension: 'segy',
      size: 856000000000000,
      lastAccess: new Date('2024-12-20'),
      lastModified: new Date('2024-12-18'),
      createDate: new Date('2024-06-10'),
      fileOwners: ['Geophysics Team', 'Processing Team']
    },
    {
      name: 'Johan_Sverdrup_4D_Baseline.sgy',
      path: '/seismic/active/',
      extension: 'sgy',
      size: 712000000000000,
      lastAccess: new Date('2024-12-18'),
      lastModified: new Date('2024-12-15'),
      createDate: new Date('2024-04-22'),
      fileOwners: ['Reservoir Team']
    },
    {
      name: 'NS_15-25-A_Complete_Suite.las',
      path: '/wells/active/',
      extension: 'las',
      size: 123000000000000,
      lastAccess: new Date('2024-12-20'),
      lastModified: new Date('2024-12-19'),
      createDate: new Date('2024-11-05'),
      fileOwners: ['Petrophysics Team']
    },
    {
      name: 'Johan_Sverdrup_P1_Logs.dlis',
      path: '/wells/active/',
      extension: 'dlis',
      size: 108000000000000,
      lastAccess: new Date('2024-12-18'),
      lastModified: new Date('2024-12-17'),
      createDate: new Date('2024-10-12'),
      fileOwners: ['Well Logging Team']
    },
    {
      name: 'Johan_Sverdrup_Field_Model.ecl',
      path: '/reservoir/active/',
      extension: 'ecl',
      size: 156000000000000,
      lastAccess: new Date('2024-12-20'),
      lastModified: new Date('2024-12-19'),
      createDate: new Date('2024-08-15'),
      fileOwners: ['Reservoir Team']
    },
    {
      name: 'GOM_Deepwater_3D_Final.segy',
      path: '/seismic/active/',
      extension: 'segy',
      size: 634000000000000,
      lastAccess: new Date('2024-12-15'),
      lastModified: new Date('2024-12-12'),
      createDate: new Date('2024-05-08'),
      fileOwners: ['Processing Team']
    },
    {
      name: 'Brazil_PreSalt_3D.sgy',
      path: '/seismic/active/',
      extension: 'sgy',
      size: 689000000000000,
      lastAccess: new Date('2024-12-08'),
      lastModified: new Date('2024-12-05'),
      createDate: new Date('2024-03-22'),
      fileOwners: ['Geophysics Team']
    },
    {
      name: 'West_Africa_PreSTM.segy',
      path: '/seismic/active/',
      extension: 'segy',
      size: 523000000000000,
      lastAccess: new Date('2024-12-10'),
      lastModified: new Date('2024-12-07'),
      createDate: new Date('2024-04-15'),
      fileOwners: ['Processing Team', 'Geophysics Team']
    },
    {
      name: 'Barents_Regional_2D.seg',
      path: '/seismic/active/',
      extension: 'seg',
      size: 567000000000000,
      lastAccess: new Date('2024-12-12'),
      lastModified: new Date('2024-12-09'),
      createDate: new Date('2024-02-18'),
      fileOwners: ['Acquisition Team']
    },
    {
      name: 'Permian_Horizontal_Well_H7.las',
      path: '/wells/active/',
      extension: 'las',
      size: 97000000000000,
      lastAccess: new Date('2024-12-08'),
      lastModified: new Date('2024-12-06'),
      createDate: new Date('2024-09-20'),
      fileOwners: ['Petrophysics Team']
    },
    {
      name: 'Brazil_Lula_Production_23.dlis',
      path: '/wells/active/',
      extension: 'dlis',
      size: 119000000000000,
      lastAccess: new Date('2024-12-12'),
      lastModified: new Date('2024-12-10'),
      createDate: new Date('2024-08-05'),
      fileOwners: ['Well Logging Team']
    },
    {
      name: 'GOM_Thunder_Horse_A3.las',
      path: '/wells/active/',
      extension: 'las',
      size: 94000000000000,
      lastAccess: new Date('2024-12-16'),
      lastModified: new Date('2024-12-14'),
      createDate: new Date('2024-10-01'),
      fileOwners: ['Petrophysics Team']
    },
    {
      name: 'Campos_Basin_Pre-Salt.pet',
      path: '/projects/active/',
      extension: 'pet',
      size: 234000000000000,
      lastAccess: new Date('2024-12-08'),
      lastModified: new Date('2024-12-05'),
      createDate: new Date('2024-07-12'),
      fileOwners: ['Reservoir Team']
    },
    {
      name: 'Lula_Field_Brazil.ecl',
      path: '/reservoir/active/',
      extension: 'ecl',
      size: 134000000000000,
      lastAccess: new Date('2024-12-17'),
      lastModified: new Date('2024-12-16'),
      createDate: new Date('2024-06-20'),
      fileOwners: ['Production Team']
    },
    {
      name: 'Thunder_Horse_GOM.ecl',
      path: '/reservoir/active/',
      extension: 'ecl',
      size: 118000000000000,
      lastAccess: new Date('2024-12-14'),
      lastModified: new Date('2024-12-12'),
      createDate: new Date('2024-05-30'),
      fileOwners: ['Reservoir Team']
    },
    {
      name: 'Caspian_Exploration_3D.segy',
      path: '/seismic/active/',
      extension: 'segy',
      size: 445000000000000,
      lastAccess: new Date('2024-12-11'),
      lastModified: new Date('2024-12-09'),
      createDate: new Date('2024-07-08'),
      fileOwners: ['Exploration Team']
    },
    {
      name: 'Norwegian_Continental_Shelf.seg',
      path: '/seismic/active/',
      extension: 'seg',
      size: 501000000000000,
      lastAccess: new Date('2024-12-19'),
      lastModified: new Date('2024-12-16'),
      createDate: new Date('2024-09-12'),
      fileOwners: ['Geophysics Team', 'Acquisition Team']
    },
    {
      name: 'Angola_Deep_Water.segy',
      path: '/seismic/active/',
      extension: 'segy',
      size: 389000000000000,
      lastAccess: new Date('2024-12-07'),
      lastModified: new Date('2024-12-04'),
      createDate: new Date('2024-06-25'),
      fileOwners: ['Processing Team']
    },
    {
      name: 'Alaska_North_Slope_Survey.sgy',
      path: '/seismic/active/',
      extension: 'sgy',
      size: 412000000000000,
      lastAccess: new Date('2024-12-13'),
      lastModified: new Date('2024-12-11'),
      createDate: new Date('2024-08-19'),
      fileOwners: ['Acquisition Team']
    },
    {
      name: 'Eastern_Med_Exploration.segy',
      path: '/seismic/active/',
      extension: 'segy',
      size: 378000000000000,
      lastAccess: new Date('2024-12-05'),
      lastModified: new Date('2024-12-02'),
      createDate: new Date('2024-05-17'),
      fileOwners: ['Exploration Team']
    },
    {
      name: 'Guyana_Offshore_Block.sgy',
      path: '/seismic/active/',
      extension: 'sgy',
      size: 467000000000000,
      lastAccess: new Date('2024-12-09'),
      lastModified: new Date('2024-12-06'),
      createDate: new Date('2024-07-22'),
      fileOwners: ['Geophysics Team']
    },
    {
      name: 'Bakken_Shale_3D.segy',
      path: '/seismic/active/',
      extension: 'segy',
      size: 289000000000000,
      lastAccess: new Date('2024-12-17'),
      lastModified: new Date('2024-12-14'),
      createDate: new Date('2024-10-03'),
      fileOwners: ['Processing Team']
    },
    {
      name: 'Eagle_Ford_Regional.seg',
      path: '/seismic/active/',
      extension: 'seg',
      size: 312000000000000,
      lastAccess: new Date('2024-12-16'),
      lastModified: new Date('2024-12-13'),
      createDate: new Date('2024-09-28'),
      fileOwners: ['Acquisition Team']
    },
    {
      name: 'Marcellus_Formation_Survey.segy',
      path: '/seismic/active/',
      extension: 'segy',
      size: 267000000000000,
      lastAccess: new Date('2024-12-06'),
      lastModified: new Date('2024-12-03'),
      createDate: new Date('2024-08-07'),
      fileOwners: ['Exploration Team']
    },
    {
      name: 'Vaca_Muerta_Argentina.sgy',
      path: '/seismic/active/',
      extension: 'sgy',
      size: 334000000000000,
      lastAccess: new Date('2024-12-04'),
      lastModified: new Date('2024-12-01'),
      createDate: new Date('2024-06-14'),
      fileOwners: ['Processing Team']
    },
    {
      name: 'Permian_Delaware_Basin.las',
      path: '/wells/active/',
      extension: 'las',
      size: 89000000000000,
      lastAccess: new Date('2024-12-15'),
      lastModified: new Date('2024-12-13'),
      createDate: new Date('2024-11-02'),
      fileOwners: ['Petrophysics Team']
    },
    {
      name: 'Wolfcamp_Formation_Logs.dlis',
      path: '/wells/active/',
      extension: 'dlis',
      size: 76000000000000,
      lastAccess: new Date('2024-12-14'),
      lastModified: new Date('2024-12-11'),
      createDate: new Date('2024-10-18'),
      fileOwners: ['Well Logging Team']
    },
    {
      name: 'Spraberry_Trend_Wells.las',
      path: '/wells/active/',
      extension: 'las',
      size: 67000000000000,
      lastAccess: new Date('2024-12-12'),
      lastModified: new Date('2024-12-09'),
      createDate: new Date('2024-09-25'),
      fileOwners: ['Petrophysics Team']
    },
    {
      name: 'DJ_Basin_Niobrara.dlis',
      path: '/wells/active/',
      extension: 'dlis',
      size: 71000000000000,
      lastAccess: new Date('2024-12-10'),
      lastModified: new Date('2024-12-07'),
      createDate: new Date('2024-08-30'),
      fileOwners: ['Well Logging Team']
    },
    {
      name: 'SCOOP_STACK_Wells.las',
      path: '/wells/active/',
      extension: 'las',
      size: 58000000000000,
      lastAccess: new Date('2024-12-08'),
      lastModified: new Date('2024-12-05'),
      createDate: new Date('2024-07-19'),
      fileOwners: ['Petrophysics Team']
    },
    {
      name: 'Haynesville_Shale_Logs.dlis',
      path: '/wells/active/',
      extension: 'dlis',
      size: 63000000000000,
      lastAccess: new Date('2024-12-11'),
      lastModified: new Date('2024-12-08'),
      createDate: new Date('2024-10-09'),
      fileOwners: ['Well Logging Team']
    },
    {
      name: 'Utica_Shale_Suite.las',
      path: '/wells/active/',
      extension: 'las',
      size: 54000000000000,
      lastAccess: new Date('2024-12-09'),
      lastModified: new Date('2024-12-06'),
      createDate: new Date('2024-09-14'),
      fileOwners: ['Petrophysics Team']
    },
    {
      name: 'West_Africa_Interpretation.pet',
      path: '/projects/active/',
      extension: 'pet',
      size: 289000000000000,
      lastAccess: new Date('2024-12-19'),
      lastModified: new Date('2024-12-17'),
      createDate: new Date('2024-08-23'),
      fileOwners: ['Interpretation Team']
    },
    {
      name: 'North_Africa_Regional.pet',
      path: '/projects/active/',
      extension: 'pet',
      size: 256000000000000,
      lastAccess: new Date('2024-12-13'),
      lastModified: new Date('2024-12-10'),
      createDate: new Date('2024-07-05'),
      fileOwners: ['Exploration Team']
    },
    {
      name: 'Kashagan_Field_Model.ecl',
      path: '/reservoir/active/',
      extension: 'ecl',
      size: 145000000000000,
      lastAccess: new Date('2024-12-15'),
      lastModified: new Date('2024-12-13'),
      createDate: new Date('2024-09-07'),
      fileOwners: ['Reservoir Team']
    },
    {
      name: 'Tengiz_Production_Model.ecl',
      path: '/reservoir/active/',
      extension: 'ecl',
      size: 132000000000000,
      lastAccess: new Date('2024-12-12'),
      lastModified: new Date('2024-12-09'),
      createDate: new Date('2024-08-16'),
      fileOwners: ['Production Team']
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
    },
    {
      id: '6',
      name: 'North_Sea_Block_15-25_3D.segy',
      path: '/seismic/active/',
      size: '856 TB',
      lastAccess: '2024-12-20',
      owner: 'Geophysics Team',
      tags: ['production', 'critical'],
      isCorrupt: false,
      ageCategory: 'recent'
    },
    {
      id: '7',
      name: 'Johan_Sverdrup_4D_Baseline.sgy',
      path: '/seismic/active/',
      size: '712 TB',
      lastAccess: '2024-12-18',
      owner: 'Reservoir Team',
      tags: ['production', '4D'],
      isCorrupt: false,
      ageCategory: 'recent'
    },
    {
      id: '8',
      name: 'GOM_Deepwater_3D_Final.segy',
      path: '/seismic/active/',
      size: '634 TB',
      lastAccess: '2024-12-15',
      owner: 'Processing Team',
      tags: ['production'],
      isCorrupt: false,
      ageCategory: 'recent'
    },
    {
      id: '9',
      name: 'Brazil_PreSalt_3D.sgy',
      path: '/seismic/active/',
      size: '689 TB',
      lastAccess: '2024-12-08',
      owner: 'Geophysics Team',
      tags: ['production', 'presalt'],
      isCorrupt: false,
      ageCategory: 'recent'
    },
    {
      id: '10',
      name: 'West_Africa_PreSTM.segy',
      path: '/seismic/active/',
      size: '523 TB',
      lastAccess: '2024-12-10',
      owner: 'Processing Team',
      tags: ['production'],
      isCorrupt: false,
      ageCategory: 'recent'
    },
    {
      id: '11',
      name: 'NS_15-25-A_Complete_Suite.las',
      path: '/wells/active/',
      size: '123 TB',
      lastAccess: '2024-12-20',
      owner: 'Petrophysics Team',
      tags: ['production'],
      isCorrupt: false,
      ageCategory: 'recent'
    },
    {
      id: '12',
      name: 'Johan_Sverdrup_P1_Logs.dlis',
      path: '/wells/active/',
      size: '108 TB',
      lastAccess: '2024-12-18',
      owner: 'Well Logging Team',
      tags: ['production'],
      isCorrupt: false,
      ageCategory: 'recent'
    },
    {
      id: '13',
      name: 'GOM_Thunder_Horse_A3.las',
      path: '/wells/active/',
      size: '94 TB',
      lastAccess: '2024-12-16',
      owner: 'Petrophysics Team',
      tags: ['production'],
      isCorrupt: false,
      ageCategory: 'recent'
    },
    {
      id: '14',
      name: 'Brazil_Lula_Production_23.dlis',
      path: '/wells/active/',
      size: '119 TB',
      lastAccess: '2024-12-12',
      owner: 'Well Logging Team',
      tags: ['production'],
      isCorrupt: false,
      ageCategory: 'recent'
    },
    {
      id: '15',
      name: 'Permian_Horizontal_Well_H7.las',
      path: '/wells/active/',
      size: '97 TB',
      lastAccess: '2024-12-08',
      owner: 'Petrophysics Team',
      tags: ['production'],
      isCorrupt: false,
      ageCategory: 'recent'
    },
    {
      id: '16',
      name: 'Campos_Basin_Pre-Salt.pet',
      path: '/projects/active/',
      size: '234 TB',
      lastAccess: '2024-12-08',
      owner: 'Reservoir Team',
      tags: ['production'],
      isCorrupt: false,
      ageCategory: 'recent'
    },
    {
      id: '17',
      name: 'Legacy_Processing_2020.sgy',
      path: '/seismic/archived/',
      size: '445 TB',
      lastAccess: '2023-05-15',
      owner: 'Processing Team',
      tags: ['archived', 'ready-to-delete'],
      isCorrupt: false,
      ageCategory: 'old'
    },
    {
      id: '18',
      name: 'Barents_Test_Survey.segy',
      path: '/seismic/testing/',
      size: '289 TB',
      lastAccess: '2024-06-20',
      owner: 'Acquisition Team',
      tags: ['testing', 'stale'],
      isCorrupt: false,
      ageCategory: 'stale'
    },
    {
      id: '19',
      name: 'Damaged_Logs_2023.las',
      path: '/wells/problematic/',
      size: '67 TB',
      lastAccess: '2024-02-10',
      owner: 'Well Logging Team',
      tags: ['corrupt', 'review-needed'],
      isCorrupt: true,
      ageCategory: 'stale'
    },
    {
      id: '20',
      name: 'Old_Eclipse_Model_2019.ecl',
      path: '/reservoir/legacy/',
      size: '98 TB',
      lastAccess: '2023-07-12',
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
      value: '204,589',
      change: '+18%',
      changeType: 'positive' as const,
      icon: Database,
      description: 'Active seismic, well & project data'
    },
    {
      title: 'Storage Used',
      value: '4.7 PB',
      change: '-12%',
      changeType: 'negative' as const,
      icon: HardDrive,
      description: 'After recent optimization'
    },
    {
      title: 'Cost Savings',
      value: '$2.4M',
      change: '+31%',
      changeType: 'positive' as const,
      icon: TrendingDown,
      description: 'Monthly operational savings'
    },
    {
      title: 'Data Quality Score',
      value: '89%',
      change: '+7%',
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
      totalProjects: 8547,
      totalSize: '1.65 PB',
      activeUsers: 342,
      duplicateGroups: 2,
      duplicateSize: '757 TB',
      duplicatePercentage: 45.9,
      chartData: [
        { name: 'Jan 2024', value: 1247 },
        { name: 'Feb 2024', value: 1289 },
        { name: 'Mar 2024', value: 1312 },
        { name: 'Apr 2024', value: 1356 },
        { name: 'May 2024', value: 1398 },
        { name: 'Jun 2024', value: 1423 },
        { name: 'Jul 2024', value: 1467 },
        { name: 'Aug 2024', value: 1501 },
        { name: 'Sep 2024', value: 1534 },
        { name: 'Oct 2024', value: 1578 },
        { name: 'Nov 2024', value: 1612 },
        { name: 'Dec 2024', value: 1645 }
      ],
      added: [
        { name: 'North Sea Interpretation 2024', size: '247 TB', lastModified: '2024-12-15', owner: 'Geophysics Team' },
        { name: 'Gulf of Mexico 4D Analysis', size: '189 TB', lastModified: '2024-12-10', owner: 'Reservoir Team' },
        { name: 'Barents Sea Prospects', size: '156 TB', lastModified: '2024-11-28', owner: 'Exploration Team' }
      ],
      removed: [
        { name: 'Legacy North Sea 2019', size: '198 TB', lastModified: '2024-12-01', owner: 'Archived' },
        { name: 'Obsolete Training Projects', size: '87 TB', lastModified: '2024-11-15', owner: 'Archived' }
      ],
      projects: [
        { name: 'North Sea Block 15/25', size: '412 TB', lastModified: '2024-12-20', owner: 'Geophysics Team' },
        { name: 'Johan Sverdrup Field', size: '378 TB', lastModified: '2024-12-18', owner: 'Reservoir Team' },
        { name: 'Gulf of Mexico Deepwater', size: '345 TB', lastModified: '2024-12-15', owner: 'Exploration Team' },
        { name: 'Barents Sea Regional', size: '298 TB', lastModified: '2024-12-12', owner: 'Geophysics Team' },
        { name: 'West Africa Margin', size: '267 TB', lastModified: '2024-12-10', owner: 'Exploration Team' },
        { name: 'Campos Basin Pre-Salt', size: '234 TB', lastModified: '2024-12-08', owner: 'Reservoir Team' }
      ],
      duplicates: [
        {
          id: '1',
          projects: ['North Sea Block 15/25 (2024)', 'North Sea Block 15/25 (Backup)'],
          size: '412 TB',
          similarity: 98.5
        },
        {
          id: '2',
          projects: ['Gulf of Mexico v1', 'Gulf of Mexico v2 (Copy)'],
          size: '345 TB',
          similarity: 95.2
        }
      ]
    },
    techlog: {
      totalProjects: 12834,
      totalSize: '820 TB',
      activeUsers: 218,
      duplicateGroups: 1,
      duplicateSize: '189 TB',
      duplicatePercentage: 23.0,
      chartData: [
        { name: 'Jan 2024', value: 567 },
        { name: 'Feb 2024', value: 589 },
        { name: 'Mar 2024', value: 612 },
        { name: 'Apr 2024', value: 634 },
        { name: 'May 2024', value: 658 },
        { name: 'Jun 2024', value: 681 },
        { name: 'Jul 2024', value: 703 },
        { name: 'Aug 2024', value: 727 },
        { name: 'Sep 2024', value: 751 },
        { name: 'Oct 2024', value: 773 },
        { name: 'Nov 2024', value: 796 },
        { name: 'Dec 2024', value: 820 }
      ],
      added: [
        { name: 'Well Alpha-7H Logs', size: '67 TB', lastModified: '2024-12-18', owner: 'Petrophysics Team' },
        { name: 'Beta-12 Formation Evaluation', size: '54 TB', lastModified: '2024-12-12', owner: 'Well Team' }
      ],
      removed: [
        { name: 'Old Training Logs 2020', size: '43 TB', lastModified: '2024-12-05', owner: 'Archived' }
      ],
      projects: [
        { name: 'North Sea Wells Q4 2024', size: '189 TB', lastModified: '2024-12-20', owner: 'Petrophysics Team' },
        { name: 'Permian Basin Analysis', size: '167 TB', lastModified: '2024-12-18', owner: 'Well Team' },
        { name: 'Gulf Coast Exploration', size: '145 TB', lastModified: '2024-12-15', owner: 'Petrophysics Team' },
        { name: 'Offshore Brazil Logs', size: '123 TB', lastModified: '2024-12-12', owner: 'Well Team' },
        { name: 'Bakken Formation Study', size: '98 TB', lastModified: '2024-12-10', owner: 'Petrophysics Team' }
      ],
      duplicates: [
        {
          id: '1',
          projects: ['North Sea Wells Q4 2024', 'North Sea Wells Q4 2024 (Working Copy)'],
          size: '189 TB',
          similarity: 97.8
        }
      ]
    },
    eclipse: {
      totalProjects: 3567,
      totalSize: '589 TB',
      activeUsers: 156,
      duplicateGroups: 1,
      duplicateSize: '156 TB',
      duplicatePercentage: 26.5,
      chartData: [
        { name: 'Jan 2024', value: 423 },
        { name: 'Feb 2024', value: 438 },
        { name: 'Mar 2024', value: 451 },
        { name: 'Apr 2024', value: 467 },
        { name: 'May 2024', value: 482 },
        { name: 'Jun 2024', value: 496 },
        { name: 'Jul 2024', value: 511 },
        { name: 'Aug 2024', value: 528 },
        { name: 'Sep 2024', value: 542 },
        { name: 'Oct 2024', value: 557 },
        { name: 'Nov 2024', value: 571 },
        { name: 'Dec 2024', value: 589 }
      ],
      added: [
        { name: 'Johan Sverdrup Phase 2', size: '112 TB', lastModified: '2024-12-16', owner: 'Reservoir Team' },
        { name: 'Thunder Horse Expansion', size: '94 TB', lastModified: '2024-12-08', owner: 'Production Team' }
      ],
      removed: [
        { name: 'Legacy Simulation 2018', size: '76 TB', lastModified: '2024-11-30', owner: 'Archived' }
      ],
      projects: [
        { name: 'Johan Sverdrup Field Model', size: '156 TB', lastModified: '2024-12-20', owner: 'Reservoir Team' },
        { name: 'Lula Field Brazil', size: '134 TB', lastModified: '2024-12-17', owner: 'Production Team' },
        { name: 'Thunder Horse GOM', size: '118 TB', lastModified: '2024-12-14', owner: 'Reservoir Team' },
        { name: 'Kashagan Kazakhstan', size: '102 TB', lastModified: '2024-12-11', owner: 'Production Team' }
      ],
      duplicates: [
        {
          id: '1',
          projects: ['Johan Sverdrup Field Model v3', 'Johan Sverdrup Field Model v3 (Backup)'],
          size: '156 TB',
          similarity: 99.1
        }
      ]
    },
    resinsight: {
      totalProjects: 2189,
      totalSize: '364 TB',
      activeUsers: 94,
      duplicateGroups: 0,
      duplicateSize: '0 TB',
      duplicatePercentage: 0,
      chartData: [
        { name: 'Jan 2024', value: 234 },
        { name: 'Feb 2024', value: 245 },
        { name: 'Mar 2024', value: 256 },
        { name: 'Apr 2024', value: 268 },
        { name: 'May 2024', value: 279 },
        { name: 'Jun 2024', value: 291 },
        { name: 'Jul 2024', value: 303 },
        { name: 'Aug 2024', value: 315 },
        { name: 'Sep 2024', value: 327 },
        { name: 'Oct 2024', value: 339 },
        { name: 'Nov 2024', value: 351 },
        { name: 'Dec 2024', value: 364 }
      ],
      added: [
        { name: 'Production Analysis 2024 Q4', size: '58 TB', lastModified: '2024-12-19', owner: 'Visualization Team' }
      ],
      removed: [
        { name: 'Test Visualizations 2023', size: '41 TB', lastModified: '2024-12-03', owner: 'Archived' }
      ],
      projects: [
        { name: 'Field Performance Dashboard', size: '97 TB', lastModified: '2024-12-20', owner: 'Visualization Team' },
        { name: 'Well Performance Analysis', size: '82 TB', lastModified: '2024-12-18', owner: 'Production Team' },
        { name: 'Reservoir Monitoring 2024', size: '69 TB', lastModified: '2024-12-15', owner: 'Visualization Team' },
        { name: 'Historical Production Review', size: '56 TB', lastModified: '2024-12-12', owner: 'Production Team' }
      ],
      duplicates: []
    }
  };

  const seismicData = {
    totalFiles: 47823,
    totalSize: '2.30 PB',
    activeUsers: 487,
    duplicateGroups: 2,
    duplicateSize: '1.49 PB',
    duplicatePercentage: 64.8,
    chartData: [
      { name: 'Jan 2024', value: 2567 },
      { name: 'Feb 2024', value: 2534 },
      { name: 'Mar 2024', value: 2489 },
      { name: 'Apr 2024', value: 2445 },
      { name: 'May 2024', value: 2401 },
      { name: 'Jun 2024', value: 2378 },
      { name: 'Jul 2024', value: 2334 },
      { name: 'Aug 2024', value: 2312 },
      { name: 'Sep 2024', value: 2289 },
      { name: 'Oct 2024', value: 2267 },
      { name: 'Nov 2024', value: 2245 },
      { name: 'Dec 2024', value: 2298 }
    ],
    added: [
      { name: 'North Sea 3D Survey 2024.segy', size: '487 TB', lastModified: '2024-12-18', owner: 'Acquisition Team' },
      { name: 'GulfOfMexico_4D_Monitor.sgy', size: '423 TB', lastModified: '2024-12-10', owner: 'Processing Team' },
      { name: 'Barents_Sea_Regional.seg', size: '356 TB', lastModified: '2024-11-25', owner: 'Geophysics Team' }
    ],
    removed: [
      { name: 'Legacy_2D_1998.segy', size: '198 TB', lastModified: '2024-12-01', owner: 'Archived' },
      { name: 'Test_Processing_2023.sgy', size: '234 TB', lastModified: '2024-11-20', owner: 'Archived' }
    ],
    files: [
      { name: 'North_Sea_Block_15-25_3D.segy', size: '856 TB', lastModified: '2024-12-20', owner: 'Geophysics Team' },
      { name: 'Johan_Sverdrup_4D_Baseline.sgy', size: '712 TB', lastModified: '2024-12-18', owner: 'Reservoir Team' },
      { name: 'GOM_Deepwater_3D_Final.segy', size: '634 TB', lastModified: '2024-12-15', owner: 'Processing Team' },
      { name: 'Barents_Regional_2D.seg', size: '567 TB', lastModified: '2024-12-12', owner: 'Acquisition Team' },
      { name: 'West_Africa_PreSTM.segy', size: '523 TB', lastModified: '2024-12-10', owner: 'Processing Team' },
      { name: 'Brazil_PreSalt_3D.sgy', size: '689 TB', lastModified: '2024-12-08', owner: 'Geophysics Team' }
    ],
    duplicates: [
      {
        id: '1',
        projects: ['North_Sea_Block_15-25_3D.segy', 'North_Sea_Block_15-25_3D_backup.segy'],
        size: '856 TB',
        similarity: 99.8
      },
      {
        id: '2',
        projects: ['GOM_Deepwater_3D_Final.segy', 'GOM_Deepwater_3D_Final_v2.segy'],
        size: '634 TB',
        similarity: 98.9
      }
    ]
  };

  const wellsData = {
    totalFiles: 89456,
    totalSize: '1.07 PB',
    activeUsers: 623,
    duplicateGroups: 2,
    duplicateSize: '220 TB',
    duplicatePercentage: 20.6,
    chartData: [
      { name: 'Jan 2024', value: 1134 },
      { name: 'Feb 2024', value: 1123 },
      { name: 'Mar 2024', value: 1112 },
      { name: 'Apr 2024', value: 1101 },
      { name: 'May 2024', value: 1091 },
      { name: 'Jun 2024', value: 1080 },
      { name: 'Jul 2024', value: 1071 },
      { name: 'Aug 2024', value: 1062 },
      { name: 'Sep 2024', value: 1054 },
      { name: 'Oct 2024', value: 1045 },
      { name: 'Nov 2024', value: 1038 },
      { name: 'Dec 2024', value: 1067 }
    ],
    added: [
      { name: 'Well_Alpha-7H_Composite.las', size: '54 TB', lastModified: '2024-12-19', owner: 'Petrophysics Team' },
      { name: 'Beta-12_Formation_Eval.dlis', size: '47 TB', lastModified: '2024-12-14', owner: 'Well Logging Team' },
      { name: 'Gamma-3_Raw_Data.lis', size: '38 TB', lastModified: '2024-12-08', owner: 'Acquisition Team' }
    ],
    removed: [
      { name: 'Training_Well_2019.las', size: '29 TB', lastModified: '2024-12-02', owner: 'Archived' },
      { name: 'Legacy_Logs_1995.lis', size: '41 TB', lastModified: '2024-11-18', owner: 'Archived' }
    ],
    files: [
      { name: 'NS_15-25-A_Complete_Suite.las', size: '123 TB', lastModified: '2024-12-20', owner: 'Petrophysics Team' },
      { name: 'Johan_Sverdrup_P1_Logs.dlis', size: '108 TB', lastModified: '2024-12-18', owner: 'Well Logging Team' },
      { name: 'GOM_Thunder_Horse_A3.las', size: '94 TB', lastModified: '2024-12-16', owner: 'Petrophysics Team' },
      { name: 'Barents_Wildcat_7220-8-1.lis', size: '82 TB', lastModified: '2024-12-14', owner: 'Acquisition Team' },
      { name: 'Brazil_Lula_Production_23.dlis', size: '119 TB', lastModified: '2024-12-12', owner: 'Well Logging Team' },
      { name: 'North_Sea_15-9-19SR_M.las', size: '76 TB', lastModified: '2024-12-10', owner: 'Petrophysics Team' },
      { name: 'Permian_Horizontal_Well_H7.las', size: '97 TB', lastModified: '2024-12-08', owner: 'Petrophysics Team' }
    ],
    duplicates: [
      {
        id: '1',
        projects: ['NS_15-25-A_Complete_Suite.las', 'NS_15-25-A_Complete_Suite_backup.las'],
        size: '123 TB',
        similarity: 99.5
      },
      {
        id: '2',
        projects: ['Permian_Horizontal_Well_H7.las', 'Permian_Horizontal_Well_H7_v2.las'],
        size: '97 TB',
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
            <div className="flex-1">
              <div className="flex items-center justify-between">
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
              {(appData.totalProjects !== undefined || appData.totalFiles !== undefined) && (
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-cegal-gray-800 rounded-lg p-3">
                      <p className="text-xs text-cegal-gray-400">{appData.totalProjects !== undefined ? 'Total Projects' : 'Total Files'}</p>
                      <p className="text-lg font-semibold text-cegal-green mt-1">
                        {appData.totalProjects !== undefined ? appData.totalProjects.toLocaleString() : appData.totalFiles.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-cegal-gray-800 rounded-lg p-3">
                      <p className="text-xs text-cegal-gray-400">Total Size</p>
                      <p className="text-lg font-semibold text-cegal-green mt-1">{appData.totalSize}</p>
                    </div>
                    <div className="bg-cegal-gray-800 rounded-lg p-3">
                      <p className="text-xs text-cegal-gray-400">Active Users</p>
                      <p className="text-lg font-semibold text-cegal-green mt-1">{appData.activeUsers}</p>
                    </div>
                  </div>

                  {appData.duplicateGroups !== undefined && appData.duplicateGroups > 0 && (
                    <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-yellow-600/20 rounded-lg">
                            <Copy className="h-5 w-5 text-yellow-500" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">Duplicate Data Detected</p>
                            <p className="text-xs text-cegal-gray-400 mt-1">
                              {appData.duplicateGroups.toLocaleString()} duplicate {appData.duplicateGroups === 1 ? 'group' : 'groups'} found
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-yellow-500">{appData.duplicateSize}</p>
                          <p className="text-xs text-cegal-gray-400">{appData.duplicatePercentage}% of total</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {appData.duplicateGroups !== undefined && appData.duplicateGroups === 0 && (
                    <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-600/20 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">No Duplicates Detected</p>
                          <p className="text-xs text-cegal-gray-400 mt-1">
                            All data is unique - no duplicate groups found
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
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

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-cegal-green">Data Categories</h3>
          <div className="flex space-x-2 border-b border-cegal-gray-700">
            <button
              onClick={() => setActiveTab('summary')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'summary'
                  ? 'text-cegal-green border-b-2 border-cegal-green'
                  : 'text-cegal-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Database className="h-4 w-4" />
                <span>Summary</span>
              </div>
            </button>
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
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'analytics'
                  ? 'text-cegal-green border-b-2 border-cegal-green'
                  : 'text-cegal-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4" />
                <span>Analytics</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('querying')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'querying'
                  ? 'text-cegal-green border-b-2 border-cegal-green'
                  : 'text-cegal-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Querying</span>
              </div>
            </button>
          </div>
        </div>

        {activeTab === 'summary' && (
          <div className="space-y-6">
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
                    { name: 'Jan 2024', value: 5346 },
                    { name: 'Feb 2024', value: 5289 },
                    { name: 'Mar 2024', value: 5198 },
                    { name: 'Apr 2024', value: 5123 },
                    { name: 'May 2024', value: 5067 },
                    { name: 'Jun 2024', value: 4989 },
                    { name: 'Jul 2024', value: 4912 },
                    { name: 'Aug 2024', value: 4856 },
                    { name: 'Sep 2024', value: 4801 },
                    { name: 'Oct 2024', value: 4745 },
                    { name: 'Nov 2024', value: 4689 },
                    { name: 'Dec 2024', value: 4723 }
                  ]}
                  chartType="line"
                />
              </div>
            </div>

            <div className="card-cegal bg-cegal-darker border-cegal-gray-700">
              <div className="p-6 border-b border-cegal-gray-700">
                <h3 className="text-lg font-semibold text-cegal-green">Data Duplication Overview</h3>
                <p className="text-sm text-cegal-gray-400 mt-1">Potential storage savings from duplicate data removal</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Copy className="h-4 w-4 text-yellow-500" />
                      <p className="text-xs font-medium text-yellow-500">Total Duplicate Groups</p>
                    </div>
                    <p className="text-2xl font-bold text-white">8</p>
                  </div>
                  <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <HardDrive className="h-4 w-4 text-yellow-500" />
                      <p className="text-xs font-medium text-yellow-500">Duplicate Storage</p>
                    </div>
                    <p className="text-2xl font-bold text-white">2.81 PB</p>
                  </div>
                  <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingDown className="h-4 w-4 text-yellow-500" />
                      <p className="text-xs font-medium text-yellow-500">Potential Savings</p>
                    </div>
                    <p className="text-2xl font-bold text-white">$702K</p>
                    <p className="text-xs text-cegal-gray-400 mt-1">per month</p>
                  </div>
                  <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <p className="text-xs font-medium text-yellow-500">Duplication Rate</p>
                    </div>
                    <p className="text-2xl font-bold text-white">59.8%</p>
                    <p className="text-xs text-cegal-gray-400 mt-1">of total storage</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ChartCard
                  title="Storage by Data Type"
                  description="Distribution of storage across different data categories"
                  data={[
                    { name: 'Seismic Data', value: 47823 },
                    { name: 'Well Logs', value: 89456 },
                    { name: 'Project Files', value: 65121 },
                    { name: 'Interpretations', value: 2189 }
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
        )}

        {activeTab === 'applications' && (
          <div className="space-y-6">
            {renderApplicationDetails('petrel', applicationsData.petrel)}
            {renderApplicationDetails('techlog', applicationsData.techlog)}
            {renderApplicationDetails('eclipse', applicationsData.eclipse)}
            {renderApplicationDetails('resinsight', applicationsData.resinsight)}

            <div className="card-cegal bg-cegal-darker border-cegal-gray-700 p-6">
              <h3 className="text-lg font-semibold text-cegal-green mb-4">Data Management</h3>
              <DataQualityAnalysis
                corruptFiles={mockFiles.filter(f => f.isCorrupt && (f.path.includes('projects') || f.path.includes('backup'))).length}
                oldFiles={mockFiles.filter(f => f.ageCategory === 'old' && (f.path.includes('projects') || f.path.includes('backup'))).length}
                staleFiles={mockFiles.filter(f => f.ageCategory === 'stale' && (f.path.includes('projects') || f.path.includes('backup'))).length}
                totalSize="1.9 PB"
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

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <div className="lg:col-span-2">
                  <FileListView
                    files={filteredFiles.filter(f => f.path.includes('projects') || f.path.includes('backup'))}
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
          </div>
        )}

        {activeTab === 'seismic' && (
          <div className="space-y-6">
            {renderApplicationDetails('seismic', seismicData)}

            <div className="card-cegal bg-cegal-darker border-cegal-gray-700 p-6">
              <h3 className="text-lg font-semibold text-cegal-green mb-4">Data Management</h3>
              <DataQualityAnalysis
                corruptFiles={mockFiles.filter(f => f.isCorrupt && f.path.includes('seismic')).length}
                oldFiles={mockFiles.filter(f => f.ageCategory === 'old' && f.path.includes('seismic')).length}
                staleFiles={mockFiles.filter(f => f.ageCategory === 'stale' && f.path.includes('seismic')).length}
                totalSize="2.3 PB"
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

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <div className="lg:col-span-2">
                  <FileListView
                    files={filteredFiles.filter(f => f.path.includes('seismic'))}
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
          </div>
        )}

        {activeTab === 'wells' && (
          <div className="space-y-6">
            {renderApplicationDetails('wells', wellsData)}

            <div className="card-cegal bg-cegal-darker border-cegal-gray-700 p-6">
              <h3 className="text-lg font-semibold text-cegal-green mb-4">Data Management</h3>
              <DataQualityAnalysis
                corruptFiles={mockFiles.filter(f => f.isCorrupt && f.path.includes('wells')).length}
                oldFiles={mockFiles.filter(f => f.ageCategory === 'old' && f.path.includes('wells')).length}
                staleFiles={mockFiles.filter(f => f.ageCategory === 'stale' && f.path.includes('wells')).length}
                totalSize="1.1 PB"
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

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <div className="lg:col-span-2">
                  <FileListView
                    files={filteredFiles.filter(f => f.path.includes('wells'))}
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
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <FileAnalytics analytics={fileAnalytics} />
          </div>
        )}

        {activeTab === 'querying' && (
          <div className="space-y-6">
            <QueryAnalytics />
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;
