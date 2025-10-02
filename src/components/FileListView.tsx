import React from 'react';
import { FileText, AlertTriangle, Clock, CheckCircle } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  path: string;
  size: string;
  lastAccess: string;
  owner: string;
  tags: string[];
  isCorrupt: boolean;
  ageCategory: string;
}

interface FileListViewProps {
  files: FileItem[];
  selectedFiles: string[];
  onFileSelect: (fileId: string) => void;
  onSelectAll: () => void;
}

const FileListView: React.FC<FileListViewProps> = ({
  files,
  selectedFiles,
  onFileSelect,
  onSelectAll
}) => {
  const getStatusIcon = (file: FileItem) => {
    if (file.isCorrupt) {
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
    if (file.ageCategory === 'old') {
      return <Clock className="h-4 w-4 text-yellow-500" />;
    }
    if (file.ageCategory === 'stale') {
      return <Clock className="h-4 w-4 text-orange-500" />;
    }
    return <CheckCircle className="h-4 w-4 text-green-500" />;
  };

  const getStatusText = (file: FileItem) => {
    if (file.isCorrupt) return 'Corrupt';
    if (file.ageCategory === 'old') return 'Old';
    if (file.ageCategory === 'stale') return 'Stale';
    return 'Healthy';
  };

  const allSelected = files.length > 0 && files.every(file => selectedFiles.includes(file.id));

  return (
    <div className="card-cegal bg-cegal-darker border-cegal-gray-700">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-cegal-gray-800 border-b border-cegal-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onSelectAll}
                  className="rounded border-cegal-gray-700 text-cegal-green focus:ring-cegal-green"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-cegal-gray-400">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-cegal-gray-400">File Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-cegal-gray-400">Path</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-cegal-gray-400">Size</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-cegal-gray-400">Last Access</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-cegal-gray-400">Owner</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-cegal-gray-400">Tags</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cegal-gray-700">
            {files.map((file) => (
              <tr
                key={file.id}
                className={`hover:bg-cegal-gray-800 transition-colors ${
                  selectedFiles.includes(file.id) ? 'bg-cegal-gray-800' : ''
                }`}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedFiles.includes(file.id)}
                    onChange={() => onFileSelect(file.id)}
                    className="rounded border-cegal-gray-700 text-cegal-green focus:ring-cegal-green"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(file)}
                    <span className="text-xs text-cegal-gray-400">{getStatusText(file)}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-cegal-gray-500" />
                    <span className="text-sm text-white">{file.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-cegal-gray-400">{file.path}</td>
                <td className="px-4 py-3 text-sm text-cegal-gray-300">{file.size}</td>
                <td className="px-4 py-3 text-sm text-cegal-gray-300">{file.lastAccess}</td>
                <td className="px-4 py-3 text-sm text-cegal-gray-300">{file.owner}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {file.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-cegal-green/20 border border-cegal-green rounded text-xs text-cegal-green"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {files.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-cegal-gray-600 mx-auto mb-3" />
          <p className="text-sm text-cegal-gray-400">No files found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default FileListView;
