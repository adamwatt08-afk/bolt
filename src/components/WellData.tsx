import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  MoreHorizontal,
  Drill,
  MapPin,
  Calendar,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Droplets,
  TrendingUp,
  FileText
} from 'lucide-react';
import WellMapView from './WellMapView';

interface WellData {
  id: string;
  wellName: string;
  location: string;
  wellType: 'Exploration' | 'Development' | 'Production' | 'Injection';
  status: 'active' | 'drilling' | 'completed' | 'suspended' | 'abandoned';
  spudDate: string;
  totalDepth: number;
  currentDepth: number;
  operator: string;
  rig: string;
  field: string;
  formation: string;
  lastUpdate: string;
  dataSize: string;
  dataSizeBytes: number;
  logTypes: string[];
  productionRate?: number;
  owner: string;
}

const WellData: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showMap, setShowMap] = useState<boolean>(false);

  const mockWellData: WellData[] = [
    {
      id: '1',
      wellName: 'Alpha-7H',
      location: 'North Sea, Block 15/25',
      wellType: 'Development',
      status: 'active',
      spudDate: '2024-08-15',
      totalDepth: 4250,
      currentDepth: 4250,
      operator: 'Equinor',
      rig: 'Transocean Spitsbergen',
      field: 'Johan Sverdrup',
      formation: 'Draupne',
      lastUpdate: '2024-12-21',
      dataSize: '234 MB',
      dataSizeBytes: 234000000,
      logTypes: ['GR', 'SP', 'Resistivity', 'Neutron', 'Density'],
      productionRate: 2450,
      owner: 'Drilling Team'
    },
    {
      id: '2',
      wellName: 'Beta-12',
      location: 'Gulf of Mexico, MC 252',
      wellType: 'Exploration',
      status: 'drilling',
      spudDate: '2024-11-20',
      totalDepth: 6800,
      currentDepth: 4200,
      operator: 'BP',
      rig: 'Deepwater Horizon II',
      field: 'Thunder Horse',
      formation: 'Miocene',
      lastUpdate: '2024-12-21',
      dataSize: '156 MB',
      dataSizeBytes: 156000000,
      logTypes: ['GR', 'Caliper', 'Resistivity'],
      owner: 'Exploration Team'
    },
    {
      id: '3',
      wellName: 'Gamma-3ST1',
      location: 'Permian Basin, Texas',
      wellType: 'Production',
      status: 'completed',
      spudDate: '2023-05-10',
      totalDepth: 3850,
      currentDepth: 3850,
      operator: 'ExxonMobil',
      rig: 'Patterson UTI 219',
      field: 'Wolfcamp',
      formation: 'Wolfcamp Shale',
      lastUpdate: '2024-12-18',
      dataSize: '445 MB',
      dataSizeBytes: 445000000,
      logTypes: ['GR', 'SP', 'Resistivity', 'Neutron', 'Density', 'Photoelectric'],
      productionRate: 1850,
      owner: 'Production Team'
    },
    {
      id: '4',
      wellName: 'Delta-8',
      location: 'Campos Basin, Brazil',
      wellType: 'Development',
      status: 'suspended',
      spudDate: '2024-03-12',
      totalDepth: 5200,
      currentDepth: 3100,
      operator: 'Petrobras',
      rig: 'Sete Brasil',
      field: 'Lula',
      formation: 'Pre-Salt Carbonate',
      lastUpdate: '2024-09-15',
      dataSize: '189 MB',
      dataSizeBytes: 189000000,
      logTypes: ['GR', 'Resistivity', 'Neutron'],
      owner: 'Drilling Team'
    },
    {
      id: '5',
      wellName: 'Epsilon-15H',
      location: 'Bakken, North Dakota',
      wellType: 'Production',
      status: 'active',
      spudDate: '2024-07-08',
      totalDepth: 4100,
      currentDepth: 4100,
      operator: 'Continental Resources',
      rig: 'Nabors X-40',
      field: 'Bakken Shale',
      formation: 'Bakken',
      lastUpdate: '2024-12-20',
      dataSize: '378 MB',
      dataSizeBytes: 378000000,
      logTypes: ['GR', 'SP', 'Resistivity', 'Neutron', 'Density', 'Sonic'],
      productionRate: 1200,
      owner: 'Production Team'
    },
    {
      id: '6',
      wellName: 'Zeta-4',
      location: 'West Africa, Angola',
      wellType: 'Exploration',
      status: 'abandoned',
      spudDate: '2023-12-05',
      totalDepth: 4500,
      currentDepth: 2800,
      operator: 'Total',
      rig: 'Maersk Drilling',
      field: 'Block 17',
      formation: 'Oligocene',
      lastUpdate: '2024-02-20',
      dataSize: '98 MB',
      dataSizeBytes: 98000000,
      logTypes: ['GR', 'Resistivity'],
      owner: 'Exploration Team'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'drilling': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'completed': return 'text-cegal-primary bg-blue-50 border-blue-200';
      case 'suspended': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'abandoned': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return Activity;
      case 'drilling': return Drill;
      case 'completed': return CheckCircle;
      case 'suspended': return Clock;
      case 'abandoned': return AlertTriangle;
      default: return CheckCircle;
    }
  };

  const getWellTypeColor = (type: string) => {
    switch (type) {
      case 'Exploration': return 'text-purple-700 bg-purple-50 border-purple-200';
      case 'Development': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'Production': return 'text-green-700 bg-green-50 border-green-200';
      case 'Injection': return 'text-orange-700 bg-orange-50 border-orange-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const filtered = getFilteredData();
    setSelectedItems(
      selectedItems.length === filtered.length ? [] : filtered.map(item => item.id)
    );
  };

  const getFilteredData = () => {
    return mockWellData.filter(item => {
      const matchesStatus = filter === 'all' || item.status === filter;
      const matchesType = typeFilter === 'all' || item.wellType === typeFilter;
      const matchesSearch = item.wellName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.operator.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.field.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesType && matchesSearch;
    });
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredData = getFilteredData();

  if (showMap) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-cegal-green">Well Data - Map View</h2>
            <p className="text-white mt-1">Geographic visualization of well locations</p>
          </div>
          <button
            onClick={() => setShowMap(false)}
            className="btn-cegal-secondary"
          >
            Back to List
          </button>
        </div>
        <WellMapView />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cegal-green">Well Data</h2>
          <p className="text-white mt-1">Monitor drilling operations and well logs</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-cegal-secondary">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button
            onClick={() => setShowMap(true)}
            className="btn-cegal-secondary"
          >
            <MapPin className="h-4 w-4 mr-2" />
            Map View
          </button>
          <button className="btn-cegal-primary">
            <Drill className="h-4 w-4 mr-2" />
            New Well
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-cegal p-6 bg-cegal-darker border-cegal-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Drill className="h-6 w-6 text-cegal-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-cegal-gray-600">Total Wells</p>
              <p className="text-2xl font-bold text-cegal-green">{mockWellData.length}</p>
            </div>
          </div>
        </div>
        <div className="card-cegal p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-cegal-gray-600">Active</p>
              <p className="text-2xl font-bold text-cegal-dark">
                {mockWellData.filter(w => w.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card-cegal p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Drill className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-cegal-gray-600">Drilling</p>
              <p className="text-2xl font-bold text-cegal-dark">
                {mockWellData.filter(w => w.status === 'drilling').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card-cegal p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-teal-100 rounded-lg">
              <Droplets className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-cegal-gray-600">Avg Production</p>
              <p className="text-2xl font-bold text-cegal-dark">
                {Math.round(mockWellData.filter(w => w.productionRate).reduce((sum, w) => sum + (w.productionRate || 0), 0) / mockWellData.filter(w => w.productionRate).length)} bpd
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card-cegal p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search wells..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent w-64"
              />
            </div>
            
            <select 
              value={typeFilter} 
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="Exploration">Exploration</option>
              <option value="Development">Development</option>
              <option value="Production">Production</option>
              <option value="Injection">Injection</option>
            </select>
            
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="drilling">Drilling</option>
              <option value="completed">Completed</option>
              <option value="suspended">Suspended</option>
              <option value="abandoned">Abandoned</option>
            </select>
          </div>

          {selectedItems.length > 0 && (
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <p className="text-sm font-medium text-blue-900">
                {selectedItems.length} well(s) selected
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Data Table */}
      <div className="card-cegal">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-cegal-gray-50 border-b border-cegal-gray-200">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={filteredData.length > 0 && selectedItems.length === filteredData.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-cegal-primary focus:ring-cegal-primary"
                  />
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-cegal-gray-500">Well</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-cegal-gray-500">Type</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-cegal-gray-500">Location</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-cegal-gray-500">Depth</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-cegal-gray-500">Production</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-cegal-gray-500">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-cegal-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cegal-gray-200">
              {filteredData.map((well) => {
                const StatusIcon = getStatusIcon(well.status);
                return (
                  <tr key={well.id} className={`hover:bg-cegal-gray-50 transition-colors ${
                    selectedItems.includes(well.id) ? 'bg-blue-50' : ''
                  }`}>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(well.id)}
                        onChange={() => handleSelectItem(well.id)}
                        className="rounded border-gray-300 text-cegal-primary focus:ring-cegal-primary"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-cegal-dark">{well.wellName}</p>
                        <p className="text-xs text-cegal-gray-500">{well.operator} • {well.rig}</p>
                        <p className="text-xs text-cegal-gray-500">Field: {well.field}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${getWellTypeColor(well.wellType)}`}>
                        {well.wellType}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-cegal-gray-400" />
                        <span className="text-sm text-cegal-dark">{well.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-cegal-dark">{well.currentDepth.toLocaleString()} ft</p>
                        <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                          <div 
                            className="h-1 bg-cegal-primary rounded-full"
                            style={{ width: `${(well.currentDepth / well.totalDepth) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-cegal-gray-500">TD: {well.totalDepth.toLocaleString()} ft</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {well.productionRate ? (
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-cegal-dark">{well.productionRate.toLocaleString()} bpd</span>
                        </div>
                      ) : (
                        <span className="text-sm text-cegal-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center space-x-2 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(well.status)}`}>
                        <StatusIcon className="h-3 w-3" />
                        <span className="capitalize">{well.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-gray-400 hover:text-cegal-primary transition-colors" title="View Details">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-cegal-primary transition-colors" title="Download Logs">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-cegal-primary transition-colors" title="More">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <Drill className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No wells found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WellData;