
import React from 'react';
import { ProductType } from '../types';
import XIcon from './icons/XIcon';
import SortControls, { SortOption } from './SortControls';

interface FilterBarProps {
  allTags: string[];
  filters: { type: ProductType | 'all'; tags:string[] };
  onFilterChange: (filters: { type: ProductType | 'all'; tags: string[] }) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const productTypes: (ProductType | 'all')[] = ['all', ProductType.AGENT, ProductType.AUTOMATION, ProductType.WORKFLOW];

const FilterBar: React.FC<FilterBarProps> = ({ allTags, filters, onFilterChange, sortOption, onSortChange }) => {
  const handleTypeChange = (type: ProductType | 'all') => {
    onFilterChange({ ...filters, type });
  };

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    onFilterChange({ ...filters, tags: newTags });
  };

  const handleClearFilters = () => {
    onFilterChange({ type: 'all', tags: [] });
  };

  const areFiltersActive = filters.type !== 'all' || filters.tags.length > 0;

  return (
    <div className="" aria-label="Product Filters and Sorting">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-lg font-bold text-slate-100">Filters</h2>
        {areFiltersActive && (
          <button
            onClick={handleClearFilters}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors duration-200 uppercase tracking-wide font-medium"
            aria-label="Clear all filters"
          >
            <XIcon className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      <div className="space-y-10">
        {/* Sort Section */}
        <div role="group" aria-labelledby="sort-by-label">
          <h3 id="sort-by-label" className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Sort by</h3>
          <SortControls currentSort={sortOption} onSortChange={onSortChange} />
        </div>

        {/* Type Filter */}
        <div role="group" aria-labelledby="filter-by-type-label">
          <h3 id="filter-by-type-label" className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Type</h3>
          <div className="flex flex-col items-start space-y-1">
            {productTypes.map(type => (
              <button
                key={type}
                onClick={() => handleTypeChange(type)}
                aria-pressed={filters.type === type}
                className={`w-full text-left py-2 text-sm transition-colors duration-200 ${
                  filters.type === type
                    ? 'text-primary-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {type === 'all' ? 'All' : type}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tag Filter */}
        <div role="group" aria-labelledby="filter-by-tags-label">
          <h3 id="filter-by-tags-label" className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                aria-pressed={filters.tags.includes(tag)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 ${
                  filters.tags.includes(tag)
                    ? 'bg-primary-500/20 text-primary-400'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
