import React, { useState } from 'react';
import {
  Tag,
  Plus,
  Trash2,
  Edit2,
  GitMerge,
  X,
  Check,
  Search,
  AlertTriangle,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

interface TagItem {
  id: string;
  name: string;
  color: string;
  count: number;
  category: string;
}

interface MergeNode {
  id: string;
  name: string;
  color: string;
  count: number;
  children?: MergeNode[];
}

const TagManagement: React.FC = () => {
  const [tags, setTags] = useState<TagItem[]>([
    { id: '1', name: 'North Sea', color: '#3b82f6', count: 1247, category: 'Location' },
    { id: '2', name: 'North-Sea', color: '#3b82f6', count: 89, category: 'Location' },
    { id: '3', name: 'NorthSea', color: '#3b82f6', count: 43, category: 'Location' },
    { id: '4', name: 'Seismic', color: '#10b981', count: 2341, category: 'Data Type' },
    { id: '5', name: 'Well Data', color: '#f59e0b', count: 1876, category: 'Data Type' },
    { id: '6', name: 'Production', color: '#ef4444', count: 934, category: 'Application' },
    { id: '7', name: 'Exploration', color: '#8b5cf6', count: 1523, category: 'Application' },
    { id: '8', name: 'Gulf of Mexico', color: '#3b82f6', count: 876, category: 'Location' },
    { id: '9', name: 'GoM', color: '#3b82f6', count: 234, category: 'Location' },
    { id: '10', name: 'GOM', color: '#3b82f6', count: 167, category: 'Location' },
    { id: '11', name: 'Reservoir', color: '#10b981', count: 1654, category: 'Data Type' },
    { id: '12', name: 'Archive', color: '#6b7280', count: 543, category: 'Status' },
    { id: '13', name: 'Active', color: '#10b981', count: 3456, category: 'Status' },
    { id: '14', name: 'Legacy', color: '#f59e0b', count: 892, category: 'Status' }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTag, setNewTag] = useState({ name: '', color: '#3b82f6', category: 'Location' });
  const [editingTag, setEditingTag] = useState<string | null>(null);
  const [isMerging, setIsMerging] = useState(false);
  const [mergeTree, setMergeTree] = useState<MergeNode | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const categories = ['Location', 'Data Type', 'Application', 'Status'];
  const colorOptions = [
    { value: '#3b82f6', label: 'Blue' },
    { value: '#10b981', label: 'Green' },
    { value: '#f59e0b', label: 'Orange' },
    { value: '#ef4444', label: 'Red' },
    { value: '#8b5cf6', label: 'Purple' },
    { value: '#ec4899', label: 'Pink' },
    { value: '#6b7280', label: 'Gray' }
  ];

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tag.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectTag = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleAddTag = () => {
    if (newTag.name.trim()) {
      const newTagItem: TagItem = {
        id: Date.now().toString(),
        name: newTag.name,
        color: newTag.color,
        count: 0,
        category: newTag.category
      };
      setTags([...tags, newTagItem]);
      setNewTag({ name: '', color: '#3b82f6', category: 'Location' });
      setIsAddingTag(false);
    }
  };

  const handleDeleteTag = (tagId: string) => {
    if (window.confirm('Are you sure you want to delete this tag? This action cannot be undone.')) {
      setTags(tags.filter(tag => tag.id !== tagId));
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    }
  };

  const handleUpdateTag = (tagId: string, updates: Partial<TagItem>) => {
    setTags(tags.map(tag =>
      tag.id === tagId ? { ...tag, ...updates } : tag
    ));
    setEditingTag(null);
  };

  const handleInitiateMerge = () => {
    if (selectedTags.length < 2) {
      alert('Please select at least 2 tags to merge');
      return;
    }

    const selectedTagItems = tags.filter(tag => selectedTags.includes(tag.id));
    const primaryTag = selectedTagItems[0];

    const tree: MergeNode = {
      id: primaryTag.id,
      name: primaryTag.name,
      color: primaryTag.color,
      count: selectedTagItems.reduce((sum, tag) => sum + tag.count, 0),
      children: selectedTagItems.slice(1).map(tag => ({
        id: tag.id,
        name: tag.name,
        color: tag.color,
        count: tag.count
      }))
    };

    setMergeTree(tree);
    setIsMerging(true);
    setExpandedNodes(new Set([tree.id]));
  };

  const handleConfirmMerge = () => {
    if (!mergeTree) return;

    const childIds = mergeTree.children?.map(c => c.id) || [];
    const primaryTag = tags.find(tag => tag.id === mergeTree.id);

    if (primaryTag) {
      const updatedTag = {
        ...primaryTag,
        count: mergeTree.count
      };

      setTags([
        ...tags.filter(tag => tag.id === mergeTree.id).map(tag => updatedTag),
        ...tags.filter(tag => !selectedTags.includes(tag.id))
      ]);
    }

    setSelectedTags([]);
    setIsMerging(false);
    setMergeTree(null);
  };

  const handleCancelMerge = () => {
    setIsMerging(false);
    setMergeTree(null);
  };

  const toggleNodeExpansion = (nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const renderMergeTree = (node: MergeNode, level: number = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className="space-y-2">
        <div
          className={`flex items-center space-x-3 p-3 rounded-lg border ${
            level === 0
              ? 'bg-cegal-green/10 border-cegal-green/30'
              : 'bg-cegal-gray-800 border-cegal-gray-700'
          }`}
          style={{ marginLeft: `${level * 24}px` }}
        >
          {hasChildren && (
            <button
              onClick={() => toggleNodeExpansion(node.id)}
              className="text-cegal-gray-400 hover:text-white"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          )}
          {!hasChildren && <div className="w-4" />}

          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: node.color }}
          />

          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-white">{node.name}</span>
              {level === 0 && (
                <span className="px-2 py-0.5 bg-cegal-green/20 border border-cegal-green/30 rounded text-xs text-cegal-green">
                  Primary
                </span>
              )}
            </div>
            <span className="text-xs text-cegal-gray-400">
              {node.count.toLocaleString()} files
            </span>
          </div>

          {level === 0 ? (
            <GitMerge className="h-5 w-5 text-cegal-green" />
          ) : (
            <div className="flex items-center text-cegal-gray-500 text-sm">
              <span>will merge into primary</span>
            </div>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="space-y-2">
            {node.children!.map(child => renderMergeTree(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const tagsByCategory = categories.map(category => ({
    category,
    tags: filteredTags.filter(tag => tag.category === category)
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-cegal-green">Tag Management</h3>
          <p className="text-sm text-cegal-gray-400 mt-1">
            Create, edit, merge, and delete tags to organize your data
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {selectedTags.length > 0 && (
            <>
              <button
                onClick={handleInitiateMerge}
                className="btn-cegal-secondary flex items-center space-x-2"
                disabled={selectedTags.length < 2}
              >
                <GitMerge className="h-4 w-4" />
                <span>Merge Tags ({selectedTags.length})</span>
              </button>
              <button
                onClick={() => setSelectedTags([])}
                className="text-cegal-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </>
          )}
          <button
            onClick={() => setIsAddingTag(true)}
            className="btn-cegal-primary flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Tag</span>
          </button>
        </div>
      </div>

      {isMerging && mergeTree && (
        <div className="card-cegal bg-cegal-darker border-cegal-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-cegal-green/20 rounded-lg">
                <GitMerge className="h-6 w-6 text-cegal-green" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">Merge Tags Preview</h4>
                <p className="text-sm text-cegal-gray-400">
                  Review the merge structure before confirming
                </p>
              </div>
            </div>
          </div>

          <div className="bg-cegal-dark rounded-lg p-4 mb-6">
            {renderMergeTree(mergeTree)}
          </div>

          <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-500">Warning</p>
                <p className="text-xs text-cegal-gray-400 mt-1">
                  This action will merge all selected tags into the primary tag. Child tags will be removed
                  and all their file associations will be transferred to the primary tag. This action cannot be undone.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3">
            <button
              onClick={handleCancelMerge}
              className="btn-cegal-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmMerge}
              className="btn-cegal-primary flex items-center space-x-2"
            >
              <Check className="h-4 w-4" />
              <span>Confirm Merge</span>
            </button>
          </div>
        </div>
      )}

      {isAddingTag && (
        <div className="card-cegal bg-cegal-darker border-cegal-gray-700 p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Add New Tag</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Tag Name</label>
              <input
                type="text"
                value={newTag.name}
                onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                placeholder="Enter tag name"
                className="w-full px-3 py-2 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent bg-cegal-dark text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Category</label>
              <select
                value={newTag.category}
                onChange={(e) => setNewTag({ ...newTag, category: e.target.value })}
                className="w-full px-3 py-2 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent bg-cegal-dark text-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Color</label>
              <select
                value={newTag.color}
                onChange={(e) => setNewTag({ ...newTag, color: e.target.value })}
                className="w-full px-3 py-2 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent bg-cegal-dark text-white"
              >
                {colorOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center justify-end space-x-3 mt-4">
            <button
              onClick={() => {
                setIsAddingTag(false);
                setNewTag({ name: '', color: '#3b82f6', category: 'Location' });
              }}
              className="btn-cegal-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleAddTag}
              className="btn-cegal-primary flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Tag</span>
            </button>
          </div>
        </div>
      )}

      <div className="card-cegal bg-cegal-darker border-cegal-gray-700 p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cegal-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tags..."
              className="w-full pl-10 pr-4 py-2 border border-cegal-gray-600 rounded-lg focus:ring-2 focus:ring-cegal-primary focus:border-transparent bg-cegal-dark text-white"
            />
          </div>
        </div>

        <div className="space-y-6">
          {tagsByCategory.map(({ category, tags: categoryTags }) => (
            categoryTags.length > 0 && (
              <div key={category}>
                <h4 className="text-sm font-semibold text-cegal-gray-400 uppercase tracking-wide mb-3">
                  {category}
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {categoryTags.map(tag => (
                    <div
                      key={tag.id}
                      className={`flex items-center space-x-4 p-4 rounded-lg border transition-all ${
                        selectedTags.includes(tag.id)
                          ? 'bg-cegal-primary/10 border-cegal-primary/30'
                          : 'bg-cegal-gray-800 border-cegal-gray-700 hover:border-cegal-gray-600'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag.id)}
                        onChange={() => handleSelectTag(tag.id)}
                        className="rounded border-cegal-gray-600 text-cegal-primary focus:ring-cegal-primary"
                      />

                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: tag.color }}
                      />

                      {editingTag === tag.id ? (
                        <div className="flex-1 flex items-center space-x-3">
                          <input
                            type="text"
                            defaultValue={tag.name}
                            onBlur={(e) => handleUpdateTag(tag.id, { name: e.target.value })}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleUpdateTag(tag.id, { name: e.currentTarget.value });
                              }
                            }}
                            className="px-2 py-1 border border-cegal-gray-600 rounded bg-cegal-dark text-white text-sm"
                            autoFocus
                          />
                        </div>
                      ) : (
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-white">{tag.name}</span>
                          </div>
                          <span className="text-xs text-cegal-gray-400">
                            {tag.count.toLocaleString()} files
                          </span>
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setEditingTag(editingTag === tag.id ? null : tag.id)}
                          className="p-2 hover:bg-cegal-gray-700 rounded text-cegal-gray-400 hover:text-white transition-colors"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTag(tag.id)}
                          className="p-2 hover:bg-red-500/10 rounded text-cegal-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>

        {filteredTags.length === 0 && (
          <div className="text-center py-12">
            <Tag className="h-12 w-12 text-cegal-gray-500 mx-auto mb-3" />
            <p className="text-cegal-gray-400">No tags found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TagManagement;
