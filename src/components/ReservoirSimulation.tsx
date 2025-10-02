import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { Database, Calendar, Folder, HardDrive, BarChart3, RefreshCw, TrendingUp, Droplets, Gauge, Search, Tag, Archive, Trash2, FolderOpen, Check } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

interface SimulationModel {
  id: string;
  field: string;
  projectName: string;
  classification: string;
  lastModified: string;
  modelPath: string;
  sizeGB: number;
  models: number;
  fieldFailed: string;
  coordinates?: [number, number];
  giip?: number;
  stoiip?: number;
  recoveryFactor?: number;
  activeWells?: number;
  productionRate?: number;
  tags?: string[];
  archived?: boolean;
}

interface FieldStats {
  field: string;
  intersectModels: number;
  standaloneModels: number;
  cmgModels: number;
}

interface ProductionData {
  year: number;
  oil: number;
  gas: number;
  water: number;
  cumOil: number;
  cumGas: number;
}

const ReservoirSimulation: React.FC = () => {
  const [selectedField, setSelectedField] = useState('All');
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModels, setSelectedModels] = useState<Set<string>>(new Set());
  const [showTagInput, setShowTagInput] = useState<string | null>(null);
  const [newTag, setNewTag] = useState('');
  const [modelTags, setModelTags] = useState<{ [key: string]: string[] }>({});
  const [archivedModels, setArchivedModels] = useState<Set<string>>(new Set());
  const [showArchived, setShowArchived] = useState(false);

  const simulationModels: SimulationModel[] = [
    {
      id: '1',
      field: 'SLEIPNER',
      projectName: 'integrated_project.snp',
      classification: 'Sim model in iNav project',
      lastModified: '2025-04-28 17:48:00',
      modelPath: 'D:\\RE\\run_iX\\Examples\\Brine_MultipleComponent.afi',
      sizeGB: 0.01,
      models: 1,
      fieldFailed: 'Volve',
      coordinates: [58.3, 1.9],
      giip: 450.5,
      stoiip: 125.3,
      recoveryFactor: 42.5,
      activeWells: 8,
      productionRate: 12500
    },
    {
      id: '2',
      field: 'VOLVE',
      projectName: 'integrated_project.snp',
      classification: 'Standalone Eclipse model',
      lastModified: '2025-04-28 19:52:00',
      modelPath: 'D:\\RE\\Norway\\Equinor_Volve\\Reservoir_Model\\Volve.DATA',
      sizeGB: 0.04,
      models: 3,
      fieldFailed: 'Volve',
      coordinates: [58.4, 1.8],
      giip: 320.8,
      stoiip: 85.4,
      recoveryFactor: 38.2,
      activeWells: 12,
      productionRate: 18300
    },
    {
      id: '3',
      field: 'VOLVE',
      projectName: 'integrated_project.snp',
      classification: 'Standalone Eclipse model',
      lastModified: '2025-04-28 19:49:00',
      modelPath: 'D:\\RE\\Norway\\Equinor_Volve\\Reservoir_Model\\Volve_2.DATA',
      sizeGB: 0.03,
      models: 1,
      fieldFailed: 'Volve',
      coordinates: [58.35, 1.85],
      giip: 298.2,
      stoiip: 78.6,
      recoveryFactor: 35.8,
      activeWells: 10,
      productionRate: 16200
    },
    {
      id: '4',
      field: 'NORNE',
      projectName: 'integrated_project.snp',
      classification: 'Sim model in HiM project',
      lastModified: '2022-11-29 14:23:00',
      modelPath: 'D:\\RE\\Navigator\\iNavigator\\Examples\\NORNE.snp',
      sizeGB: 0.04,
      models: 2,
      fieldFailed: 'Volve',
      coordinates: [65.9, 8.1],
      giip: 580.3,
      stoiip: 156.7,
      recoveryFactor: 45.2,
      activeWells: 15,
      productionRate: 22400
    },
    {
      id: '5',
      field: 'NORNE',
      projectName: 'integrated_project.snp',
      classification: 'Sim model in iNav project',
      lastModified: '2022-11-29 21:54:00',
      modelPath: 'D:\\RE\\Navigator\\AllInNavigator\\NetworkTheory\\integrated_project.snp',
      sizeGB: 0.01,
      models: 1,
      fieldFailed: 'Volve',
      coordinates: [65.95, 8.05],
      giip: 612.5,
      stoiip: 168.3,
      recoveryFactor: 47.8,
      activeWells: 18,
      productionRate: 24800
    },
    {
      id: '6',
      field: 'SMEAHEIA',
      projectName: 'integrated_project.snp',
      classification: 'Sim model in HiM project',
      lastModified: '2022-11-29 17:32:00',
      modelPath: 'D:\\RE\\Navigator\\SMEAHEIA\\integrated_project.snp',
      sizeGB: 0.03,
      models: 1,
      fieldFailed: 'Volve',
      coordinates: [60.5, 2.3],
      giip: 380.4,
      stoiip: 95.2,
      recoveryFactor: 40.5,
      activeWells: 9,
      productionRate: 14600
    },
    {
      id: '7',
      field: 'VOLVE',
      projectName: 'integrated_project.snp',
      classification: 'Standalone Eclipse model',
      lastModified: '2022-11-29 18:45:00',
      modelPath: 'D:\\RE\\Norway\\Equinor_Volve\\Reservoir_Model\\Volve_3.DATA',
      sizeGB: 0.01,
      models: 1,
      fieldFailed: 'Volve',
      coordinates: [58.42, 1.82],
      giip: 310.6,
      stoiip: 82.1,
      recoveryFactor: 36.9,
      activeWells: 11,
      productionRate: 17100
    },
    {
      id: '8',
      field: 'SLEIPNER',
      projectName: 'Final project 2017.snp',
      classification: 'Sim model in iNav project',
      lastModified: '2016-04-29 07:16:00',
      modelPath: 'D:\\RE\\CMG\\Final project-20170409T230151Z-001\\Final project.snp',
      sizeGB: 0.02,
      models: 1,
      fieldFailed: 'SLEIPNER',
      coordinates: [58.32, 1.92],
      giip: 425.7,
      stoiip: 118.9,
      recoveryFactor: 41.2,
      activeWells: 7,
      productionRate: 11800
    },
    {
      id: '9',
      field: 'NORNE',
      projectName: 'NORNE_ATW2013.DATA',
      classification: 'Standalone Eclipse model',
      lastModified: '2022-11-29 15:12:00',
      modelPath: 'D:\\RE\\Norway\\Norne\\NORNE_ATW2013.DATA',
      sizeGB: 0.05,
      models: 1,
      fieldFailed: 'NORNE',
      coordinates: [65.88, 8.12],
      giip: 595.8,
      stoiip: 162.4,
      recoveryFactor: 46.5,
      activeWells: 16,
      productionRate: 23600
    },
    {
      id: '10',
      field: 'VOLVE',
      projectName: 'Volve_Field_Model.DATA',
      classification: 'Standalone Eclipse model',
      lastModified: '2022-11-29 16:28:00',
      modelPath: 'D:\\RE\\Norway\\Equinor_Volve\\Reservoir_Model\\Volve_Field_Model.DATA',
      sizeGB: 0.06,
      models: 1,
      fieldFailed: 'Volve',
      coordinates: [58.38, 1.87],
      giip: 335.2,
      stoiip: 89.7,
      recoveryFactor: 39.4,
      activeWells: 13,
      productionRate: 19200
    }
  ];

  const productionProfiles: ProductionData[] = [
    { year: 2015, oil: 5200, gas: 12400, water: 1800, cumOil: 5200, cumGas: 12400 },
    { year: 2016, oil: 8500, gas: 18200, water: 2400, cumOil: 13700, cumGas: 30600 },
    { year: 2017, oil: 12300, gas: 24800, water: 3200, cumOil: 26000, cumGas: 55400 },
    { year: 2018, oil: 15800, gas: 32600, water: 4800, cumOil: 41800, cumGas: 88000 },
    { year: 2019, oil: 18400, gas: 38200, water: 6200, cumOil: 60200, cumGas: 126200 },
    { year: 2020, oil: 19800, gas: 42400, water: 7800, cumOil: 80000, cumGas: 168600 },
    { year: 2021, oil: 20600, gas: 45600, water: 9600, cumOil: 100600, cumGas: 214200 },
    { year: 2022, oil: 19200, gas: 43800, water: 11400, cumOil: 119800, cumGas: 258000 },
    { year: 2023, oil: 17400, gas: 40200, water: 13200, cumOil: 137200, cumGas: 298200 },
    { year: 2024, oil: 15200, gas: 36800, water: 15100, cumOil: 152400, cumGas: 335000 },
    { year: 2025, oil: 13100, gas: 32600, water: 16800, cumOil: 165500, cumGas: 367600 },
  ];

  const fields = ['All', ...Array.from(new Set(simulationModels.map(m => m.field)))];

  const toggleModelSelection = (modelId: string) => {
    const newSelection = new Set(selectedModels);
    if (newSelection.has(modelId)) {
      newSelection.delete(modelId);
    } else {
      newSelection.add(modelId);
    }
    setSelectedModels(newSelection);
  };

  const selectAllModels = () => {
    const allModelIds = simulationModels
      .filter(m => !archivedModels.has(m.id))
      .map(m => m.id);
    setSelectedModels(new Set(allModelIds));
  };

  const deselectAllModels = () => {
    setSelectedModels(new Set());
  };

  const addTag = (modelId: string, tag: string) => {
    if (tag.trim()) {
      setModelTags(prev => ({
        ...prev,
        [modelId]: [...(prev[modelId] || []), tag.trim()]
      }));
      setNewTag('');
      setShowTagInput(null);
    }
  };

  const removeTag = (modelId: string, tagToRemove: string) => {
    setModelTags(prev => ({
      ...prev,
      [modelId]: (prev[modelId] || []).filter(t => t !== tagToRemove)
    }));
  };

  const archiveSelected = () => {
    const newArchived = new Set(archivedModels);
    selectedModels.forEach(id => newArchived.add(id));
    setArchivedModels(newArchived);
    setSelectedModels(new Set());
  };

  const deleteSelected = () => {
    if (window.confirm(`Delete ${selectedModels.size} selected model(s)?`)) {
      setSelectedModels(new Set());
    }
  };

  const filteredModels = simulationModels
    .filter(m => {
      if (!showArchived && archivedModels.has(m.id)) return false;
      if (selectedField !== 'All' && m.field !== selectedField) return false;
      if (searchQuery) {
        const search = searchQuery.toLowerCase();
        const matchesSearch =
          m.field.toLowerCase().includes(search) ||
          m.projectName.toLowerCase().includes(search) ||
          m.classification.toLowerCase().includes(search) ||
          m.modelPath.toLowerCase().includes(search) ||
          (modelTags[m.id] || []).some(tag => tag.toLowerCase().includes(search));
        if (!matchesSearch) return false;
      }
      return true;
    });

  const selectedModel = selectedModelId
    ? simulationModels.find(m => m.id === selectedModelId)
    : null;

  const visualizationModels = selectedModel ? [selectedModel] : filteredModels;

  const getFieldStats = (): FieldStats[] => {
    const fieldMap = new Map<string, FieldStats>();

    fields.filter(f => f !== 'All').forEach(field => {
      const fieldModels = simulationModels.filter(m => m.field === field);
      const intersect = fieldModels.filter(m => m.classification.includes('iNav')).length;
      const standalone = fieldModels.filter(m => m.classification.includes('Standalone')).length;
      const cmg = fieldModels.filter(m => m.classification.includes('CMG')).length;

      fieldMap.set(field, {
        field,
        intersectModels: intersect,
        standaloneModels: standalone,
        cmgModels: cmg
      });
    });

    return Array.from(fieldMap.values());
  };

  const fieldStats = getFieldStats();

  const totalIntersect = simulationModels.filter(m => m.classification.includes('iNav')).length;
  const totalStandalone = simulationModels.filter(m => m.classification.includes('Standalone')).length;
  const totalCMG = simulationModels.filter(m => m.classification.includes('CMG')).length;
  const totalDiskSpace = simulationModels.reduce((sum, m) => sum + m.sizeGB, 0);

  const fieldDistribution = fieldStats.map(fs => ({
    field: fs.field,
    total: fs.intersectModels + fs.standaloneModels + fs.cmgModels
  }));

  const maxFieldCount = Math.max(...fieldDistribution.map(f => f.total), 1);

  const getFieldColor = (field: string) => {
    const colors: { [key: string]: string } = {
      'VOLVE': '#00D9FF',
      'NORNE': '#00FF94',
      'SLEIPNER': '#FF6B9D',
      'SMEAHEIA': '#FFB800'
    };
    return colors[field] || '#00D9FF';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <Database className="h-6 w-6 text-cegal-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              RE <span className="text-cegal-primary">Simulation Model</span> Tracker
            </h2>
            <p className="text-sm text-cegal-gray-400">Reservoir simulation model management and tracking</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowArchived(!showArchived)}
            className={`btn-cegal-secondary flex items-center gap-2 ${showArchived ? 'bg-cegal-primary/20' : ''}`}
          >
            <Archive className="h-4 w-4" />
            <span>{showArchived ? 'Hide' : 'Show'} Archived</span>
          </button>
          <button className="btn-cegal-secondary flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <div className="bg-cegal-darker border border-cegal-gray-700 rounded-lg p-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cegal-gray-400" />
            <input
              type="text"
              placeholder="Search models by field, project, classification, path, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent bg-cegal-dark text-white"
            />
          </div>
          {selectedModels.size > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-cegal-gray-400">{selectedModels.size} selected</span>
              <button
                onClick={archiveSelected}
                className="btn-cegal-secondary flex items-center gap-2"
              >
                <Archive className="h-4 w-4" />
                Archive
              </button>
              <button
                onClick={deleteSelected}
                className="btn-cegal-secondary flex items-center gap-2 hover:bg-red-500/20 hover:border-red-500"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
              <button
                onClick={deselectAllModels}
                className="btn-cegal-secondary"
              >
                Clear
              </button>
            </div>
          )}
          {selectedModels.size === 0 && (
            <button
              onClick={selectAllModels}
              className="btn-cegal-secondary"
            >
              Select All
            </button>
          )}
        </div>

        <div className="max-h-96 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-cegal-darker z-10">
              <tr className="border-b border-cegal-gray-700">
                <th className="text-left py-3 px-2 text-cegal-gray-400 font-medium">
                  <input
                    type="checkbox"
                    checked={selectedModels.size === filteredModels.length && filteredModels.length > 0}
                    onChange={(e) => e.target.checked ? selectAllModels() : deselectAllModels()}
                    className="rounded border-cegal-gray-600"
                  />
                </th>
                <th className="text-left py-3 px-2 text-cegal-gray-400 font-medium">Field</th>
                <th className="text-left py-3 px-2 text-cegal-gray-400 font-medium">Project Name</th>
                <th className="text-left py-3 px-2 text-cegal-gray-400 font-medium">Classification</th>
                <th className="text-left py-3 px-2 text-cegal-gray-400 font-medium">STOIIP</th>
                <th className="text-left py-3 px-2 text-cegal-gray-400 font-medium">Recovery %</th>
                <th className="text-left py-3 px-2 text-cegal-gray-400 font-medium">Wells</th>
                <th className="text-left py-3 px-2 text-cegal-gray-400 font-medium">Tags</th>
                <th className="text-left py-3 px-2 text-cegal-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredModels.map(model => (
                <tr
                  key={model.id}
                  className={`border-b border-cegal-gray-800 hover:bg-cegal-gray-800/30 cursor-pointer ${
                    selectedModelId === model.id ? 'bg-cegal-primary/10' : ''
                  } ${archivedModels.has(model.id) ? 'opacity-50' : ''}`}
                  onClick={() => setSelectedModelId(selectedModelId === model.id ? null : model.id)}
                >
                  <td className="py-3 px-2" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedModels.has(model.id)}
                      onChange={() => toggleModelSelection(model.id)}
                      className="rounded border-cegal-gray-600"
                    />
                  </td>
                  <td className="py-3 px-2">
                    <span
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{ backgroundColor: `${getFieldColor(model.field)}20`, color: getFieldColor(model.field) }}
                    >
                      {model.field}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-white">{model.projectName}</td>
                  <td className="py-3 px-2 text-cegal-gray-300 text-xs">{model.classification}</td>
                  <td className="py-3 px-2 text-white">{model.stoiip?.toFixed(1)} MMbbl</td>
                  <td className="py-3 px-2 text-white">{model.recoveryFactor?.toFixed(1)}%</td>
                  <td className="py-3 px-2 text-white">{model.activeWells}</td>
                  <td className="py-3 px-2" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-1 flex-wrap">
                      {(modelTags[model.id] || []).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-cegal-primary/20 text-cegal-primary rounded text-xs flex items-center gap-1"
                        >
                          {tag}
                          <button
                            onClick={() => removeTag(model.id, tag)}
                            className="hover:text-red-400"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      {showTagInput === model.id ? (
                        <input
                          type="text"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') addTag(model.id, newTag);
                            if (e.key === 'Escape') setShowTagInput(null);
                          }}
                          onBlur={() => {
                            if (newTag.trim()) addTag(model.id, newTag);
                            setShowTagInput(null);
                          }}
                          placeholder="Tag name..."
                          className="px-2 py-0.5 bg-cegal-dark border border-cegal-gray-600 rounded text-xs w-24"
                          autoFocus
                        />
                      ) : (
                        <button
                          onClick={() => setShowTagInput(model.id)}
                          className="p-1 hover:bg-cegal-gray-700 rounded"
                        >
                          <Tag className="h-3 w-3 text-cegal-gray-400" />
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-2" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-2">
                      {archivedModels.has(model.id) ? (
                        <button
                          onClick={() => {
                            const newArchived = new Set(archivedModels);
                            newArchived.delete(model.id);
                            setArchivedModels(newArchived);
                          }}
                          className="p-1 hover:bg-cegal-gray-700 rounded"
                          title="Restore"
                        >
                          <FolderOpen className="h-4 w-4 text-cegal-gray-400" />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            const newArchived = new Set(archivedModels);
                            newArchived.add(model.id);
                            setArchivedModels(newArchived);
                          }}
                          className="p-1 hover:bg-cegal-gray-700 rounded"
                          title="Archive"
                        >
                          <Archive className="h-4 w-4 text-cegal-gray-400" />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete model ${model.projectName}?`)) {
                            console.log('Delete model:', model.id);
                          }
                        }}
                        className="p-1 hover:bg-red-500/20 rounded"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4 text-cegal-gray-400 hover:text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedModelId && selectedModel && (
          <div className="mt-4 p-4 bg-cegal-dark border border-cegal-primary/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <Check className="h-4 w-4 text-cegal-primary" />
                Selected Model: {selectedModel.projectName}
              </h4>
              <button
                onClick={() => setSelectedModelId(null)}
                className="text-cegal-gray-400 hover:text-white"
              >
                Clear Selection
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-cegal-gray-400">Field:</span>
                <span className="ml-2 text-white">{selectedModel.field}</span>
              </div>
              <div>
                <span className="text-cegal-gray-400">GIIP:</span>
                <span className="ml-2 text-white">{selectedModel.giip?.toFixed(1)} BCF</span>
              </div>
              <div>
                <span className="text-cegal-gray-400">STOIIP:</span>
                <span className="ml-2 text-white">{selectedModel.stoiip?.toFixed(1)} MMbbl</span>
              </div>
              <div>
                <span className="text-cegal-gray-400">Production Rate:</span>
                <span className="ml-2 text-white">{selectedModel.productionRate?.toLocaleString()} bbl/d</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-cegal-darker border border-cegal-gray-700 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <Folder className="h-5 w-5 text-cegal-primary" />
              <h3 className="text-lg font-semibold text-white">Field</h3>
            </div>
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="w-full px-3 py-2 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent bg-cegal-dark text-white"
            >
              {fields.map(field => (
                <option key={field} value={field}>{field}</option>
              ))}
            </select>
          </div>

          <div className="bg-cegal-darker border border-cegal-gray-700 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-white mb-4">iNavigator Projects with Models</h3>
            <div className="text-center mb-4">
              <div className="text-5xl font-bold text-cegal-primary">6</div>
            </div>

            <div className="mb-4">
              <div className="text-sm font-medium text-white mb-2">HiM Project in iNavigator Project (Blank)</div>
            </div>

            <div className="space-y-2 mb-4">
              <h4 className="text-sm font-semibold text-cegal-gray-400">iNavigator Models</h4>
              <div className="text-2xl font-bold text-white">10</div>
            </div>

            <div className="bg-cegal-dark rounded-lg p-3">
              <h4 className="text-xs font-semibold text-cegal-gray-400 mb-2">Disk Storage (GB)</h4>
              <div className="text-xl font-bold text-white">{totalDiskSpace.toFixed(2)}</div>
            </div>
          </div>

          <div className="bg-cegal-darker border border-cegal-gray-700 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-cegal-gray-400 mb-4">Field Distribution</h3>
            <div className="relative h-48 flex items-center justify-center">
              <svg width="180" height="180" viewBox="0 0 180 180">
                {fieldDistribution.map((field, index) => {
                  const total = fieldDistribution.reduce((sum, f) => sum + f.total, 0);
                  let currentAngle = -90;

                  for (let i = 0; i < index; i++) {
                    currentAngle += (fieldDistribution[i].total / total) * 360;
                  }

                  const angle = (field.total / total) * 360;
                  const startAngle = (currentAngle * Math.PI) / 180;
                  const endAngle = ((currentAngle + angle) * Math.PI) / 180;

                  const startX = 90 + 70 * Math.cos(startAngle);
                  const startY = 90 + 70 * Math.sin(startAngle);
                  const endX = 90 + 70 * Math.cos(endAngle);
                  const endY = 90 + 70 * Math.sin(endAngle);

                  const largeArcFlag = angle > 180 ? 1 : 0;

                  const pathData = [
                    `M 90 90`,
                    `L ${startX} ${startY}`,
                    `A 70 70 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                    'Z'
                  ].join(' ');

                  return (
                    <path
                      key={field.field}
                      d={pathData}
                      fill={getFieldColor(field.field)}
                      opacity="0.8"
                    />
                  );
                })}
              </svg>
            </div>
            <div className="mt-4 space-y-2">
              {fieldDistribution.map(field => (
                <div key={field.field} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getFieldColor(field.field) }}
                    />
                    <span className="text-cegal-gray-300">{field.field}</span>
                  </div>
                  <span className="text-white font-medium">{((field.total / simulationModels.length) * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-cegal-darker border border-cegal-gray-700 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-white mb-4">Model Locations</h3>
            <div className="h-[400px] rounded-lg overflow-hidden border border-cegal-gray-700">
              <MapContainer
                center={[60.0, 5.0]}
                zoom={5}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'
                />
                {filteredModels.filter(m => m.coordinates).map(model => (
                  <CircleMarker
                    key={model.id}
                    center={model.coordinates!}
                    radius={8}
                    pathOptions={{
                      fillColor: getFieldColor(model.field),
                      color: getFieldColor(model.field),
                      weight: 2,
                      opacity: 1,
                      fillOpacity: 0.8
                    }}
                  >
                    <Popup>
                      <div className="text-sm">
                        <div className="font-semibold">{model.field}</div>
                        <div className="text-xs text-gray-600">{model.projectName}</div>
                        <div className="text-xs text-gray-600">{model.models} model(s)</div>
                      </div>
                    </Popup>
                  </CircleMarker>
                ))}
              </MapContainer>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-5 w-5 text-blue-400" />
                <span className="text-sm text-cegal-gray-400">Intersect Models</span>
              </div>
              <div className="text-3xl font-bold text-white">{totalIntersect}</div>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/20 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-2">
                <Database className="h-5 w-5 text-cyan-400" />
                <span className="text-sm text-cegal-gray-400">Standalone Models</span>
              </div>
              <div className="text-3xl font-bold text-white">{totalStandalone}</div>
            </div>

            <div className="bg-gradient-to-br from-pink-500/10 to-pink-600/5 border border-pink-500/20 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-2">
                <HardDrive className="h-5 w-5 text-pink-400" />
                <span className="text-sm text-cegal-gray-400">CMG Models</span>
              </div>
              <div className="text-3xl font-bold text-white">{totalCMG}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-cegal-darker border border-cegal-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-cegal-primary" />
            <h3 className="text-xl font-bold text-white">
              Reservoir Parameters & Production Analytics
              {selectedModelId && <span className="text-cegal-primary ml-2">(Selected Model)</span>}
            </h3>
          </div>
          {selectedModelId && (
            <button
              onClick={() => setSelectedModelId(null)}
              className="text-sm text-cegal-gray-400 hover:text-white"
            >
              View All Models
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="h-5 w-5 text-emerald-400" />
              <span className="text-sm text-cegal-gray-400">{selectedModelId ? 'GIIP' : 'Total GIIP'}</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {visualizationModels.reduce((sum, m) => sum + (m.giip || 0), 0).toFixed(1)}
              <span className="text-sm text-cegal-gray-400 ml-2">BCF</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Database className="h-5 w-5 text-blue-400" />
              <span className="text-sm text-cegal-gray-400">{selectedModelId ? 'STOIIP' : 'Total STOIIP'}</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {visualizationModels.reduce((sum, m) => sum + (m.stoiip || 0), 0).toFixed(1)}
              <span className="text-sm text-cegal-gray-400 ml-2">MMbbl</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Gauge className="h-5 w-5 text-amber-400" />
              <span className="text-sm text-cegal-gray-400">{selectedModelId ? 'Recovery Factor' : 'Avg Recovery Factor'}</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {visualizationModels.length > 0
                ? (visualizationModels.reduce((sum, m) => sum + (m.recoveryFactor || 0), 0) / visualizationModels.length).toFixed(1)
                : '0.0'}
              <span className="text-sm text-cegal-gray-400 ml-2">%</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-5 w-5 text-cyan-400" />
              <span className="text-sm text-cegal-gray-400">Active Wells</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {visualizationModels.reduce((sum, m) => sum + (m.activeWells || 0), 0)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-cegal-dark rounded-lg p-5 border border-cegal-gray-700">
            <h4 className="text-sm font-semibold text-white mb-4">Production Rates by Field</h4>
            <div className="h-64">
              {visualizationModels.filter(m => m.productionRate).map((model, idx) => {
                const maxRate = Math.max(...visualizationModels.map(m => m.productionRate || 0));
                const barWidth = ((model.productionRate || 0) / maxRate) * 100;
                return (
                  <div key={model.id} className="mb-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-cegal-gray-400">{model.field} - {model.projectName.substring(0, 15)}...</span>
                      <span className="text-white font-medium">{(model.productionRate || 0).toLocaleString()} bbl/d</span>
                    </div>
                    <div className="w-full bg-cegal-gray-800 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${barWidth}%`,
                          backgroundColor: getFieldColor(model.field)
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-cegal-dark rounded-lg p-5 border border-cegal-gray-700">
            <h4 className="text-sm font-semibold text-white mb-4">Recovery Factor Distribution</h4>
            <div className="h-64 flex items-end justify-between gap-2">
              {visualizationModels.filter(m => m.recoveryFactor).slice(0, 8).map((model, idx) => {
                const maxRF = Math.max(...visualizationModels.map(m => m.recoveryFactor || 0));
                const barHeight = ((model.recoveryFactor || 0) / maxRF) * 100;
                return (
                  <div key={model.id} className="flex-1 flex flex-col items-center">
                    <div className="text-xs text-white font-medium mb-1">
                      {(model.recoveryFactor || 0).toFixed(1)}%
                    </div>
                    <div
                      className="w-full rounded-t transition-all duration-500"
                      style={{
                        height: `${barHeight}%`,
                        backgroundColor: getFieldColor(model.field),
                        minHeight: '20px'
                      }}
                    />
                    <div className="text-xs text-cegal-gray-400 mt-1 transform -rotate-45 origin-top-left whitespace-nowrap">
                      {model.field}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
          <div className="bg-cegal-dark rounded-lg p-5 border border-cegal-gray-700">
            <h4 className="text-sm font-semibold text-white mb-4">Production Profile (Annual Rates)</h4>
            <div className="h-72">
              <div className="flex items-end justify-between h-full gap-1">
                {productionProfiles.map((data, idx) => {
                  const maxProduction = Math.max(...productionProfiles.map(p => p.oil + p.gas + p.water));
                  const oilHeight = (data.oil / maxProduction) * 100;
                  const gasHeight = (data.gas / maxProduction) * 100;
                  const waterHeight = (data.water / maxProduction) * 100;

                  return (
                    <div key={data.year} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-cegal-darker border border-cegal-gray-700 rounded px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        <div>Oil: {data.oil.toLocaleString()}</div>
                        <div>Gas: {data.gas.toLocaleString()}</div>
                        <div>Water: {data.water.toLocaleString()}</div>
                      </div>
                      <div className="w-full flex flex-col gap-0.5">
                        <div
                          className="w-full bg-emerald-500 rounded-t"
                          style={{ height: `${oilHeight}%`, minHeight: '2px' }}
                        />
                        <div
                          className="w-full bg-blue-500"
                          style={{ height: `${gasHeight}%`, minHeight: '2px' }}
                        />
                        <div
                          className="w-full bg-cyan-500"
                          style={{ height: `${waterHeight}%`, minHeight: '2px' }}
                        />
                      </div>
                      <div className="text-xs text-cegal-gray-400 mt-1 transform -rotate-45 origin-top-left">
                        {data.year}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-center gap-4 mt-8">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded" />
                  <span className="text-xs text-cegal-gray-400">Oil</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded" />
                  <span className="text-xs text-cegal-gray-400">Gas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-cyan-500 rounded" />
                  <span className="text-xs text-cegal-gray-400">Water</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cegal-dark rounded-lg p-5 border border-cegal-gray-700">
            <h4 className="text-sm font-semibold text-white mb-4">Cumulative Production</h4>
            <div className="h-72 relative">
              <svg width="100%" height="100%" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="oilGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="gasGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {productionProfiles.map((data, idx) => {
                  if (idx === 0) return null;
                  const prevData = productionProfiles[idx - 1];
                  const x1 = (idx - 1) * (380 / (productionProfiles.length - 1)) + 10;
                  const x2 = idx * (380 / (productionProfiles.length - 1)) + 10;
                  const maxCum = Math.max(...productionProfiles.map(p => Math.max(p.cumOil, p.cumGas)));
                  const y1Oil = 230 - (prevData.cumOil / maxCum) * 220;
                  const y2Oil = 230 - (data.cumOil / maxCum) * 220;
                  const y1Gas = 230 - (prevData.cumGas / maxCum) * 220;
                  const y2Gas = 230 - (data.cumGas / maxCum) * 220;

                  return (
                    <g key={data.year}>
                      <line
                        x1={x1} y1={y1Oil} x2={x2} y2={y2Oil}
                        stroke="#10b981" strokeWidth="3" strokeLinecap="round"
                      />
                      <line
                        x1={x1} y1={y1Gas} x2={x2} y2={y2Gas}
                        stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"
                      />
                      {idx === productionProfiles.length - 1 && (
                        <>
                          <circle cx={x2} cy={y2Oil} r="4" fill="#10b981" />
                          <circle cx={x2} cy={y2Gas} r="4" fill="#3b82f6" />
                        </>
                      )}
                    </g>
                  );
                })}
              </svg>
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                  <span className="text-xs text-cegal-gray-400">Cumulative Oil</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span className="text-xs text-cegal-gray-400">Cumulative Gas</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-cegal-dark rounded-lg p-5 border border-cegal-gray-700 mt-6">
          <h4 className="text-sm font-semibold text-white mb-4">STOIIP vs Recovery Factor Cross-Plot</h4>
          <div className="h-80 relative">
            <svg width="100%" height="100%" viewBox="0 0 500 300" preserveAspectRatio="xMidYMid meet">
              <line x1="50" y1="250" x2="470" y2="250" stroke="#374151" strokeWidth="2" />
              <line x1="50" y1="250" x2="50" y2="30" stroke="#374151" strokeWidth="2" />

              <text x="250" y="285" fill="#9ca3af" fontSize="12" textAnchor="middle">STOIIP (MMbbl)</text>
              <text x="20" y="140" fill="#9ca3af" fontSize="12" textAnchor="middle" transform="rotate(-90 20 140)">Recovery Factor (%)</text>

              {visualizationModels.filter(m => m.stoiip && m.recoveryFactor).map((model, idx) => {
                const maxSTOIIP = Math.max(...visualizationModels.map(m => m.stoiip || 0));
                const maxRF = Math.max(...visualizationModels.map(m => m.recoveryFactor || 0));
                const x = 50 + ((model.stoiip || 0) / maxSTOIIP) * 420;
                const y = 250 - ((model.recoveryFactor || 0) / maxRF) * 220;

                return (
                  <g key={model.id}>
                    <circle
                      cx={x}
                      cy={y}
                      r={selectedModelId ? "12" : "8"}
                      fill={getFieldColor(model.field)}
                      opacity="0.7"
                      className="hover:opacity-100 transition-opacity"
                    />
                  </g>
                );
              })}
            </svg>
            <div className="flex items-center justify-center gap-4 mt-2">
              {Array.from(new Set(visualizationModels.map(m => m.field))).map(field => (
                <div key={field} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getFieldColor(field) }}
                  />
                  <span className="text-xs text-cegal-gray-400">{field}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-cegal-darker border border-cegal-gray-700 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              Intersect Models: <span className="text-cegal-primary">{totalIntersect}</span>
            </h3>
            <div className="flex items-center gap-2 text-xs">
              <div className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded">INTERSECT</div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-cegal-gray-700">
                  <th className="text-left py-3 px-2 text-cegal-gray-400 font-medium">Field</th>
                  <th className="text-left py-3 px-2 text-cegal-gray-400 font-medium">Last Modified</th>
                  <th className="text-left py-3 px-2 text-cegal-gray-400 font-medium">Intersect Model Path</th>
                </tr>
              </thead>
              <tbody>
                {filteredModels.filter(m => m.classification.includes('iNav')).map(model => (
                  <tr key={model.id} className="border-b border-cegal-gray-800 hover:bg-cegal-gray-800/30">
                    <td className="py-3 px-2">
                      <span
                        className="px-2 py-1 rounded text-xs font-medium"
                        style={{ backgroundColor: `${getFieldColor(model.field)}20`, color: getFieldColor(model.field) }}
                      >
                        {model.field}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-white">{model.lastModified}</td>
                    <td className="py-3 px-2 text-cegal-gray-300 font-mono text-xs truncate max-w-xs">
                      {model.modelPath}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-cegal-darker border border-cegal-gray-700 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              Standalone Models: <span className="text-cegal-primary">{totalStandalone}</span>
            </h3>
            <div className="flex items-center gap-2 text-xs">
              <div className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded">ECLIPSE</div>
              <div className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded">iNavigator</div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-cegal-gray-700">
                  <th className="text-left py-3 px-2 text-cegal-gray-400 font-medium">Field</th>
                  <th className="text-left py-3 px-2 text-cegal-gray-400 font-medium">Last Modified</th>
                  <th className="text-left py-3 px-2 text-cegal-gray-400 font-medium">Classification</th>
                  <th className="text-left py-3 px-2 text-cegal-gray-400 font-medium">Standalone Model Path</th>
                </tr>
              </thead>
              <tbody>
                {filteredModels.filter(m => m.classification.includes('Standalone')).map(model => (
                  <tr key={model.id} className="border-b border-cegal-gray-800 hover:bg-cegal-gray-800/30">
                    <td className="py-3 px-2">
                      <span
                        className="px-2 py-1 rounded text-xs font-medium"
                        style={{ backgroundColor: `${getFieldColor(model.field)}20`, color: getFieldColor(model.field) }}
                      >
                        {model.field}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-white">{model.lastModified}</td>
                    <td className="py-3 px-2 text-cegal-gray-300 text-xs">{model.classification}</td>
                    <td className="py-3 px-2 text-cegal-gray-300 font-mono text-xs truncate max-w-xs">
                      {model.modelPath}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-cegal-darker border border-cegal-gray-700 rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">
            CMG Models: <span className="text-cegal-primary">{totalCMG}</span>
          </h3>
          <div className="flex items-center gap-2 text-xs">
            <div className="px-2 py-1 bg-pink-500/20 text-pink-400 rounded">SLEIPNER</div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cegal-gray-700">
                <th className="text-left py-3 px-2 text-cegal-gray-400 font-medium">Field</th>
                <th className="text-left py-3 px-2 text-cegal-gray-400 font-medium">Last Modified</th>
                <th className="text-left py-3 px-2 text-cegal-gray-400 font-medium">CMG Model Path</th>
              </tr>
            </thead>
            <tbody>
              {filteredModels.filter(m => m.classification.includes('CMG')).length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-cegal-gray-400">
                    No CMG models found
                  </td>
                </tr>
              ) : (
                filteredModels.filter(m => m.classification.includes('CMG')).map(model => (
                  <tr key={model.id} className="border-b border-cegal-gray-800 hover:bg-cegal-gray-800/30">
                    <td className="py-3 px-2">
                      <span
                        className="px-2 py-1 rounded text-xs font-medium"
                        style={{ backgroundColor: `${getFieldColor(model.field)}20`, color: getFieldColor(model.field) }}
                      >
                        {model.field}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-white">{model.lastModified}</td>
                    <td className="py-3 px-2 text-cegal-gray-300 font-mono text-xs truncate max-w-xs">
                      {model.modelPath}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReservoirSimulation;