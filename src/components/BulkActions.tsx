import React, { useState } from 'react';
import { FolderInput, Trash2, Archive, CreditCard as Edit3, AlertTriangle } from 'lucide-react';

interface BulkActionsProps {
  selectedFiles: string[];
  onAction: (action: string, data?: any) => void;
  onClearSelection: () => void;
}

const BulkActions: React.FC<BulkActionsProps> = ({
  selectedFiles,
  onAction,
  onClearSelection
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState<string>('');
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [renamePattern, setRenamePattern] = useState({ find: '', replace: '' });
  const [movePath, setMovePath] = useState('');

  const handleActionClick = (action: string) => {
    if (action === 'delete') {
      setConfirmAction('delete');
      setShowConfirm(true);
    } else if (action === 'archive') {
      setConfirmAction('archive');
      setShowConfirm(true);
    } else if (action === 'rename') {
      setShowRenameModal(true);
    } else if (action === 'move') {
      setShowMoveModal(true);
    }
  };

  const confirmActionHandler = () => {
    onAction(confirmAction);
    setShowConfirm(false);
    setConfirmAction('');
  };

  const handleRename = () => {
    onAction('rename', renamePattern);
    setShowRenameModal(false);
    setRenamePattern({ find: '', replace: '' });
  };

  const handleMove = () => {
    onAction('move', { path: movePath });
    setShowMoveModal(false);
    setMovePath('');
  };

  if (selectedFiles.length === 0) {
    return null;
  }

  return (
    <>
      <div className="card-cegal bg-cegal-darker border-cegal-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-white">
              <span className="text-cegal-green font-bold">{selectedFiles.length}</span> file(s) selected
            </span>
            <button
              onClick={onClearSelection}
              className="text-xs text-cegal-gray-400 hover:text-white underline"
            >
              Clear selection
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleActionClick('move')}
              className="btn-cegal-secondary flex items-center space-x-2"
            >
              <FolderInput className="h-4 w-4" />
              <span>Move</span>
            </button>
            <button
              onClick={() => handleActionClick('rename')}
              className="btn-cegal-secondary flex items-center space-x-2"
            >
              <Edit3 className="h-4 w-4" />
              <span>Rename</span>
            </button>
            <button
              onClick={() => handleActionClick('archive')}
              className="btn-cegal-secondary flex items-center space-x-2"
            >
              <Archive className="h-4 w-4" />
              <span>Archive</span>
            </button>
            <button
              onClick={() => handleActionClick('delete')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="card-cegal bg-cegal-darker border-cegal-gray-700 p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-white">Confirm Action</h3>
            </div>
            <p className="text-sm text-cegal-gray-300 mb-6">
              Are you sure you want to {confirmAction} {selectedFiles.length} file(s)?
              {confirmAction === 'delete' && ' This action cannot be undone.'}
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 btn-cegal-secondary"
              >
                Cancel
              </button>
              <button
                onClick={confirmActionHandler}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                {confirmAction === 'delete' ? 'Delete' : 'Archive'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showRenameModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="card-cegal bg-cegal-darker border-cegal-gray-700 p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <Edit3 className="h-5 w-5 text-cegal-green" />
              <h3 className="text-lg font-semibold text-white">Bulk Rename</h3>
            </div>
            <p className="text-sm text-cegal-gray-400 mb-4">
              Rename {selectedFiles.length} file(s) using find and replace pattern
            </p>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-cegal-gray-300 mb-2">
                  Find
                </label>
                <input
                  type="text"
                  value={renamePattern.find}
                  onChange={(e) => setRenamePattern({ ...renamePattern, find: e.target.value })}
                  placeholder="Text to find..."
                  className="w-full px-3 py-2 bg-cegal-gray-800 border border-cegal-gray-700 rounded-lg text-white placeholder-cegal-gray-500 focus:outline-none focus:border-cegal-green"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-cegal-gray-300 mb-2">
                  Replace with
                </label>
                <input
                  type="text"
                  value={renamePattern.replace}
                  onChange={(e) => setRenamePattern({ ...renamePattern, replace: e.target.value })}
                  placeholder="Replacement text..."
                  className="w-full px-3 py-2 bg-cegal-gray-800 border border-cegal-gray-700 rounded-lg text-white placeholder-cegal-gray-500 focus:outline-none focus:border-cegal-green"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowRenameModal(false)}
                className="flex-1 btn-cegal-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleRename}
                disabled={!renamePattern.find}
                className="flex-1 btn-cegal-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Rename
              </button>
            </div>
          </div>
        </div>
      )}

      {showMoveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="card-cegal bg-cegal-darker border-cegal-gray-700 p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <FolderInput className="h-5 w-5 text-cegal-green" />
              <h3 className="text-lg font-semibold text-white">Move Files</h3>
            </div>
            <p className="text-sm text-cegal-gray-400 mb-4">
              Move {selectedFiles.length} file(s) to a new location
            </p>
            <div className="mb-6">
              <label className="block text-sm font-medium text-cegal-gray-300 mb-2">
                Destination Path
              </label>
              <input
                type="text"
                value={movePath}
                onChange={(e) => setMovePath(e.target.value)}
                placeholder="/archive/old-data/"
                className="w-full px-3 py-2 bg-cegal-gray-800 border border-cegal-gray-700 rounded-lg text-white placeholder-cegal-gray-500 focus:outline-none focus:border-cegal-green"
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowMoveModal(false)}
                className="flex-1 btn-cegal-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleMove}
                disabled={!movePath}
                className="flex-1 btn-cegal-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Move
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActions;
