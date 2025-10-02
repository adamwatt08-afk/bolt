import React from 'react';
import { AlertTriangle, Clock, FileX, TrendingDown } from 'lucide-react';

interface DataQualityProps {
  corruptFiles: number;
  oldFiles: number;
  staleFiles: number;
  totalSize: string;
  onViewCorrupt: () => void;
  onViewOld: () => void;
  onViewStale: () => void;
}

const DataQualityAnalysis: React.FC<DataQualityProps> = ({
  corruptFiles,
  oldFiles,
  staleFiles,
  totalSize,
  onViewCorrupt,
  onViewOld,
  onViewStale
}) => {
  return (
    <div className="card-cegal bg-cegal-darker border-cegal-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-cegal-green">Data Quality Analysis</h3>
          <p className="text-sm text-cegal-gray-400 mt-1">Issues requiring attention</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4 cursor-pointer hover:bg-red-900/30 transition-colors" onClick={onViewCorrupt}>
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-red-100 rounded-lg">
              <FileX className="h-5 w-5 text-red-600" />
            </div>
            <span className="text-2xl font-bold text-red-400">{corruptFiles}</span>
          </div>
          <h4 className="text-sm font-medium text-red-300">Corrupt Files</h4>
          <p className="text-xs text-red-400 mt-1">Files with data integrity issues</p>
        </div>

        <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 cursor-pointer hover:bg-yellow-900/30 transition-colors" onClick={onViewOld}>
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <span className="text-2xl font-bold text-yellow-400">{oldFiles}</span>
          </div>
          <h4 className="text-sm font-medium text-yellow-300">Old Data (&gt;1 year)</h4>
          <p className="text-xs text-yellow-400 mt-1">Not accessed in over 12 months</p>
        </div>

        <div className="bg-orange-900/20 border border-orange-700/50 rounded-lg p-4 cursor-pointer hover:bg-orange-900/30 transition-colors" onClick={onViewStale}>
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingDown className="h-5 w-5 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-orange-400">{staleFiles}</span>
          </div>
          <h4 className="text-sm font-medium text-orange-300">Stale Data (&gt;6 months)</h4>
          <p className="text-xs text-orange-400 mt-1">Not accessed in 6-12 months</p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-cegal-gray-800 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <span className="text-sm font-medium text-white">Total Problem Data</span>
          </div>
          <span className="text-lg font-bold text-cegal-green">{totalSize}</span>
        </div>
        <p className="text-xs text-cegal-gray-400 mt-2">
          Addressing these issues could free up significant storage space and improve data quality
        </p>
      </div>
    </div>
  );
};

export default DataQualityAnalysis;
