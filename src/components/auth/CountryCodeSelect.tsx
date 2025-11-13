/**
 * @component CountryCodeSelect
 * @description Searchable country code dropdown for phone authentication
 */

import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { CountryCodeOption, ALL_COUNTRIES, POPULAR_COUNTRIES } from '../../types/auth';

interface CountryCodeSelectProps {
  value: CountryCodeOption;
  onChange: (country: CountryCodeOption) => void;
  className?: string;
  disabled?: boolean;
}

const CountryCodeSelect = ({ value, onChange, className = '', disabled = false }: CountryCodeSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Focus search input when dropdown opens
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Filter countries based on search query
  const filteredCountries = ALL_COUNTRIES.filter((country) => {
    const query = searchQuery.toLowerCase();
    return (
      country.name.toLowerCase().includes(query) ||
      country.dialCode.includes(query) ||
      country.code.toLowerCase().includes(query)
    );
  });

  const handleSelect = (country: CountryCodeOption) => {
    onChange(country);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Selected Country Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="flex items-center gap-2 px-3 py-2.5 bg-white border-2 border-gray-900 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] min-w-[120px]"
      >
        <span className="text-2xl">{value.flag}</span>
        <span className="font-bold text-sm">{value.dialCode}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white border-2 border-gray-900 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50 overflow-hidden">
          {/* Search Input */}
          <div className="p-3 border-b-2 border-gray-900 bg-gray-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country..."
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold-dark font-medium text-sm"
              />
            </div>
          </div>

          {/* Countries List */}
          <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            {/* Popular Countries Section */}
            {!searchQuery && (
              <div className="border-b-2 border-gray-900">
                <div className="px-3 py-2 bg-gray-100 text-xs font-bold text-gray-600 uppercase tracking-wide">
                  Popular
                </div>
                {POPULAR_COUNTRIES.map((country) => (
                  <button
                    key={`popular-${country.code}`}
                    type="button"
                    onClick={() => handleSelect(country)}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-rose-gold-light transition-colors ${
                      value.code === country.code ? 'bg-rose-gold-light' : ''
                    }`}
                  >
                    <span className="text-2xl">{country.flag}</span>
                    <div className="flex-1 text-left">
                      <div className="font-bold text-sm text-gray-900">{country.name}</div>
                    </div>
                    <span className="font-bold text-sm text-gray-700">{country.dialCode}</span>
                  </button>
                ))}
              </div>
            )}

            {/* All Countries Section */}
            {!searchQuery && (
              <div className="px-3 py-2 bg-gray-100 text-xs font-bold text-gray-600 uppercase tracking-wide border-t-2 border-gray-900">
                All Countries
              </div>
            )}

            {/* Filtered Countries */}
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleSelect(country)}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-rose-gold-light transition-colors ${
                    value.code === country.code ? 'bg-rose-gold-light' : ''
                  }`}
                >
                  <span className="text-2xl">{country.flag}</span>
                  <div className="flex-1 text-left">
                    <div className="font-bold text-sm text-gray-900">{country.name}</div>
                  </div>
                  <span className="font-bold text-sm text-gray-700">{country.dialCode}</span>
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-gray-500">
                <p className="font-medium">No countries found</p>
                <p className="text-sm mt-1">Try a different search term</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryCodeSelect;
