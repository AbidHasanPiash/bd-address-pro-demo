'use client';

import { useState } from 'react';
import {
  search,
  quickSearch,
  searchDivisions,
  searchDistricts,
  searchUpazilas,
  autocomplete,
  fuzzySearch,
  searchBengali,
  searchEnglish,
} from 'bd-address-pro';

type SearchType = 'all' | 'divisions' | 'districts' | 'upazilas' | 'autocomplete' | 'fuzzy' | 'bengali' | 'english' | 'quick';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('all');
  const [results, setResults] = useState<object | null>(null);

  const handleSearch = () => {
    if (!query.trim()) {
      setResults(null);
      return;
    }

    let searchResults;
    switch (searchType) {
      case 'all':
        searchResults = search(query);
        break;
      case 'divisions':
        searchResults = searchDivisions(query);
        break;
      case 'districts':
        searchResults = searchDistricts(query);
        break;
      case 'upazilas':
        searchResults = searchUpazilas(query);
        break;
      case 'autocomplete':
        searchResults = autocomplete(query, { limit: 10 });
        break;
      case 'fuzzy':
        searchResults = fuzzySearch(query);
        break;
      case 'bengali':
        searchResults = searchBengali(query);
        break;
      case 'english':
        searchResults = searchEnglish(query);
        break;
      case 'quick':
        searchResults = quickSearch(query);
        break;
      default:
        searchResults = search(query);
    }
    setResults(searchResults);
  };

  const searchTypes: { value: SearchType; label: string; description: string }[] = [
    { value: 'all', label: 'Search All', description: 'Search across divisions, districts, and upazilas' },
    { value: 'quick', label: 'Quick Search', description: 'Returns first matching item of any type' },
    { value: 'divisions', label: 'Divisions Only', description: 'Search only in divisions' },
    { value: 'districts', label: 'Districts Only', description: 'Search only in districts' },
    { value: 'upazilas', label: 'Upazilas Only', description: 'Search only in upazilas' },
    { value: 'autocomplete', label: 'Autocomplete', description: 'Get autocomplete suggestions (prefix matching)' },
    { value: 'fuzzy', label: 'Fuzzy Search', description: 'Search with higher typo tolerance' },
    { value: 'bengali', label: 'Bengali Names', description: 'Search only in Bengali names' },
    { value: 'english', label: 'English Names', description: 'Search only in English names' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">Search Locations</h2>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Search Query
          </label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Try: Dhaka, সিলেট, Savar, Dahka (typo)..."
            className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Search Type
          </label>
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as SearchType)}
            className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            {searchTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-end">
          <button
            onClick={handleSearch}
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        {searchTypes.find(t => t.value === searchType)?.description}
      </p>

      {results && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Search Results</h3>
          <pre className="text-xs overflow-auto max-h-96 text-gray-700 dark:text-gray-300">
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">💡 Search Tips</h3>
        <ul className="text-sm text-yellow-700 dark:text-yellow-400 space-y-1">
          <li>• Try &quot;Dhaka&quot; or &quot;ঢাকা&quot; to find divisions and districts</li>
          <li>• Use &quot;Fuzzy Search&quot; for typo tolerance (e.g., &quot;Dahka&quot;)</li>
          <li>• Use &quot;Autocomplete&quot; for prefix matching (e.g., &quot;Dha&quot;)</li>
          <li>• &quot;Quick Search&quot; returns the first matching item only</li>
        </ul>
      </div>
    </div>
  );
}
