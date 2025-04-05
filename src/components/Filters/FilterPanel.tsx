import { FC } from 'react';
import { FilterState, ProductFilters } from '../../types/filter';
import { filterGroups } from '../../data/filterData';
import FilterGroup from './FilterGroup';
import '../../styles/FilterPanel.css';

interface FilterPanelProps {
  filterState: FilterState;
  className?: string;
  categoryId?: string;
}

const FilterPanel: FC<FilterPanelProps> = ({ 
  filterState, 
  className = '',
  categoryId = 'all'
}) => {
  const { filters, setFilter, resetFilters } = filterState;

  const handleFilterChange = (groupId: keyof ProductFilters, value: string, checked: boolean) => {
    setFilter(groupId, value, checked);
  };

  const hasActiveFilters = Object.values(filters).some(group => group.length > 0);

  const getVisibleFilterGroups = () => {
    const commonFilters = ['colors'];
    
    switch(categoryId) {
      case 'roller':
        return filterGroups.filter(group => {
          // Include common filters and fabric types
          if (commonFilters.includes(group.id) || group.id === 'fabricTypes') {
            return true;
          }
          
          // For collections, only include roller collections
          if (group.id === 'collections') {
            return group.options.some(option => 
              ['Essential', 'Comfort', 'Classic', 'Solar', 'Screen', 'Texture'].includes(option.value)
            );
          }
          
          return false;
        });
      case 'zebra':
        return filterGroups.filter(group => {
          // Include common filters
          if (commonFilters.includes(group.id)) {
            return true;
          }
          
          // For collections, only include zebra collections
          if (group.id === 'collections') {
            return group.options.some(option => 
              ['Balance', 'Pure', 'Accent'].includes(option.value)
            );
          }
          
          return false;
        });
      case 'curtain':
        return filterGroups.filter(group => 
          commonFilters.includes(group.id)
        );
      case 'accessories':
        // Return empty array for accessories - no filters shown
        return [];
      case 'all':
      default:
        return filterGroups;
    }
  };

  const visibleFilterGroups = getVisibleFilterGroups();

  return (
    <div className={`filter-panel ${className}`}>
      {visibleFilterGroups.map(group => (
        <FilterGroup
          key={group.id}
          group={group}
          selectedValues={filters[group.id as keyof ProductFilters]}
          onChange={(value, checked) => 
            handleFilterChange(group.id as keyof ProductFilters, value, checked)
          }
        />
      ))}
      
      {hasActiveFilters && (
        <button
          className="reset-button"
          onClick={resetFilters}
        >
          Reset Filters
        </button>
      )}
    </div>
  );
};

export default FilterPanel; 