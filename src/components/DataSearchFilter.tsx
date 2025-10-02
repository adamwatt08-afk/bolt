import React, { useState } from 'react';
import { Search, Filter, X, Calendar } from 'lucide-react';

interface FilterOptions {
  searchTerm: string;
  tags: string[];
  ageCategory: string[];
  dataQuality: string[];
  sizeMin: string;
  sizeMax: string;
  dateFrom: string;
  dateTo: string;
}

interface DataSearchFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  availableTags: string[];
}

const DataSearchFilter: React.FC<DataSearchFilterProps> = ({ onFilterChange, availableTags }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: '',
    tags: [],
    ageCategory: [],
    dataQuality: [],
    sizeMin: '',
    sizeMax: '',
    dateFrom: '',
    dateTo: ''
  });

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleArrayFilter = (key: 'tags' | 'ageCategory' | 'dataQuality', value: string) => {
    const currentArray = filters[key];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray);
  };

  const clearFilters = () => {
    const emptyFilters: FilterOptions = {
      searchTerm: '',
      tags: [],
      ageCategory: [],
      dataQuality: [],
      sizeMin: '',
      sizeMax: '',
      dateFrom: '',
      dateTo: ''
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const hasActiveFilters =
    filters.searchTerm ||
    filters.tags.length > 0 ||
    filters.ageCategory.length > 0 ||
    filters.dataQuality.length > 0 ||
    filters.sizeMin ||
    filters.sizeMax ||
    filters.dateFrom ||
    filters.dateTo;

  return (
    <div className="card-cegal bg-cegal-darker border-cegal-gray-700">
      <div className="p-4 border-b border-cegal-gray-700">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cegal-gray-500" />
            <input
              type="text"
              value={filters.searchTerm}
              onChange={(e) => updateFilter('searchTerm', e.target.value)}
              placeholder="Search files by name, path, or owner..."
              className="w-full pl-10 pr-4 py-2 bg-cegal-gray-800 border border-cegal-gray-700 rounded-lg text-white placeholder-cegal-gray-500 focus:outline-none focus:border-cegal-green"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-cegal-secondary flex items-center space-x-2 ${showFilters ? 'bg-cegal-green text-white' : ''}`}
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="btn-cegal-secondary flex items-center space-x-2"
            >
              <X className="h-4 w-4" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="p-4 space-y-4 bg-cegal-gray-800/50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-cegal-gray-300 mb-2">
                Data Quality
              </label>
              <div className="space-y-2">
                {['Corrupt', 'Old (>1 year)', 'Stale (>6 months)', 'Healthy'].map((quality) => (
                  <label key={quality} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.dataQuality.includes(quality)}
                      onChange={() => toggleArrayFilter('dataQuality', quality)}
                      className="rounded border-cegal-gray-700 text-cegal-green focus:ring-cegal-green"
                    />
                    <span className="text-sm text-cegal-gray-300">{quality}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-cegal-gray-300 mb-2">
                Tags
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {availableTags.map((tag) => (
                  <label key={tag} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.tags.includes(tag)}
                      onChange={() => toggleArrayFilter('tags', tag)}
                      className="rounded border-cegal-gray-700 text-cegal-green focus:ring-cegal-green"
                    />
                    <span className="text-sm text-cegal-gray-300">{tag}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-cegal-gray-300 mb-2">
                Size Range
              </label>
              <div className="space-y-2">
                <input
                  type="text"
                  value={filters.sizeMin}
                  onChange={(e) => updateFilter('sizeMin', e.target.value)}
                  placeholder="Min (e.g., 100GB)"
                  className="w-full px-3 py-2 bg-cegal-gray-800 border border-cegal-gray-700 rounded-lg text-white placeholder-cegal-gray-500 focus:outline-none focus:border-cegal-green text-sm"
                />
                <input
                  type="text"
                  value={filters.sizeMax}
                  onChange={(e) => updateFilter('sizeMax', e.target.value)}
                  placeholder="Max (e.g., 1TB)"
                  className="w-full px-3 py-2 bg-cegal-gray-800 border border-cegal-gray-700 rounded-lg text-white placeholder-cegal-gray-500 focus:outline-none focus:border-cegal-green text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-cegal-gray-300 mb-2">
                Last Accessed Date
              </label>
              <div className="space-y-2">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cegal-gray-500" />
                  <input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => updateFilter('dateFrom', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-cegal-gray-800 border border-cegal-gray-700 rounded-lg text-white focus:outline-none focus:border-cegal-green text-sm"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cegal-gray-500" />
                  <input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => updateFilter('dateTo', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-cegal-gray-800 border border-cegal-gray-700 rounded-lg text-white focus:outline-none focus:border-cegal-green text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataSearchFilter;
