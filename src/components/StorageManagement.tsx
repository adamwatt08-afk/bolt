import React, { useState } from 'react';
import {
  HardDrive,
  Users,
  FileType,
  Calendar,
  TrendingUp,
  DollarSign,
  Activity,
  AlertTriangle,
  Zap,
  Clock,
  Database,
  BarChart3,
  PieChart,
  LineChart,
  Filter,
  Settings
} from 'lucide-react';

interface StorageData {
  user: string;
  bu: string;
  totalSize: number;
  fileCount: number;
  lastAccessed: string;
  avgFileAge: number;
  iops: number;
  cost: number;
}

interface FileTypeData {
  type: string;
  size: number;
  count: number;
  percentage: number;
  color: string;
}

interface AnomalyAlert {
  id: string;
  type: string;
  severity: 'high' | 'medium' | 'low';
  message: string;
  timestamp: string;
  affectedUser?: string;
}

const StorageManagement: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'overview' | 'drilldown' | 'performance' | 'cost' | 'forecast'>('overview');
  const [selectedBU, setSelectedBU] = useState('All');
  const [whatIfDedup, setWhatIfDedup] = useState(0);

  const storageData: StorageData[] = [
    { user: 'John.Smith', bu: 'Exploration', totalSize: 2450, fileCount: 12500, lastAccessed: '2025-09-29', avgFileAge: 45, iops: 850, cost: 12250 },
    { user: 'Maria.Garcia', bu: 'Production', totalSize: 1890, fileCount: 8900, lastAccessed: '2025-09-28', avgFileAge: 120, iops: 340, cost: 9450 },
    { user: 'Ahmed.Hassan', bu: 'Exploration', totalSize: 3200, fileCount: 15600, lastAccessed: '2025-09-30', avgFileAge: 30, iops: 1200, cost: 16000 },
    { user: 'Sarah.Johnson', bu: 'Reservoir', totalSize: 1250, fileCount: 6200, lastAccessed: '2025-09-25', avgFileAge: 180, iops: 120, cost: 6250 },
    { user: 'Lars.Andersen', bu: 'Production', totalSize: 890, fileCount: 4500, lastAccessed: '2025-09-20', avgFileAge: 365, iops: 45, cost: 4450 },
    { user: 'Chen.Wei', bu: 'Drilling', totalSize: 2100, fileCount: 10800, lastAccessed: '2025-09-29', avgFileAge: 60, iops: 680, cost: 10500 },
    { user: 'Unknown', bu: 'N/A', totalSize: 450, fileCount: 2200, lastAccessed: '2024-12-15', avgFileAge: 450, iops: 5, cost: 2250 },
  ];

  const fileTypeData: FileTypeData[] = [
    { type: 'Seismic (SEGY)', size: 4500, count: 850, percentage: 35, color: '#00D9FF' },
    { type: 'Well Logs (LAS)', size: 2800, count: 1200, percentage: 22, color: '#00FF94' },
    { type: 'Projects (Petrel)', size: 2100, count: 450, percentage: 16, color: '#FF6B9D' },
    { type: 'Simulation (DATA)', size: 1800, count: 320, percentage: 14, color: '#FFB800' },
    { type: 'Documents (PDF)', size: 900, count: 2500, percentage: 7, color: '#A78BFA' },
    { type: 'Other', size: 800, count: 1800, percentage: 6, color: '#64748B' },
  ];

  const anomalies: AnomalyAlert[] = [
    { id: '1', type: 'Storage Spike', severity: 'high', message: 'Unusual 300% storage growth detected in last 7 days', timestamp: '2025-09-30 14:23', affectedUser: 'Ahmed.Hassan' },
    { id: '2', type: 'Access Surge', severity: 'medium', message: 'Access frequency increased by 150% for seismic data', timestamp: '2025-09-30 10:15' },
    { id: '3', type: 'Orphan Assets', severity: 'medium', message: '450 GB of data with no owner metadata detected', timestamp: '2025-09-29 18:45', affectedUser: 'Unknown' },
    { id: '4', type: 'Dormant Data', severity: 'low', message: '890 GB not accessed in 365+ days', timestamp: '2025-09-29 09:30', affectedUser: 'Lars.Andersen' },
  ];

  const totalStorage = storageData.reduce((sum, user) => sum + user.totalSize, 0);
  const totalFiles = storageData.reduce((sum, user) => sum + user.fileCount, 0);
  const totalCost = storageData.reduce((sum, user) => sum + user.cost, 0);
  const avgIOPS = Math.round(storageData.reduce((sum, user) => sum + user.iops, 0) / storageData.length);

  const activeData = storageData.filter(u => u.avgFileAge < 90).reduce((sum, u) => sum + u.totalSize, 0);
  const dormantData = storageData.filter(u => u.avgFileAge >= 90).reduce((sum, u) => sum + u.totalSize, 0);

  const businessUnits = ['All', ...Array.from(new Set(storageData.map(d => d.bu)))];

  const filteredData = selectedBU === 'All'
    ? storageData
    : storageData.filter(d => d.bu === selectedBU);

  const calculateWhatIf = () => {
    const potentialSavings = totalStorage * (whatIfDedup / 100);
    const newStorage = totalStorage - potentialSavings;
    const costSavings = totalCost * (whatIfDedup / 100);
    return { potentialSavings, newStorage, costSavings };
  };

  const whatIfResults = calculateWhatIf();

  const forecastData = [
    { month: 'Oct', actual: 12900, forecast: 13200 },
    { month: 'Nov', actual: 0, forecast: 13800 },
    { month: 'Dec', actual: 0, forecast: 14500 },
    { month: 'Jan', actual: 0, forecast: 15300 },
    { month: 'Feb', actual: 0, forecast: 16200 },
    { month: 'Mar', actual: 0, forecast: 17100 },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-500 bg-red-500/10 border-red-500/30';
      case 'medium': return 'text-amber-500 bg-amber-500/10 border-amber-500/30';
      case 'low': return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      default: return 'text-cegal-gray-400 bg-cegal-gray-800 border-cegal-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-500/20 to-amber-600/10 border border-amber-500/30 rounded-lg px-4 py-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <span className="text-sm font-semibold text-amber-500">PROTOTYPE</span>
          <span className="text-sm text-cegal-gray-300">This is a demonstration interface with sample data</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <HardDrive className="h-6 w-6 text-cegal-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              VX.x - <span className="text-cegal-primary">pipeline</span>
            </h2>
            <p className="text-lg text-cegal-gray-300 font-medium">Storage management</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedBU}
            onChange={(e) => setSelectedBU(e.target.value)}
            className="px-3 py-2 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent bg-cegal-dark text-white text-sm"
          >
            {businessUnits.map(bu => (
              <option key={bu} value={bu}>{bu === 'All' ? 'All Business Units' : bu}</option>
            ))}
          </select>
          <button className="btn-cegal-secondary flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['overview', 'drilldown', 'performance', 'cost', 'forecast'].map(view => (
          <button
            key={view}
            onClick={() => setSelectedView(view as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              selectedView === view
                ? 'bg-gradient-cegal text-white'
                : 'bg-cegal-gray-800 text-cegal-gray-300 hover:bg-cegal-gray-700'
            }`}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </button>
        ))}
      </div>

      {selectedView === 'overview' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-lg p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-400" />
                  <span className="text-sm text-cegal-gray-400">Total Storage</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{totalStorage.toLocaleString()} GB</div>
              <div className="text-xs text-cegal-gray-400">{totalFiles.toLocaleString()} files</div>
            </div>

            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-lg p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-emerald-400" />
                  <span className="text-sm text-cegal-gray-400">Avg IOPS</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{avgIOPS}</div>
              <div className="text-xs text-cegal-gray-400">Operations/sec</div>
            </div>

            <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-lg p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-amber-400" />
                  <span className="text-sm text-cegal-gray-400">Total Cost</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">${(totalCost / 1000).toFixed(1)}K</div>
              <div className="text-xs text-cegal-gray-400">Monthly estimate</div>
            </div>

            <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-lg p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <span className="text-sm text-cegal-gray-400">Anomalies</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{anomalies.length}</div>
              <div className="text-xs text-cegal-gray-400">{anomalies.filter(a => a.severity === 'high').length} high priority</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-cegal-darker border border-cegal-gray-700 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-4">
                <PieChart className="h-5 w-5 text-cegal-primary" />
                <h3 className="text-lg font-semibold text-white">Storage by File Type</h3>
              </div>

              <div className="relative h-48 flex items-center justify-center mb-6">
                <svg width="180" height="180" viewBox="0 0 180 180">
                  {fileTypeData.map((item, index) => {
                    let currentAngle = -90;
                    for (let i = 0; i < index; i++) {
                      currentAngle += (fileTypeData[i].percentage / 100) * 360;
                    }
                    const angle = (item.percentage / 100) * 360;
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
                    return <path key={item.type} d={pathData} fill={item.color} opacity="0.8" />;
                  })}
                </svg>
              </div>

              <div className="space-y-2">
                {fileTypeData.map(item => (
                  <div key={item.type} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-cegal-gray-300">{item.type}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-cegal-gray-400">{item.size.toLocaleString()} GB</span>
                      <span className="text-white font-medium">{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-cegal-darker border border-cegal-gray-700 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-cegal-primary" />
                <h3 className="text-lg font-semibold text-white">Access Frequency Distribution</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-cegal-gray-300">Active (Last 90 days)</span>
                    <span className="text-sm font-semibold text-white">{activeData.toLocaleString()} GB</span>
                  </div>
                  <div className="w-full bg-cegal-gray-800 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-3 rounded-full"
                      style={{ width: `${(activeData / totalStorage) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-cegal-gray-400 mt-1">
                    {((activeData / totalStorage) * 100).toFixed(1)}% of total storage
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-cegal-gray-300">Dormant (90+ days)</span>
                    <span className="text-sm font-semibold text-white">{dormantData.toLocaleString()} GB</span>
                  </div>
                  <div className="w-full bg-cegal-gray-800 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-amber-400 h-3 rounded-full"
                      style={{ width: `${(dormantData / totalStorage) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-cegal-gray-400 mt-1">
                    {((dormantData / totalStorage) * 100).toFixed(1)}% of total storage
                  </div>
                </div>

                <div className="pt-4 border-t border-cegal-gray-700">
                  <h4 className="text-sm font-semibold text-white mb-3">Platform Distribution</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-cegal-gray-400">Windows Server</span>
                      <span className="text-white font-medium">35%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-cegal-gray-400">Azure Blob Storage</span>
                      <span className="text-white font-medium">28%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-cegal-gray-400">S3 Cloud Storage</span>
                      <span className="text-white font-medium">22%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-cegal-gray-400">Linux (SSH + NFS)</span>
                      <span className="text-white font-medium">15%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cegal-darker border border-cegal-gray-700 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-cegal-primary" />
              <h3 className="text-lg font-semibold text-white">Anomaly Detection</h3>
            </div>

            <div className="space-y-3">
              {anomalies.map(anomaly => (
                <div
                  key={anomaly.id}
                  className={`border rounded-lg p-4 ${getSeverityColor(anomaly.severity)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-semibold uppercase px-2 py-0.5 rounded ${getSeverityColor(anomaly.severity)}`}>
                          {anomaly.severity}
                        </span>
                        <span className="text-sm font-medium text-white">{anomaly.type}</span>
                      </div>
                      <p className="text-sm text-cegal-gray-300 mb-2">{anomaly.message}</p>
                      <div className="flex items-center gap-4 text-xs text-cegal-gray-400">
                        <span>{anomaly.timestamp}</span>
                        {anomaly.affectedUser && <span>User: {anomaly.affectedUser}</span>}
                      </div>
                    </div>
                    <button className="btn-cegal-secondary text-xs px-3 py-1.5">
                      Investigate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {selectedView === 'drilldown' && (
        <div className="space-y-6">
          <div className="bg-cegal-darker border border-cegal-gray-700 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-cegal-primary" />
              <h3 className="text-lg font-semibold text-white">Storage by User, File Type, File Age & Size</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-cegal-gray-700">
                    <th className="text-left py-3 px-2 text-cegal-gray-400 font-medium">User</th>
                    <th className="text-left py-3 px-2 text-cegal-gray-400 font-medium">Business Unit</th>
                    <th className="text-right py-3 px-2 text-cegal-gray-400 font-medium">Total Size</th>
                    <th className="text-right py-3 px-2 text-cegal-gray-400 font-medium">File Count</th>
                    <th className="text-left py-3 px-2 text-cegal-gray-400 font-medium">Last Accessed</th>
                    <th className="text-right py-3 px-2 text-cegal-gray-400 font-medium">Avg Age (days)</th>
                    <th className="text-right py-3 px-2 text-cegal-gray-400 font-medium">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.sort((a, b) => b.totalSize - a.totalSize).map((user, index) => (
                    <tr key={index} className="border-b border-cegal-gray-800 hover:bg-cegal-gray-800/30">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          {user.user === 'Unknown' && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                          <span className="text-white font-medium">{user.user}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                          {user.bu}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right text-white font-medium">{user.totalSize.toLocaleString()} GB</td>
                      <td className="py-3 px-2 text-right text-cegal-gray-300">{user.fileCount.toLocaleString()}</td>
                      <td className="py-3 px-2 text-cegal-gray-300">{user.lastAccessed}</td>
                      <td className="py-3 px-2 text-right">
                        <span className={`px-2 py-1 rounded text-xs ${
                          user.avgFileAge > 180 ? 'bg-red-500/20 text-red-400' :
                          user.avgFileAge > 90 ? 'bg-amber-500/20 text-amber-400' :
                          'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {user.avgFileAge}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right text-white font-medium">${user.cost.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-cegal-darker border border-cegal-gray-700 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-cegal-primary" />
              <h3 className="text-lg font-semibold text-white">Top-N Consumers (Growing Fastest)</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredData
                .filter(u => u.user !== 'Unknown')
                .sort((a, b) => b.totalSize - a.totalSize)
                .slice(0, 3)
                .map((user, index) => (
                  <div key={index} className="bg-cegal-gray-800 border border-cegal-gray-700 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-gradient-cegal rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{user.user}</div>
                        <div className="text-xs text-cegal-gray-400">{user.bu}</div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-cegal-gray-400">Storage:</span>
                        <span className="text-white font-medium">{user.totalSize.toLocaleString()} GB</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-cegal-gray-400">Growth:</span>
                        <span className="text-emerald-400 font-medium">+{(15 - index * 3)}% (30d)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-cegal-gray-400">IOPS:</span>
                        <span className="text-white font-medium">{user.iops}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-cegal-darker border border-cegal-gray-700 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <FileType className="h-5 w-5 text-cegal-primary" />
              <h3 className="text-lg font-semibold text-white">Orphan Assets (No Owner Metadata)</h3>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
                <div>
                  <div className="text-lg font-semibold text-white">450 GB Orphaned Data</div>
                  <div className="text-sm text-cegal-gray-300">2,200 files with missing or invalid owner metadata</div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-cegal-gray-700">
                    <th className="text-left py-3 px-2 text-cegal-gray-400 font-medium">Path</th>
                    <th className="text-right py-3 px-2 text-cegal-gray-400 font-medium">Size</th>
                    <th className="text-left py-3 px-2 text-cegal-gray-400 font-medium">Last Modified</th>
                    <th className="text-left py-3 px-2 text-cegal-gray-400 font-medium">Type</th>
                    <th className="text-right py-3 px-2 text-cegal-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-cegal-gray-800 hover:bg-cegal-gray-800/30">
                    <td className="py-3 px-2 text-cegal-gray-300 font-mono text-xs">D:\\Projects\\Archived\\2023\\*.segy</td>
                    <td className="py-3 px-2 text-right text-white font-medium">185 GB</td>
                    <td className="py-3 px-2 text-cegal-gray-300">2024-08-15</td>
                    <td className="py-3 px-2 text-cegal-gray-300">Seismic</td>
                    <td className="py-3 px-2 text-right">
                      <button className="btn-cegal-secondary text-xs px-2 py-1">Assign Owner</button>
                    </td>
                  </tr>
                  <tr className="border-b border-cegal-gray-800 hover:bg-cegal-gray-800/30">
                    <td className="py-3 px-2 text-cegal-gray-300 font-mono text-xs">D:\\Temp\\Migration\\*.DATA</td>
                    <td className="py-3 px-2 text-right text-white font-medium">142 GB</td>
                    <td className="py-3 px-2 text-cegal-gray-300">2024-06-20</td>
                    <td className="py-3 px-2 text-cegal-gray-300">Simulation</td>
                    <td className="py-3 px-2 text-right">
                      <button className="btn-cegal-secondary text-xs px-2 py-1">Assign Owner</button>
                    </td>
                  </tr>
                  <tr className="border-b border-cegal-gray-800 hover:bg-cegal-gray-800/30">
                    <td className="py-3 px-2 text-cegal-gray-300 font-mono text-xs">D:\\Shared\\Backup\\Old\\*.*</td>
                    <td className="py-3 px-2 text-right text-white font-medium">123 GB</td>
                    <td className="py-3 px-2 text-cegal-gray-300">2024-05-10</td>
                    <td className="py-3 px-2 text-cegal-gray-300">Mixed</td>
                    <td className="py-3 px-2 text-right">
                      <button className="btn-cegal-secondary text-xs px-2 py-1">Assign Owner</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {selectedView === 'performance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-cegal-darker border border-cegal-gray-700 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-5 w-5 text-cegal-primary" />
                <h3 className="text-sm font-semibold text-cegal-gray-400">IOPS</h3>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{avgIOPS}</div>
              <div className="text-sm text-cegal-gray-300 mb-4">Average operations/sec</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-cegal-gray-400">Peak:</span>
                  <span className="text-emerald-400 font-medium">1,450</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-cegal-gray-400">Min:</span>
                  <span className="text-cegal-gray-300">25</span>
                </div>
              </div>
            </div>

            <div className="bg-cegal-darker border border-cegal-gray-700 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="h-5 w-5 text-cegal-primary" />
                <h3 className="text-sm font-semibold text-cegal-gray-400">Throughput</h3>
              </div>
              <div className="text-3xl font-bold text-white mb-2">2.4 GB/s</div>
              <div className="text-sm text-cegal-gray-300 mb-4">Current transfer rate</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-cegal-gray-400">Read:</span>
                  <span className="text-blue-400 font-medium">1.6 GB/s</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-cegal-gray-400">Write:</span>
                  <span className="text-amber-400 font-medium">0.8 GB/s</span>
                </div>
              </div>
            </div>

            <div className="bg-cegal-darker border border-cegal-gray-700 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <Database className="h-5 w-5 text-cegal-primary" />
                <h3 className="text-sm font-semibold text-cegal-gray-400">Capacity</h3>
              </div>
              <div className="text-3xl font-bold text-white mb-2">68%</div>
              <div className="text-sm text-cegal-gray-300 mb-4">Storage utilization</div>
              <div className="w-full bg-cegal-gray-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full" style={{ width: '68%' }} />
              </div>
              <div className="text-xs text-cegal-gray-400 mt-2">12,900 GB / 19,000 GB</div>
            </div>
          </div>

          <div className="bg-cegal-darker border border-cegal-gray-700 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-5 w-5 text-cegal-primary" />
              <h3 className="text-lg font-semibold text-white">Performance by User</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-cegal-gray-700">
                    <th className="text-left py-3 px-2 text-cegal-gray-400 font-medium">User</th>
                    <th className="text-left py-3 px-2 text-cegal-gray-400 font-medium">Business Unit</th>
                    <th className="text-right py-3 px-2 text-cegal-gray-400 font-medium">IOPS</th>
                    <th className="text-right py-3 px-2 text-cegal-gray-400 font-medium">Throughput</th>
                    <th className="text-right py-3 px-2 text-cegal-gray-400 font-medium">Latency</th>
                    <th className="text-left py-3 px-2 text-cegal-gray-400 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData
                    .filter(u => u.user !== 'Unknown')
                    .sort((a, b) => b.iops - a.iops)
                    .map((user, index) => (
                      <tr key={index} className="border-b border-cegal-gray-800 hover:bg-cegal-gray-800/30">
                        <td className="py-3 px-2 text-white font-medium">{user.user}</td>
                        <td className="py-3 px-2">
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                            {user.bu}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right text-white font-medium">{user.iops}</td>
                        <td className="py-3 px-2 text-right text-cegal-gray-300">{(user.iops * 2.5 / 1000).toFixed(2)} GB/s</td>
                        <td className="py-3 px-2 text-right text-cegal-gray-300">{Math.round(15 + Math.random() * 20)} ms</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            user.iops > 800 ? 'bg-emerald-500/20 text-emerald-400' :
                            user.iops > 400 ? 'bg-blue-500/20 text-blue-400' :
                            'bg-amber-500/20 text-amber-400'
                          }`}>
                            {user.iops > 800 ? 'Optimal' : user.iops > 400 ? 'Normal' : 'Low'}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {selectedView === 'cost' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="h-5 w-5 text-emerald-400" />
                <h3 className="text-sm font-semibold text-cegal-gray-400">Monthly Cost</h3>
              </div>
              <div className="text-3xl font-bold text-white mb-2">${(totalCost / 1000).toFixed(1)}K</div>
              <div className="text-sm text-emerald-400">+8% vs last month</div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <Database className="h-5 w-5 text-blue-400" />
                <h3 className="text-sm font-semibold text-cegal-gray-400">Cost per GB</h3>
              </div>
              <div className="text-3xl font-bold text-white mb-2">${(totalCost / totalStorage).toFixed(2)}</div>
              <div className="text-sm text-cegal-gray-300">Average monthly rate</div>
            </div>

            <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-5 w-5 text-amber-400" />
                <h3 className="text-sm font-semibold text-cegal-gray-400">Projected Annual</h3>
              </div>
              <div className="text-3xl font-bold text-white mb-2">${((totalCost * 12) / 1000).toFixed(0)}K</div>
              <div className="text-sm text-amber-400">Trending upward</div>
            </div>
          </div>

          <div className="bg-cegal-darker border border-cegal-gray-700 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="h-5 w-5 text-cegal-primary" />
              <h3 className="text-lg font-semibold text-white">Cost Attribution by BU/Asset</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-cegal-gray-700">
                    <th className="text-left py-3 px-2 text-cegal-gray-400 font-medium">Business Unit</th>
                    <th className="text-right py-3 px-2 text-cegal-gray-400 font-medium">Storage (GB)</th>
                    <th className="text-right py-3 px-2 text-cegal-gray-400 font-medium">Monthly Cost</th>
                    <th className="text-right py-3 px-2 text-cegal-gray-400 font-medium">% of Total</th>
                    <th className="text-right py-3 px-2 text-cegal-gray-400 font-medium">Growth (30d)</th>
                  </tr>
                </thead>
                <tbody>
                  {businessUnits
                    .filter(bu => bu !== 'All')
                    .map(bu => {
                      const buData = storageData.filter(d => d.bu === bu);
                      const buStorage = buData.reduce((sum, d) => sum + d.totalSize, 0);
                      const buCost = buData.reduce((sum, d) => sum + d.cost, 0);
                      const percentage = (buCost / totalCost) * 100;
                      return { bu, buStorage, buCost, percentage };
                    })
                    .sort((a, b) => b.buCost - a.buCost)
                    .map((item, index) => (
                      <tr key={index} className="border-b border-cegal-gray-800 hover:bg-cegal-gray-800/30">
                        <td className="py-3 px-2">
                          <span className="px-3 py-1 bg-gradient-cegal text-white rounded text-sm font-medium">
                            {item.bu}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right text-white font-medium">{item.buStorage.toLocaleString()}</td>
                        <td className="py-3 px-2 text-right text-white font-medium">${item.buCost.toLocaleString()}</td>
                        <td className="py-3 px-2 text-right text-cegal-gray-300">{item.percentage.toFixed(1)}%</td>
                        <td className="py-3 px-2 text-right">
                          <span className="text-emerald-400 font-medium">+{(5 + index * 2)}%</span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-cegal-darker border border-cegal-gray-700 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="h-5 w-5 text-cegal-primary" />
              <h3 className="text-lg font-semibold text-white">ROT Analysis (Redundant, Obsolete, Trivial Content)</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <div className="text-sm text-cegal-gray-400 mb-1">Redundant Data</div>
                <div className="text-2xl font-bold text-white mb-2">1,240 GB</div>
                <div className="text-xs text-red-400">Duplicate files identified</div>
                <div className="text-xs text-cegal-gray-400 mt-2">Potential savings: $6,200/mo</div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <div className="text-sm text-cegal-gray-400 mb-1">Obsolete Data</div>
                <div className="text-2xl font-bold text-white mb-2">890 GB</div>
                <div className="text-xs text-amber-400">Not accessed in 365+ days</div>
                <div className="text-xs text-cegal-gray-400 mt-2">Potential savings: $4,450/mo</div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="text-sm text-cegal-gray-400 mb-1">Trivial Content</div>
                <div className="text-2xl font-bold text-white mb-2">325 GB</div>
                <div className="text-xs text-blue-400">Temp files, logs, cache</div>
                <div className="text-xs text-cegal-gray-400 mt-2">Potential savings: $1,625/mo</div>
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-lg font-semibold text-white">Total Potential Savings</div>
                  <div className="text-sm text-cegal-gray-300">By cleaning up ROT content</div>
                </div>
                <div className="text-3xl font-bold text-emerald-400">$12.3K/mo</div>
              </div>
              <div className="text-sm text-cegal-gray-400">2,455 GB can be archived or removed</div>
            </div>
          </div>
        </div>
      )}

      {selectedView === 'forecast' && (
        <div className="space-y-6">
          <div className="bg-cegal-darker border border-cegal-gray-700 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <LineChart className="h-5 w-5 text-cegal-primary" />
              <h3 className="text-lg font-semibold text-white">Capacity Forecasting</h3>
            </div>

            <div className="mb-6">
              <div className="h-64 flex items-end gap-4">
                {forecastData.map((data, index) => {
                  const maxValue = Math.max(...forecastData.map(d => d.forecast));
                  const actualHeight = (data.actual / maxValue) * 100;
                  const forecastHeight = (data.forecast / maxValue) * 100;

                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex gap-1 items-end" style={{ height: '200px' }}>
                        {data.actual > 0 && (
                          <div
                            className="flex-1 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t"
                            style={{ height: `${actualHeight}%` }}
                          />
                        )}
                        <div
                          className={`flex-1 rounded-t ${data.actual > 0 ? 'bg-gradient-to-t from-amber-500/30 to-amber-400/30 border-2 border-amber-500/50 border-b-0' : 'bg-gradient-to-t from-amber-500 to-amber-400'}`}
                          style={{ height: `${forecastHeight}%` }}
                        />
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-white">{data.month}</div>
                        <div className="text-xs text-cegal-gray-400">
                          {data.actual > 0 ? `${data.actual} GB` : `${data.forecast} GB`}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded" />
                <span className="text-sm text-cegal-gray-300">Actual Usage</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-amber-500 to-amber-400 rounded" />
                <span className="text-sm text-cegal-gray-300">Forecasted Growth</span>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="text-sm text-cegal-gray-400 mb-2">Projection Summary</div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-cegal-gray-400">Current</div>
                  <div className="text-lg font-bold text-white">12.9 TB</div>
                </div>
                <div>
                  <div className="text-cegal-gray-400">6-Month Est.</div>
                  <div className="text-lg font-bold text-white">17.1 TB</div>
                </div>
                <div>
                  <div className="text-cegal-gray-400">Growth Rate</div>
                  <div className="text-lg font-bold text-emerald-400">+32.6%</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cegal-darker border border-cegal-gray-700 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="h-5 w-5 text-cegal-primary" />
              <h3 className="text-lg font-semibold text-white">What-If Analysis</h3>
              <span className="text-sm text-cegal-gray-400">What storage will I save if I deduplicate xyz files?</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Deduplication Rate (%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={whatIfDedup}
                    onChange={(e) => setWhatIfDedup(Number(e.target.value))}
                    className="w-full h-2 bg-cegal-gray-700 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, rgb(59, 130, 246) 0%, rgb(59, 130, 246) ${whatIfDedup * 2}%, rgb(55, 65, 81) ${whatIfDedup * 2}%, rgb(55, 65, 81) 100%)`
                    }}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-cegal-gray-400">0%</span>
                    <span className="text-sm font-bold text-cegal-primary">{whatIfDedup}%</span>
                    <span className="text-xs text-cegal-gray-400">50%</span>
                  </div>
                </div>

                <div className="bg-cegal-gray-800 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-cegal-gray-400">Current Storage:</span>
                    <span className="text-lg font-bold text-white">{totalStorage.toLocaleString()} GB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-cegal-gray-400">Deduplication Savings:</span>
                    <span className="text-lg font-bold text-emerald-400">-{whatIfResults.potentialSavings.toLocaleString()} GB</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-cegal-gray-700">
                    <span className="text-sm font-semibold text-white">New Storage:</span>
                    <span className="text-xl font-bold text-cegal-primary">{whatIfResults.newStorage.toLocaleString()} GB</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-lg p-5">
                  <div className="text-sm text-cegal-gray-400 mb-2">Monthly Cost Savings</div>
                  <div className="text-3xl font-bold text-emerald-400 mb-2">
                    ${(whatIfResults.costSavings / 1000).toFixed(2)}K
                  </div>
                  <div className="text-sm text-cegal-gray-300">
                    Annual: ${((whatIfResults.costSavings * 12) / 1000).toFixed(1)}K
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="text-sm font-semibold text-white mb-3">Impact Summary</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-cegal-gray-400">Storage Reduction:</span>
                      <span className="text-white font-medium">{whatIfDedup}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-cegal-gray-400">Files Affected:</span>
                      <span className="text-white font-medium">{Math.round(totalFiles * (whatIfDedup / 100)).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-cegal-gray-400">Processing Time:</span>
                      <span className="text-white font-medium">~{Math.round(whatIfDedup * 2)}h</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StorageManagement;