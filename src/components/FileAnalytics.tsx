import React from 'react';
import { FileAnalytics as FileAnalyticsType, formatBytes, formatDate } from '../utils/fileAnalytics';
import { File, Users, Calendar, Activity, TrendingUp, AlertTriangle } from 'lucide-react';

interface FileAnalyticsProps {
  analytics: FileAnalyticsType;
}

const FileAnalytics: React.FC<FileAnalyticsProps> = ({ analytics }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-cegal-gray-800 border border-cegal-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-cegal-gray-400">Total Files</span>
            <File className="h-4 w-4 text-cegal-blue" />
          </div>
          <div className="text-2xl font-semibold text-white">
            {analytics.totalFiles.toLocaleString()}
          </div>
        </div>

        <div className="bg-cegal-gray-800 border border-cegal-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-cegal-gray-400">Total Size</span>
            <TrendingUp className="h-4 w-4 text-cegal-green" />
          </div>
          <div className="text-2xl font-semibold text-white">
            {formatBytes(analytics.totalSize)}
          </div>
        </div>

        <div className="bg-cegal-gray-800 border border-cegal-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-cegal-gray-400">Average Size</span>
            <Activity className="h-4 w-4 text-cegal-orange" />
          </div>
          <div className="text-2xl font-semibold text-white">
            {formatBytes(analytics.averageFileSize)}
          </div>
        </div>

        <div className="bg-cegal-gray-800 border border-cegal-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-cegal-gray-400">File Owners</span>
            <Users className="h-4 w-4 text-cegal-blue" />
          </div>
          <div className="text-2xl font-semibold text-white">
            {analytics.ownerDistribution.length}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-cegal-gray-800 border border-cegal-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-cegal-green" />
            File Activity Status
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-cegal-gray-400">Active (30 days)</span>
                <span className="text-sm font-medium text-cegal-green">
                  {analytics.staleness.active} files
                </span>
              </div>
              <div className="w-full bg-cegal-gray-700 rounded-full h-2">
                <div
                  className="bg-cegal-green h-2 rounded-full transition-all"
                  style={{
                    width: `${(analytics.staleness.active / analytics.totalFiles) * 100}%`
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-cegal-gray-400">Stale (30-90 days)</span>
                <span className="text-sm font-medium text-cegal-orange">
                  {analytics.staleness.stale} files
                </span>
              </div>
              <div className="w-full bg-cegal-gray-700 rounded-full h-2">
                <div
                  className="bg-cegal-orange h-2 rounded-full transition-all"
                  style={{
                    width: `${(analytics.staleness.stale / analytics.totalFiles) * 100}%`
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-cegal-gray-400">Dormant (&gt;90 days)</span>
                <span className="text-sm font-medium text-red-400">
                  {analytics.staleness.dormant} files
                </span>
              </div>
              <div className="w-full bg-cegal-gray-700 rounded-full h-2">
                <div
                  className="bg-red-400 h-2 rounded-full transition-all"
                  style={{
                    width: `${(analytics.staleness.dormant / analytics.totalFiles) * 100}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-cegal-gray-800 border border-cegal-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <File className="h-5 w-5 text-cegal-blue" />
            Top File Extensions
          </h3>
          <div className="space-y-3">
            {analytics.extensionDistribution.slice(0, 5).map((ext, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-white font-medium">{ext.extension}</span>
                    <span className="text-xs text-cegal-gray-400">
                      {ext.count} files • {formatBytes(ext.size)}
                    </span>
                  </div>
                  <div className="w-full bg-cegal-gray-700 rounded-full h-1.5">
                    <div
                      className="bg-gradient-cegal h-1.5 rounded-full transition-all"
                      style={{
                        width: `${(ext.count / analytics.totalFiles) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-cegal-gray-800 border border-cegal-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-cegal-orange" />
            Activity Trend
          </h3>
          <div className="space-y-3">
            {analytics.activityTrend.map((trend, index) => (
              <div key={index} className="border-b border-cegal-gray-700 pb-3 last:border-0">
                <div className="text-sm text-cegal-gray-400 mb-2">{trend.period}</div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-cegal-blue"></div>
                    <span className="text-xs text-cegal-gray-300">
                      Accessed: <span className="font-medium text-white">{trend.accessed}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-cegal-green"></div>
                    <span className="text-xs text-cegal-gray-300">
                      Modified: <span className="font-medium text-white">{trend.modified}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-cegal-gray-800 border border-cegal-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-cegal-blue" />
            Top File Owners
          </h3>
          <div className="space-y-3">
            {analytics.ownerDistribution.slice(0, 5).map((owner, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-white font-medium">{owner.owner}</span>
                    <span className="text-xs text-cegal-gray-400">
                      {owner.count} files • {formatBytes(owner.size)}
                    </span>
                  </div>
                  <div className="w-full bg-cegal-gray-700 rounded-full h-1.5">
                    <div
                      className="bg-gradient-cegal h-1.5 rounded-full transition-all"
                      style={{
                        width: `${(owner.count / analytics.totalFiles) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {(analytics.largestFile || analytics.oldestFile || analytics.newestFile || analytics.mostRecentlyAccessed) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {analytics.largestFile && (
            <div className="bg-cegal-gray-800 border border-cegal-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-cegal-orange" />
                <span className="text-xs text-cegal-gray-400 uppercase">Largest File</span>
              </div>
              <div className="text-sm text-white font-medium truncate" title={analytics.largestFile.name}>
                {analytics.largestFile.name}
              </div>
              <div className="text-xs text-cegal-gray-400 mt-1">
                {formatBytes(analytics.largestFile.size)}
              </div>
            </div>
          )}

          {analytics.oldestFile && (
            <div className="bg-cegal-gray-800 border border-cegal-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-cegal-gray-400" />
                <span className="text-xs text-cegal-gray-400 uppercase">Oldest File</span>
              </div>
              <div className="text-sm text-white font-medium truncate" title={analytics.oldestFile.name}>
                {analytics.oldestFile.name}
              </div>
              <div className="text-xs text-cegal-gray-400 mt-1">
                {formatDate(analytics.oldestFile.date)}
              </div>
            </div>
          )}

          {analytics.newestFile && (
            <div className="bg-cegal-gray-800 border border-cegal-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-cegal-green" />
                <span className="text-xs text-cegal-gray-400 uppercase">Newest File</span>
              </div>
              <div className="text-sm text-white font-medium truncate" title={analytics.newestFile.name}>
                {analytics.newestFile.name}
              </div>
              <div className="text-xs text-cegal-gray-400 mt-1">
                {formatDate(analytics.newestFile.date)}
              </div>
            </div>
          )}

          {analytics.mostRecentlyAccessed && (
            <div className="bg-cegal-gray-800 border border-cegal-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-4 w-4 text-cegal-blue" />
                <span className="text-xs text-cegal-gray-400 uppercase">Recently Accessed</span>
              </div>
              <div className="text-sm text-white font-medium truncate" title={analytics.mostRecentlyAccessed.name}>
                {analytics.mostRecentlyAccessed.name}
              </div>
              <div className="text-xs text-cegal-gray-400 mt-1">
                {formatDate(analytics.mostRecentlyAccessed.date)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileAnalytics;
