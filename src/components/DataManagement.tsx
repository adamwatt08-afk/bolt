import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Archive, 
  Trash2, 
  Download, 
  AlertTriangle,
  CheckCircle,
  Clock,
  HardDrive,
  Layers,
  Drill,
  FileText,
  Eye,
  MoreHorizontal
} from 'lucide-react';

interface DataItem {
  id: string;
  name: string;
  type: 'seismic' | 'well' | 'project';
  size: string;
  sizeBytes: number;
  lastAccessed: string;
  status: 'active' | 'obsolete' | 'duplicate';
  location: string;
  createdDate: string;
  owner: string;
}

const DataManagement: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const mockData: DataItem[] = [
    {
      id: '1',
      name: 'North Sea Survey 2019',
      type: 'seismic',
      size: '2.3 TB',
      sizeBytes: 2300000000000,
      lastAccessed: '2024-01-15',
      status: 'obsolete',
      location: '/data/seismic/north_sea/',
      createdDate: '2019-03-15',
      owner: 'Geophysics Team'
    },
    {
      id: '2',
      name: 'Well Log Alpha-7',
      type: 'well',
      size: '45 MB',
      sizeBytes: 45000000,
      lastAccessed: '2024-12-20',
      status: 'active',
      location: '/data/wells/alpha/',
      createdDate: '2024-11-10',
      owner: 'Drilling Team'
    },
    {
      id: '3',
      name: 'Gulf Project Interpretation',
      type: 'project',
      size: '890 MB',
      sizeBytes: 890000000,
      lastAccessed: '2023-08-12',
      status: 'duplicate',
      location: '/data/projects/gulf/',
      createdDate: '2023-06-20',
      owner: 'Interpretation Team'
    },
    {
      id: '4',
      name: 'Velocity Model v2.1',
      type: 'seismic',
      size: '1.7 TB',
      sizeBytes: 1700000000000,
      lastAccessed: '2024-11-30',
      status: 'active',
      location: '/data/seismic/velocity/',
      createdDate: '2024-10-05',
      owner: 'Geophysics Team'
    },
    {
      id: '5',
      name: 'Legacy Production Data',
      type: 'well',
      size: '156 MB',
      sizeBytes: 156000000,
      lastAccessed: '2022-03-15',
      status: 'obsolete',
      location: '/data/wells/legacy/',
      createdDate: '2020-01-10',
      owner: 'Production Team'
    },
    {
      id: '6',
      name: 'Seismic Processing Stack',
      type: 'seismic',
      size: '3.2 TB',
      sizeBytes: 3200000000000,
      lastAccessed: '2024-12-18',
      status: 'active',
      location: '/data/seismic/processing/',
      createdDate: '2024-12-01',
      owner: 'Processing Team'
    },
    {
      id: '7',
      name: 'Well Completion Reports',
      type: 'well',
      size: '234 MB',
      sizeBytes: 234000000,
      lastAccessed: '2023-05-20',
      status: 'obsolete',
      location: '/data/wells/completion/',
      createdDate: '2022-08-15',
      owner: 'Completion Team'
    },
    {
      id: '8',
      name: 'Reservoir Modeling Project',
      type: 'project',
      size: '1.1 GB',
      sizeBytes: 1100000000,
      lastAccessed: '2024-12-15',
      status: 'active',
      location: '/data/projects/reservoir/',
      createdDate: '2024-09-10',
      owner: 'Reservoir Team'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'obsolete': return 'text-red-600 bg-red-50';
      case 'duplicate': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'obsolete': return AlertTriangle;
      case 'duplicate': return Clock;
      default: return HardDrive;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'seismic': return Layers;
      case 'well': return Drill;
      case 'project': return FileText;
      default: return HardDrive;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'seismic': return 'text-blue-700 bg-blue-50';
      case 'well': return 'text-teal-700 bg-teal-50';
      case 'project': return 'text-orange-700 bg-orange-50';
      default: return 'text-gray-700 bg-gray-50';
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

  const handleSelectByType = (type: string) => {
    const itemsOfType = mockData.filter(item => item.type === type).map(item => item.id);
    const allSelected = itemsOfType.every(id => selectedItems.includes(id));
    
    if (allSelected) {
      setSelectedItems(prev => prev.filter(id => !itemsOfType.includes(id)));
    } else {
      setSelectedItems(prev => [...new Set([...prev, ...itemsOfType])]);
    }
  };

  const getFilteredData = () => {
    return mockData.filter(item => {
      const matchesStatus = filter === 'all' || item.status === filter;
      const matchesType = typeFilter === 'all' || item.type === typeFilter;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.owner.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesType && matchesSearch;
    });
  };

  const getSelectedItemsInfo = () => {
    const selectedData = mockData.filter(item => selectedItems.includes(item.id));
    const totalSize = selectedData.reduce((sum, item) => sum + item.sizeBytes, 0);
    const types = {
      seismic: selectedData.filter(item => item.type === 'seismic').length,
      well: selectedData.filter(item => item.type === 'well').length,
      project: selectedData.filter(item => item.type === 'project').length
    };
    
    return { selectedData, totalSize, types };
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredData = getFilteredData();
  const { selectedData, totalSize, types } = getSelectedItemsInfo();

  const ArchiveModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-cegal-darker rounded-xl shadow-xl max-w-md w-full mx-4 border border-cegal-gray-600">
        <div className="p-6 border-b border-cegal-gray-600">
          <div className="flex items-center space-x-3">
            <Archive className="h-6 w-6 text-orange-600" />
            <h3 className="text-lg font-semibold text-white">Archive Selected Items</h3>
          </div>
        </div>
        <div className="p-6">
          <p className="text-cegal-gray-300 mb-4">
            You are about to archive {selectedItems.length} item(s) totaling {formatBytes(totalSize)}.
          </p>
          <div className="bg-cegal-gray-800 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <p className="font-medium text-cegal-primary">{types.seismic}</p>
                <p className="text-cegal-gray-400">Seismic</p>
              </div>
              <div className="text-center">
                <p className="font-medium text-teal-400">{types.well}</p>
                <p className="text-cegal-gray-400">Well</p>
              </div>
              <div className="text-center">
                <p className="font-medium text-orange-400">{types.project}</p>
                <p className="text-cegal-gray-400">Project</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-cegal-gray-400 mb-6">
            Archived items will be moved to cold storage and can be restored if needed.
          </p>
          <div className="flex space-x-3">
            <button
              onClick={() => {
                setShowArchiveModal(false);
                setSelectedItems([]);
              }}
              className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Archive Items
            </button>
            <button
              onClick={() => setShowArchiveModal(false)}
              className="flex-1 px-4 py-2 border border-cegal-gray-600 text-cegal-gray-300 rounded-lg hover:bg-cegal-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const DeleteModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-cegal-darker rounded-xl shadow-xl max-w-md w-full mx-4 border border-cegal-gray-600">
        <div className="p-6 border-b border-cegal-gray-600">
          <div className="flex items-center space-x-3">
            <Trash2 className="h-6 w-6 text-red-600" />
            <h3 className="text-lg font-semibold text-white">Delete Selected Items</h3>
          </div>
        </div>
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <p className="font-medium text-red-800">Warning: This action cannot be undone</p>
            </div>
            <p className="text-red-700 text-sm">
              You are about to permanently delete {selectedItems.length} item(s) totaling {formatBytes(totalSize)}.
            </p>
          </div>
          <div className="bg-cegal-gray-800 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <p className="font-medium text-cegal-primary">{types.seismic}</p>
                <p className="text-cegal-gray-400">Seismic</p>
              </div>
              <div className="text-center">
                <p className="font-medium text-teal-400">{types.well}</p>
                <p className="text-cegal-gray-400">Well</p>
              </div>
              <div className="text-center">
                <p className="font-medium text-orange-400">{types.project}</p>
                <p className="text-cegal-gray-400">Project</p>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedItems([]);
              }}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete Permanently
            </button>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="flex-1 px-4 py-2 border border-cegal-gray-600 text-cegal-gray-300 rounded-lg hover:bg-cegal-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-cegal-green">Data Management</h2>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowArchiveModal(true)}
            disabled={selectedItems.length === 0}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Archive className="h-4 w-4" />
            <span>Archive ({selectedItems.length})</span>
          </button>
          <button 
            onClick={() => setShowDeleteModal(true)}
            disabled={selectedItems.length === 0}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete ({selectedItems.length})</span>
          </button>
        </div>
      </div>

      {/* Quick Selection by Type */}
      <div className="card-cegal p-6 bg-cegal-darker border-cegal-gray-700">
        <h3 className="text-lg font-semibold text-cegal-green mb-4">Quick Selection</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { type: 'seismic', label: 'Seismic Data', icon: Layers, color: 'blue' },
            { type: 'well', label: 'Well Data', icon: Drill, color: 'teal' },
            { type: 'project', label: 'Project Data', icon: FileText, color: 'orange' }
          ].map(({ type, label, icon: Icon, color }) => {
            const count = mockData.filter(item => item.type === type).length;
            const selectedCount = mockData.filter(item => item.type === type && selectedItems.includes(item.id)).length;
            const allSelected = count > 0 && selectedCount === count;
            
            return (
              <button
                key={type}
                onClick={() => handleSelectByType(type)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  allSelected 
                    ? `border-cegal-primary bg-cegal-primary/10` 
                    : 'border-cegal-gray-600 hover:border-cegal-gray-500'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`h-6 w-6 text-cegal-primary`} />
                  <div className="text-left">
                    <p className="font-medium text-white">{label}</p>
                    <p className="text-sm text-cegal-gray-400">
                      {selectedCount}/{count} selected
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card-cegal p-6 bg-cegal-darker border-cegal-gray-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search data assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent w-64 bg-cegal-dark text-white placeholder-cegal-gray-400"
              />
            </div>
            
            <select 
              value={typeFilter} 
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent bg-cegal-dark text-white"
            >
              <option value="all">All Types</option>
              <option value="seismic">Seismic</option>
              <option value="well">Well</option>
              <option value="project">Project</option>
            </select>
            
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent bg-cegal-dark text-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="obsolete">Obsolete</option>
              <option value="duplicate">Duplicate</option>
            </select>
          </div>

          {selectedItems.length > 0 && (
            <div className="bg-cegal-primary/10 px-4 py-2 rounded-lg border border-cegal-primary/20">
              <p className="text-sm font-medium text-cegal-green">
                {selectedItems.length} item(s) selected • {formatBytes(totalSize)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Data Table */}
      <div className="card-cegal bg-cegal-darker border-cegal-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-cegal-gray-800 border-b border-cegal-gray-600">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={filteredData.length > 0 && selectedItems.length === filteredData.length}
                    onChange={handleSelectAll}
                    className="rounded border-cegal-gray-600 text-cegal-primary focus:ring-cegal-primary"
                  />
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Type</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Size</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Owner</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Last Accessed</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cegal-gray-700">
              {filteredData.map((item) => {
                const StatusIcon = getStatusIcon(item.status);
                const TypeIcon = getTypeIcon(item.type);
                return (
                  <tr key={item.id} className={`hover:bg-cegal-gray-800 transition-colors ${
                    selectedItems.includes(item.id) ? 'bg-cegal-primary/5' : ''
                  }`}>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                        className="rounded border-cegal-gray-600 text-cegal-primary focus:ring-cegal-primary"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-white">{item.name}</p>
                        <p className="text-xs text-cegal-gray-400">{item.location}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center space-x-2 px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(item.type)}`}>
                        <TypeIcon className="h-3 w-3" />
                        <span className="capitalize">{item.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-white">{item.size}</td>
                    <td className="px-6 py-4 text-sm text-white">{item.owner}</td>
                    <td className="px-6 py-4 text-sm text-white">{item.lastAccessed}</td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center space-x-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        <StatusIcon className="h-3 w-3" />
                        <span className="capitalize">{item.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-cegal-gray-400 hover:text-cegal-primary transition-colors" title="View Details">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-cegal-gray-400 hover:text-cegal-primary transition-colors" title="Download">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-cegal-gray-400 hover:text-orange-600 transition-colors" title="Archive">
                          <Archive className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-cegal-gray-400 hover:text-red-600 transition-colors" title="Delete">
                          <Trash2 className="h-4 w-4" />
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
            <HardDrive className="h-12 w-12 text-cegal-gray-400 mx-auto mb-4" />
            <p className="text-cegal-gray-400">No data assets found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {showArchiveModal && <ArchiveModal />}
      {showDeleteModal && <DeleteModal />}
    </div>
  );
};

export default DataManagement;