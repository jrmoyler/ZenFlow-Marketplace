import React from 'react';

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc';

interface SortControlsProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'Popularity' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name (A-Z)' },
];


const SortControls: React.FC<SortControlsProps> = ({ currentSort, onSortChange }) => {
  return (
    <div className="flex flex-col items-start space-y-1">
      {sortOptions.map(option => (
        <button
          key={option.value}
          onClick={() => onSortChange(option.value)}
          aria-pressed={currentSort === option.value}
          className={`w-full text-left py-2 text-sm transition-colors duration-200 ${
            currentSort === option.value
              ? 'text-primary-400 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default SortControls;