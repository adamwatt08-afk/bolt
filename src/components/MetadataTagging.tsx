import React, { useState } from 'react';
import { Tag, X, Plus } from 'lucide-react';

interface MetadataTaggingProps {
  selectedFiles: string[];
  onTagsApplied: (tags: string[]) => void;
}

const MetadataTagging: React.FC<MetadataTaggingProps> = ({ selectedFiles, onTagsApplied }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [suggestedTags] = useState([
    'archived',
    'production',
    'testing',
    'backup',
    'deprecated',
    'critical',
    'review-needed',
    'ready-to-delete'
  ]);

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setInputValue('');
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleApplyTags = () => {
    onTagsApplied(tags);
    setTags([]);
  };

  return (
    <div className="card-cegal bg-cegal-darker border-cegal-gray-700 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Tag className="h-5 w-5 text-cegal-green" />
        <h3 className="text-lg font-semibold text-white">Metadata Tagging</h3>
      </div>

      {selectedFiles.length > 0 ? (
        <>
          <div className="mb-4 p-3 bg-cegal-gray-800 rounded-lg">
            <p className="text-sm text-cegal-gray-300">
              <span className="font-semibold text-cegal-green">{selectedFiles.length}</span> file(s) selected
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-cegal-gray-300 mb-2">
              Add Tags
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag(inputValue)}
                placeholder="Enter tag name..."
                className="flex-1 px-3 py-2 bg-cegal-gray-800 border border-cegal-gray-700 rounded-lg text-white placeholder-cegal-gray-500 focus:outline-none focus:border-cegal-green"
              />
              <button
                onClick={() => addTag(inputValue)}
                className="btn-cegal-primary flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add</span>
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-cegal-gray-300 mb-2">
              Suggested Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {suggestedTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => addTag(tag)}
                  className="px-3 py-1 bg-cegal-gray-800 border border-cegal-gray-700 rounded-full text-xs text-cegal-gray-300 hover:bg-cegal-gray-700 hover:border-cegal-green transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {tags.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-cegal-gray-300 mb-2">
                Current Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center space-x-1 px-3 py-1 bg-cegal-green/20 border border-cegal-green rounded-full"
                  >
                    <span className="text-xs text-cegal-green font-medium">{tag}</span>
                    <button
                      onClick={() => removeTag(tag)}
                      className="text-cegal-green hover:text-white"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleApplyTags}
            disabled={tags.length === 0}
            className="btn-cegal-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Apply Tags to Selected Files
          </button>
        </>
      ) : (
        <div className="text-center py-8">
          <Tag className="h-12 w-12 text-cegal-gray-600 mx-auto mb-3" />
          <p className="text-sm text-cegal-gray-400">
            Select files to add metadata tags
          </p>
        </div>
      )}
    </div>
  );
};

export default MetadataTagging;
