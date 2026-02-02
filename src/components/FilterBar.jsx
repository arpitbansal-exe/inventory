import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import useStore from '../store/store';

const FilterBar = () => {
  const filters = useStore((state) => state.filters);
  const setFilter = useStore((state) => state.setFilter);
  const clearFilters = useStore((state) => state.clearFilters);
  const toggleIssuesFilter = useStore((state) => state.toggleIssuesFilter);
  
  const products = useStore((state) => state.products);
  const environments = useStore((state) => state.getUniqueEnvironments());
  const owners = useStore((state) => state.getUniqueOwners());
  const tags = useStore((state) => state.getUniqueTags());
  const tagColors = useStore((state) => state.tagColors);
  
  const hasActiveFilters = 
    filters.products.length > 0 ||
    filters.environments.length > 0 ||
    filters.owners.length > 0 ||
    filters.tags.length > 0 ||
    filters.showIssuesOnly;
  
  const toggleFilter = (filterType, value) => {
    const currentValues = filters[filterType];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    setFilter(filterType, newValues);
  };
  
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center gap-4 flex-wrap">
        <span className="text-sm font-medium text-gray-700">Filters:</span>
        
        {/* Environment Filter */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-500">Environment:</label>
          <div className="flex gap-1">
            {environments.map(env => (
              <button
                key={env}
                onClick={() => toggleFilter('environments', env)}
                className={`
                  px-2 py-1 text-xs rounded border transition-colors
                  ${filters.environments.includes(env)
                    ? 'bg-blue-500 text-white border-blue-600'
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                  }
                `}
              >
                {env}
              </button>
            ))}
          </div>
        </div>
        
        {/* Owner Filter */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-500">Owner:</label>
          <select
            value=""
            onChange={(e) => {
              if (e.target.value) {
                toggleFilter('owners', e.target.value);
              }
            }}
            className="px-2 py-1 text-xs border border-gray-300 rounded bg-white"
          >
            <option value="">Select owner...</option>
            {owners.map(owner => (
              <option key={owner} value={owner}>{owner}</option>
            ))}
          </select>
        </div>
        
        {/* Tags Filter */}
        {filters.tags.length > 0 && (
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-500">Tags:</label>
            <div className="flex gap-1">
              {filters.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs rounded text-white flex items-center gap-1"
                  style={{ backgroundColor: tagColors[tag] || '#6B7280' }}
                >
                  {tag}
                  <button
                    onClick={() => toggleFilter('tags', tag)}
                    className="hover:bg-white/20 rounded"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Issues Filter */}
        <button
          onClick={toggleIssuesFilter}
          className={`
            px-3 py-1 text-xs rounded border flex items-center gap-1 transition-colors
            ${filters.showIssuesOnly
              ? 'bg-red-500 text-white border-red-600'
              : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
            }
          `}
        >
          <AlertTriangle className="w-3 h-3" />
          Issues Only
        </button>
        
        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-3 py-1 text-xs text-gray-600 hover:text-gray-900 underline"
          >
            Clear all filters
          </button>
        )}
      </div>
      
      {/* Active Owner Filters */}
      {filters.owners.length > 0 && (
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-gray-500">Active owners:</span>
          <div className="flex gap-1">
            {filters.owners.map(owner => (
              <span
                key={owner}
                className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700 flex items-center gap-1"
              >
                {owner}
                <button
                  onClick={() => toggleFilter('owners', owner)}
                  className="hover:bg-blue-200 rounded"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
