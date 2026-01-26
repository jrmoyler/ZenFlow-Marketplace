import React, { useState, useEffect, useRef } from 'react';
import SearchIcon from './icons/SearchIcon';
import XIcon from './icons/XIcon';
import { products } from '../constants';
import SearchSuggestions from './SearchSuggestions';
import ZenFlowLogo from './icons/ZenFlowLogo';

interface HeaderProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  onNavigate: (view: 'marketplace' | 'about') => void;
  currentView: 'marketplace' | 'about';
}

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearch, onNavigate, currentView }) => {
    const [localQuery, setLocalQuery] = useState(searchQuery);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchContainerRef = useRef<HTMLDivElement>(null);

    const suggestions = localQuery.length > 1 
        ? products.filter(p => p.name.toLowerCase().includes(localQuery.toLowerCase())).slice(0, 5)
        : [];

    useEffect(() => {
        setLocalQuery(searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setLocalQuery(newQuery);
        onSearch(newQuery);
        if (newQuery.length > 1) {
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch(localQuery);
            setShowSuggestions(false);
            e.currentTarget.blur();
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
            e.currentTarget.blur();
        }
    };

    const handleClearSearch = () => {
        setLocalQuery('');
        onSearch('');
        setShowSuggestions(false);
    };

    const handleSuggestionClick = (productName: string) => {
        setLocalQuery(productName);
        onSearch(productName);
        setShowSuggestions(false);
    }
    
    return (
        <header className="bg-slate-800/50 sticky top-0 z-40 border-b border-slate-700 backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    
                    {/* Left Navigation */}
                    <div className="flex-1">
                        <nav className="hidden md:flex items-center gap-6">
                            <button onClick={() => onNavigate('marketplace')} className={`text-lg font-medium transition-colors ${currentView === 'marketplace' ? 'text-primary-400' : 'text-slate-300 hover:text-primary-400'}`}>
                                Marketplace
                            </button>
                            <button onClick={() => onNavigate('about')} className={`text-lg font-medium transition-colors ${currentView === 'about' ? 'text-primary-400' : 'text-slate-300 hover:text-primary-400'}`}>
                                About
                            </button>
                        </nav>
                    </div>

                    {/* Center Logo */}
                    <div className="flex-shrink-0">
                         <button onClick={() => onNavigate('marketplace')} aria-label="ZenFlow Marketplace Home">
                            <ZenFlowLogo className="h-16 w-auto" />
                        </button>
                    </div>

                    {/* Right Search Bar */}
                    <div className="flex-1 flex justify-end">
                        {currentView === 'marketplace' && (
                            <div className="relative" ref={searchContainerRef}>
                                <div className="relative">
                                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={localQuery}
                                        onChange={handleInputChange}
                                        onKeyDown={handleKeyDown}
                                        onFocus={() => localQuery.length > 1 && setShowSuggestions(true)}
                                        className="w-full md:w-64 bg-slate-800 border border-slate-600 rounded-lg py-2 pl-10 pr-10 text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                                        aria-label="Search products"
                                        aria-controls="search-suggestions"
                                        aria-expanded={showSuggestions}
                                    />
                                    {localQuery && (
                                        <button onClick={handleClearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white" aria-label="Clear search">
                                            <XIcon className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                                {showSuggestions && <SearchSuggestions suggestions={suggestions} query={localQuery} onSuggestionClick={handleSuggestionClick} />}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;