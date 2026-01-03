import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Search as SearchIcon, ArrowRight } from 'lucide-react';
import { searchData, SearchResult } from '../searchData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Search logic
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const searchTerm = query.toLowerCase();
    const filtered = searchData.filter(item =>
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm)
    );

    setResults(filtered);
  }, [query]);

  const handleResultClick = (path: string) => {
    navigate(path);
    onClose();
    setQuery('');
    setResults([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input */}
        <div className="p-6 border-b border-stone-200">
          <div className="flex items-center gap-4">
            <SearchIcon className="w-6 h-6 text-stone-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for pages, events, history, ecology..."
              className="flex-1 text-lg outline-none text-stone-900 placeholder:text-stone-400"
            />
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div className="max-h-[500px] overflow-y-auto">
          {query.trim() === '' ? (
            <div className="p-8 text-center text-stone-500">
              <SearchIcon className="w-12 h-12 mx-auto mb-4 text-stone-300" />
              <p className="text-sm">Start typing to search the site...</p>
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                <span className="text-xs bg-stone-100 px-3 py-1 rounded-full text-stone-600">History</span>
                <span className="text-xs bg-stone-100 px-3 py-1 rounded-full text-stone-600">Ecology</span>
                <span className="text-xs bg-stone-100 px-3 py-1 rounded-full text-stone-600">Events</span>
                <span className="text-xs bg-stone-100 px-3 py-1 rounded-full text-stone-600">Volunteer</span>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleResultClick(result.path)}
                  className="w-full text-left px-6 py-4 hover:bg-stone-50 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                          {result.category}
                        </span>
                      </div>
                      <h3 className="font-bold text-stone-900 mb-1 group-hover:text-emerald-700 transition-colors">
                        {result.title}
                      </h3>
                      <p className="text-sm text-stone-600 line-clamp-2">
                        {result.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-stone-400 group-hover:text-emerald-700 transition-colors shrink-0" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-stone-500">
              <p className="text-sm">No results found for "{query}"</p>
              <p className="text-xs mt-2 text-stone-400">Try searching for events, history, ecology, or volunteer</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {results.length > 0 && (
          <div className="px-6 py-3 bg-stone-50 border-t border-stone-200 text-xs text-stone-500 flex items-center justify-between">
            <span>{results.length} result{results.length !== 1 ? 's' : ''} found</span>
            <span className="text-stone-400">Press ESC to close</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
