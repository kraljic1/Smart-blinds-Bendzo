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
    const commonFilters = ['colors', 'operations', 'backingColors'];
    
    switch(categoryId) {
      case 'roller':
        return filterGroups.filter(group => 
          commonFilters.includes(group.id) || 
          ['fabricTypes', 'collections'].includes(group.id)
        );
      case 'zebra':
        return filterGroups.filter(group => 
          commonFilters.includes(group.id) || 
          ['collections'].includes(group.id)
        );
      case 'curtain':
        return filterGroups.filter(group => 
          commonFilters.includes(group.id) || 
          ['collections'].includes(group.id)
        );
      case 'accessories':
        return filterGroups.filter(group => 
          ['collections'].includes(group.id)
        );
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