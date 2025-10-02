import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { Database, Calendar, Folder, HardDrive, BarChart3, RefreshCw } from 'lucide-react';
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
}

interface FieldStats {
  field: string;
  intersectModels: number;
  standaloneModels: number;
  cmgModels: number;
}

const ReservoirSimulation: React.FC = () => {
  const [selectedField, setSelectedField] = useState('All');

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
      coordinates: [58.3, 1.9]
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
      coordinates: [58.4, 1.8]
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
      coordinates: [58.35, 1.85]
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
      coordinates: [65.9, 8.1]
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
      coordinates: [65.95, 8.05]
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
      coordinates: [60.5, 2.3]
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
      coordinates: [58.42, 1.82]
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
      coordinates: [58.32, 1.92]
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
      coordinates: [65.88, 8.12]
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
      coordinates: [58.38, 1.87]
    }
  ];

  const fields = ['All', ...Array.from(new Set(simulationModels.map(m => m.field)))];

  const filteredModels = selectedField === 'All'
    ? simulationModels
    : simulationModels.filter(m => m.field === selectedField);

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
        <button className="btn-cegal-secondary flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          <span>Refresh</span>
        </button>
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