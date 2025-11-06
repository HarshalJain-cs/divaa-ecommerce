/**
 * @component ProductSort
 * @description Sort dropdown for product listings
 */
import { ChevronDown } from 'lucide-react';

export interface SortOption {
  value: string;
  label: string;
}

interface ProductSortProps {
  options: SortOption[];
  selectedValue: string;
  onChange: (value: string) => void;
}

export default function ProductSort({
  options,
  selectedValue,
  onChange,
}: ProductSortProps) {
  return (
    <div className="relative inline-block">
      <label htmlFor="sort-select" className="sr-only">
        Sort products
      </label>
      <div className="relative">
        <select
          id="sort-select"
          value={selectedValue}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-pink focus:border-transparent cursor-pointer"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </div>
  );
}
