/**
 * @component ProductFilters
 * @description Filter sidebar for product listing pages
 */
import { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterSection {
  id: string;
  title: string;
  options: { value: string; label: string; count?: number }[];
}

interface ProductFiltersProps {
  filters: FilterSection[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (filterId: string, value: string) => void;
  onClearAll: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function ProductFilters({
  filters,
  selectedFilters,
  onFilterChange,
  onClearAll,
  isOpen = true,
  onClose,
}: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(
    filters.map((f) => f.id)
  );

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const hasActiveFilters = Object.values(selectedFilters).some(
    (values) => values.length > 0
  );

  return (
    <div
      className={`bg-white border-r border-gray-200 h-full overflow-y-auto ${
        isOpen ? 'block' : 'hidden'
      } md:block`}
    >
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <button
              onClick={onClearAll}
              className="text-sm text-rose-pink hover:text-rose-pink-light transition-colors"
            >
              Clear All
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-1 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Sections */}
      <div className="p-4 space-y-6">
        {filters.map((section) => {
          const isExpanded = expandedSections.includes(section.id);
          const sectionFilters = selectedFilters[section.id] || [];

          return (
            <div key={section.id} className="border-b border-gray-200 pb-6 last:border-0">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between py-2 text-left"
              >
                <span className="font-medium text-gray-900">{section.title}</span>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {/* Section Options */}
              {isExpanded && (
                <div className="mt-3 space-y-3">
                  {section.options.map((option) => {
                    const isSelected = sectionFilters.includes(option.value);

                    return (
                      <label
                        key={option.value}
                        className="flex items-center space-x-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onFilterChange(section.id, option.value)}
                          className="w-4 h-4 text-rose-pink border-gray-300 rounded focus:ring-rose-pink focus:ring-2"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900 flex-1">
                          {option.label}
                        </span>
                        {option.count !== undefined && (
                          <span className="text-xs text-gray-500">({option.count})</span>
                        )}
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
