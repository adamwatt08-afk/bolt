import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  MoreHorizontal,
  Layers,
  MapPin,
  Calendar,
  HardDrive,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Zap
} from 'lucide-react';
import SeismicMapView from './SeismicMapView';

interface SeismicSurvey {
  id: string;
  name: string;
  location: string;
  surveyType: '2D' | '3D' | '4D' | 'VSP';
  status: 'active' | 'processing' | 'completed' | 'archived';
  acquisitionDate: string;
  size: string;
  sizeBytes: number;
  contractor: string;
  vessel: string;
  area: string;
  quality: number;
  processingStage: string;
  lastAccessed: string;
  owner: string;
}

const SeismicData: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showMap, setShowMap] = useState<boolean>(false);

  const mockSeismicData: SeismicSurvey[] = [
    {
      id: '1',
      name: 'North Sea Block 15/25 3D Survey',
      location: 'North Sea, UK',
      surveyType: '3D',
      status: 'completed',
      acquisitionDate: '2023-08-15',
      size: '2.3 TB',
      sizeBytes: 2300000000000,
      contractor: 'CGG',
      vessel: 'Ramform Titan',
      area: '450 km²',
      quality: 92,
      processingStage: 'Final Migration',
      lastAccessed: '2024-12-20',
      owner: 'Geophysics Team'
    },
    {
      id: '2',
      name: 'Gulf of Mexico Deepwater 4D',
      location: 'Gulf of Mexico, USA',
      surveyType: '4D',
      status: 'processing',
      acquisitionDate: '2024-11-10',
      size: '4.7 TB',
      sizeBytes: 4700000000000,
      contractor: 'WesternGeco',
      vessel: 'Amazon Warrior',
      area: '680 km²',
      quality: 88,
      processingStage: 'Pre-stack Migration',
      lastAccessed: '2024-12-21',
      owner: 'Reservoir Team'
    },
    {
      id: '3',
      name: 'Barents Sea Regional 2D',
      location: 'Barents Sea, Norway',
      surveyType: '2D',
      status: 'archived',
      acquisitionDate: '2019-06-20',
      size: '890 MB',
      sizeBytes: 890000000,
      contractor: 'TGS',
      vessel: 'Sanco Swift',
      area: '2,400 km',
      quality: 76,
      processingStage: 'Stack',
      lastAccessed: '2023-03-15',
      owner: 'Exploration Team'
    },
    {
      id: '4',
      name: 'Permian Basin VSP Survey',
      location: 'Texas, USA',
      surveyType: 'VSP',
      status: 'active',
      acquisitionDate: '2024-12-01',
      size: '156 MB',
      sizeBytes: 156000000,
      contractor: 'Schlumberger',
      vessel: 'Land Crew',
      area: '12 wells',
      quality: 94,
      processingStage: 'Corridor Stack',
      lastAccessed: '2024-12-21',
      owner: 'Well Team'
    },
    {
      id: '5',
      name: 'Campos Basin 3D OBC',
      location: 'Offshore Brazil',
      surveyType: '3D',
      status: 'completed',
      acquisitionDate: '2024-09-05',
      size: '3.2 TB',
      sizeBytes: 3200000000000,
      contractor: 'PGS',
      vessel: 'Ramform Hyperion',
      area: '520 km²',
      quality: 90,
      processingStage: 'Final Stack',
      lastAccessed: '2024-12-18',
      owner: 'Geophysics Team'
    },
    {
      id: '6',
      name: 'West Africa Margin 2D',
      location: 'Offshore Angola',
      surveyType: '2D',
      status: 'processing',
      acquisitionDate: '2024-10-20',
      size: '1.8 TB',
      sizeBytes: 1800000000000,
      contractor: 'Shearwater',
      vessel: 'SW Tasman',
      area: '3,200 km',
      quality: 85,
      processingStage: 'Velocity Analysis',
      lastAccessed: '2024-12-19',
      owner: 'Exploration Team'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'processing': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'completed': return 'text-cegal-primary bg-blue-50 border-blue-200';
      case 'archived': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return Activity;
      case 'processing': return Clock;
      case 'completed': return CheckCircle;
      case 'archived': return AlertTriangle;
      default: return CheckCircle;
    }
  };

  const getSurveyTypeColor = (type: string) => {
    switch (type) {
      case '2D': return 'text-blue-700 bg-blue-50 border-blue-200';
      case '3D': return 'text-green-700 bg-green-50 border-green-200';
      case '4D': return 'text-purple-700 bg-purple-50 border-purple-200';
      case 'VSP': return 'text-orange-700 bg-orange-50 border-orange-200';
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
    return mockSeismicData.filter(item => {
      const matchesStatus = filter === 'all' || item.status === filter;
      const matchesType = typeFilter === 'all' || item.surveyType === typeFilter;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.contractor.toLowerCase().includes(searchTerm.toLowerCase());
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
            <h2 className="text-2xl font-bold text-cegal-green">Seismic Data - Map View</h2>
            <p className="text-white mt-1">Geographic visualization of seismic surveys</p>
          </div>
          <button
            onClick={() => setShowMap(false)}
            className="btn-cegal-secondary"
          >
            Back to List
          </button>
        </div>
        <SeismicMapView />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cegal-green">Seismic Data</h2>
          <p className="text-white mt-1">Manage seismic surveys and processing workflows</p>
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
            <Layers className="h-4 w-4 mr-2" />
            New Survey
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-cegal p-6 bg-cegal-darker border-cegal-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Layers className="h-6 w-6 text-cegal-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-cegal-gray-600">Total Surveys</p>
              <p className="text-2xl font-bold text-cegal-green">{mockSeismicData.length}</p>
            </div>
          </div>
        </div>
        <div className="card-cegal p-6 bg-cegal-darker border-cegal-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-cegal-gray-600">Active</p>
              <p className="text-2xl font-bold text-cegal-green">
                {mockSeismicData.filter(s => s.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card-cegal p-6 bg-cegal-darker border-cegal-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-cegal-gray-600">Processing</p>
              <p className="text-2xl font-bold text-cegal-green">
                {mockSeismicData.filter(s => s.status === 'processing').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card-cegal p-6 bg-cegal-darker border-cegal-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <HardDrive className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-cegal-gray-600">Total Size</p>
              <p className="text-2xl font-bold text-cegal-green">
                {formatBytes(mockSeismicData.reduce((sum, s) => sum + s.sizeBytes, 0))}
              </p>
            </div>
          </div>
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
                placeholder="Search seismic surveys..."
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
              <option value="2D">2D Seismic</option>
              <option value="3D">3D Seismic</option>
              <option value="4D">4D Seismic</option>
              <option value="VSP">VSP</option>
            </select>
            
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {selectedItems.length > 0 && (
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <p className="text-sm font-medium text-blue-900">
                {selectedItems.length} survey(s) selected
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
                    className="rounded border-gray-300 text-cegal-primary focus:ring-cegal-primary"
                  />
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-cegal-gray-500">Survey</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-cegal-gray-500">Type</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-cegal-gray-500">Location</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-cegal-gray-500">Size</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-cegal-gray-500">Quality</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-cegal-gray-500">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-cegal-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cegal-gray-700">
              {filteredData.map((survey) => {
                const StatusIcon = getStatusIcon(survey.status);
                return (
                  <tr key={survey.id} className={`hover:bg-cegal-gray-800 transition-colors ${
                    selectedItems.includes(survey.id) ? 'bg-blue-50' : ''
                  }`}>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(survey.id)}
                        onChange={() => handleSelectItem(survey.id)}
                        className="rounded border-gray-300 text-cegal-primary focus:ring-cegal-primary"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-white">{survey.name}</p>
                        <p className="text-xs text-cegal-gray-500">{survey.contractor} • {survey.vessel}</p>
                        <p className="text-xs text-cegal-gray-500">Area: {survey.area}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${getSurveyTypeColor(survey.surveyType)}`}>
                        {survey.surveyType}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-cegal-gray-400" />
                        <span className="text-sm text-white">{survey.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-white">{survey.size}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              survey.quality >= 90 ? 'bg-green-500' :
                              survey.quality >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${survey.quality}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-white">{survey.quality}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center space-x-2 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(survey.status)}`}>
                        <StatusIcon className="h-3 w-3" />
                        <span className="capitalize">{survey.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-gray-400 hover:text-cegal-primary transition-colors" title="View Details">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-cegal-primary transition-colors" title="Download">
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
            <Layers className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No seismic surveys found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeismicData;