import React, { useState } from 'react';
import { Play, Download, Save, History, BarChart3, PieChart, TrendingUp, Database } from 'lucide-react';
import ChartCard from './ChartCard';

interface QueryResult {
  columns: string[];
  rows: any[];
  executionTime: number;
}

const QueryAnalytics: React.FC = () => {
  const [query, setQuery] = useState('SELECT * FROM file_metadata LIMIT 10');
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [chartType, setChartType] = useState<'table' | 'bar' | 'line' | 'pie'>('table');
  const [selectedXAxis, setSelectedXAxis] = useState('');
  const [selectedYAxis, setSelectedYAxis] = useState('');

  const savedQueries = [
    {
      name: 'Files by Extension',
      query: 'SELECT extension, COUNT(*) as count, SUM(size) as total_size FROM file_metadata GROUP BY extension'
    },
    {
      name: 'Monthly Access Trends',
      query: 'SELECT DATE_TRUNC(\'month\', last_access) as month, COUNT(*) as files FROM file_metadata GROUP BY month ORDER BY month'
    },
    {
      name: 'Files by Owner',
      query: 'SELECT file_owners[1] as owner, COUNT(*) as file_count FROM file_metadata GROUP BY file_owners[1]'
    },
    {
      name: 'Old Data (>1 year)',
      query: 'SELECT * FROM file_metadata WHERE last_access < NOW() - INTERVAL \'1 year\''
    },
    {
      name: 'Largest Files',
      query: 'SELECT name, path, size FROM file_metadata ORDER BY size DESC LIMIT 10'
    },
    {
      name: 'Storage by Path',
      query: 'SELECT path, COUNT(*) as file_count, SUM(size) as total_size FROM file_metadata GROUP BY path'
    }
  ];

  const mockQueryResults: { [key: string]: QueryResult } = {
    'extension': {
      columns: ['extension', 'count', 'total_size'],
      rows: [
        { extension: '.segy', count: 145, total_size: 23500000000000 },
        { extension: '.las', count: 289, total_size: 12800000000000 },
        { extension: '.pet', count: 76, total_size: 8400000000000 },
        { extension: '.data', count: 34, total_size: 5600000000000 }
      ],
      executionTime: 124
    },
    'month': {
      columns: ['month', 'files'],
      rows: [
        { month: '2024-01', files: 45 },
        { month: '2024-02', files: 52 },
        { month: '2024-03', files: 48 },
        { month: '2024-04', files: 61 },
        { month: '2024-05', files: 55 },
        { month: '2024-06', files: 59 }
      ],
      executionTime: 89
    },
    'owner': {
      columns: ['owner', 'file_count'],
      rows: [
        { owner: 'Geophysics Team', file_count: 234 },
        { owner: 'Reservoir Team', file_count: 189 },
        { owner: 'Well Logging Team', file_count: 156 },
        { owner: 'Processing Team', file_count: 145 }
      ],
      executionTime: 67
    },
    'default': {
      columns: ['name', 'path', 'size', 'last_access'],
      rows: [
        { name: 'North_Sea_Survey.segy', path: '/seismic/north-sea/', size: 8500000000000, last_access: '2024-12-15' },
        { name: 'Well_Alpha_7H.las', path: '/wells/alpha/', size: 1200000000, last_access: '2024-12-18' },
        { name: 'Petrel_Project_Main.pet', path: '/projects/main/', size: 3200000000000, last_access: '2024-12-20' }
      ],
      executionTime: 45
    }
  };

  const handleExecuteQuery = () => {
    setIsExecuting(true);
    setTimeout(() => {
      let result;

      if (query.toLowerCase().includes('extension')) {
        result = mockQueryResults.extension;
      } else if (query.toLowerCase().includes('month')) {
        result = mockQueryResults.month;
      } else if (query.toLowerCase().includes('owner')) {
        result = mockQueryResults.owner;
      } else {
        result = mockQueryResults.default;
      }

      setQueryResult(result);
      if (result.columns.length >= 2) {
        setSelectedXAxis(result.columns[0]);
        setSelectedYAxis(result.columns[1]);
      }
      setIsExecuting(false);
    }, 500);
  };

  const formatBytes = (bytes: number) => {
    if (bytes >= 1099511627776) return (bytes / 1099511627776).toFixed(2) + ' TB';
    if (bytes >= 1073741824) return (bytes / 1073741824).toFixed(2) + ' GB';
    if (bytes >= 1048576) return (bytes / 1048576).toFixed(2) + ' MB';
    return bytes + ' bytes';
  };

  const formatValue = (value: any) => {
    if (typeof value === 'number' && value > 1000000000) {
      return formatBytes(value);
    }
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    if (value instanceof Date || (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}/))) {
      return new Date(value).toLocaleDateString();
    }
    return value;
  };

  const getChartData = () => {
    if (!queryResult || !selectedXAxis || !selectedYAxis) return [];

    return queryResult.rows.map(row => ({
      name: String(row[selectedXAxis]),
      value: Number(row[selectedYAxis]) || 0
    }));
  };

  const exportToCSV = () => {
    if (!queryResult) return;

    const csv = [
      queryResult.columns.join(','),
      ...queryResult.rows.map(row =>
        queryResult.columns.map(col => row[col]).join(',')
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'query_results.csv';
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="card-cegal bg-cegal-darker border-cegal-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Database className="h-5 w-5 text-cegal-green" />
            <h3 className="text-lg font-semibold text-white">Query Editor</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button className="btn-cegal-secondary flex items-center space-x-2">
              <History className="h-4 w-4" />
              <span>History</span>
            </button>
            <button className="btn-cegal-secondary flex items-center space-x-2">
              <Save className="h-4 w-4" />
              <span>Save Query</span>
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-cegal-gray-300 mb-2">
            SQL Query
          </label>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={6}
            className="w-full px-4 py-3 bg-cegal-gray-800 border border-cegal-gray-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-cegal-green"
            placeholder="Enter your SQL query here..."
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={handleExecuteQuery}
            disabled={isExecuting}
            className="btn-cegal-primary flex items-center space-x-2 disabled:opacity-50"
          >
            <Play className="h-4 w-4" />
            <span>{isExecuting ? 'Executing...' : 'Execute Query'}</span>
          </button>

          {queryResult && (
            <span className="text-sm text-cegal-gray-400">
              Executed in {queryResult.executionTime}ms
            </span>
          )}
        </div>
      </div>

      <div className="card-cegal bg-cegal-darker border-cegal-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Saved Queries</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {savedQueries.map((savedQuery, idx) => (
            <button
              key={idx}
              onClick={() => setQuery(savedQuery.query)}
              className="text-left px-4 py-3 bg-cegal-gray-800 hover:bg-cegal-gray-700 border border-cegal-gray-700 rounded-lg transition-colors"
            >
              <p className="text-sm font-medium text-cegal-green mb-1">{savedQuery.name}</p>
              <code className="text-xs text-cegal-gray-400 line-clamp-1">{savedQuery.query}</code>
            </button>
          ))}
        </div>
      </div>

      {queryResult && (
        <>
          <div className="card-cegal bg-cegal-darker border-cegal-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Visualization Options</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setChartType('table')}
                  className={`p-2 rounded-lg transition-colors ${
                    chartType === 'table'
                      ? 'bg-cegal-green text-white'
                      : 'bg-cegal-gray-800 text-cegal-gray-400 hover:text-white'
                  }`}
                  title="Table View"
                >
                  <Database className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setChartType('bar')}
                  className={`p-2 rounded-lg transition-colors ${
                    chartType === 'bar'
                      ? 'bg-cegal-green text-white'
                      : 'bg-cegal-gray-800 text-cegal-gray-400 hover:text-white'
                  }`}
                  title="Bar Chart"
                >
                  <BarChart3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setChartType('line')}
                  className={`p-2 rounded-lg transition-colors ${
                    chartType === 'line'
                      ? 'bg-cegal-green text-white'
                      : 'bg-cegal-gray-800 text-cegal-gray-400 hover:text-white'
                  }`}
                  title="Line Chart"
                >
                  <TrendingUp className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setChartType('pie')}
                  className={`p-2 rounded-lg transition-colors ${
                    chartType === 'pie'
                      ? 'bg-cegal-green text-white'
                      : 'bg-cegal-gray-800 text-cegal-gray-400 hover:text-white'
                  }`}
                  title="Pie Chart"
                >
                  <PieChart className="h-4 w-4" />
                </button>
              </div>
            </div>

            {chartType !== 'table' && (
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-cegal-gray-300 mb-2">
                    X-Axis
                  </label>
                  <select
                    value={selectedXAxis}
                    onChange={(e) => setSelectedXAxis(e.target.value)}
                    className="w-full px-3 py-2 bg-cegal-gray-800 border border-cegal-gray-700 rounded-lg text-white focus:outline-none focus:border-cegal-green"
                  >
                    {queryResult.columns.map(col => (
                      <option key={col} value={col}>{col}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-cegal-gray-300 mb-2">
                    Y-Axis (Numeric)
                  </label>
                  <select
                    value={selectedYAxis}
                    onChange={(e) => setSelectedYAxis(e.target.value)}
                    className="w-full px-3 py-2 bg-cegal-gray-800 border border-cegal-gray-700 rounded-lg text-white focus:outline-none focus:border-cegal-green"
                  >
                    {queryResult.columns.map(col => (
                      <option key={col} value={col}>{col}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          <div className="card-cegal bg-cegal-darker border-cegal-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Query Results</h3>
                <p className="text-sm text-cegal-gray-400 mt-1">
                  {queryResult.rows.length} row(s) returned
                </p>
              </div>
              <button
                onClick={exportToCSV}
                className="btn-cegal-secondary flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Export CSV</span>
              </button>
            </div>

            {chartType === 'table' ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-cegal-gray-800 border-b border-cegal-gray-700">
                    <tr>
                      {queryResult.columns.map(col => (
                        <th key={col} className="px-4 py-3 text-left text-xs font-medium text-cegal-gray-400">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cegal-gray-700">
                    {queryResult.rows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-cegal-gray-800 transition-colors">
                        {queryResult.columns.map(col => (
                          <td key={col} className="px-4 py-3 text-sm text-cegal-gray-300">
                            {formatValue(row[col])}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <ChartCard
                title=""
                description=""
                data={getChartData()}
                chartType={chartType as 'bar' | 'line' | 'pie'}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default QueryAnalytics;
