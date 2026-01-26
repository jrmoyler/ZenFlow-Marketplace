
import React, { useState, useMemo, useEffect } from 'react';
import { products } from './constants';
import { Product, ProductType } from './types';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import FilterBar from './components/FilterBar';
import Pagination from './components/Pagination';
import AboutPage from './components/AboutPage';
import { SortOption } from './components/SortControls';

const ITEMS_PER_PAGE = 6;

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<{ type: ProductType | 'all'; tags: string[] }>({ type: 'all', tags: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState<'marketplace' | 'about'>('marketplace');
  const [sortOption, setSortOption] = useState<SortOption>('default');

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    products.forEach(p => p.tags.forEach(t => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, []);

  const filteredProducts = useMemo(() => {
    const filtered = products.filter(product => {
      const searchMatch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const typeMatch = filters.type === 'all' || product.type === filters.type;

      const tagsMatch = filters.tags.length === 0 || filters.tags.every(tag => product.tags.includes(tag));

      return searchMatch && typeMatch && tagsMatch;
    });

    const sorted = [...filtered];

    switch (sortOption) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'default':
      default:
        // No sort needed, returns filtered list in original order (popularity)
        break;
    }

    return sorted;

  }, [searchQuery, filters, sortOption]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters, sortOption]);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  }

  const handleFilterChange = (newFilters: { type: ProductType | 'all'; tags: string[] }) => {
    setFilters(newFilters);
  };
  
  const handleSortChange = (newSort: SortOption) => {
    setSortOption(newSort);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  const handleNavigate = (newView: 'marketplace' | 'about') => {
    setView(newView);
    setSelectedProduct(null); // Ensure we're not stuck in detail view
  }

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen font-sans flex flex-col">
      <Header 
        searchQuery={searchQuery}
        onSearch={handleSearch}
        onNavigate={handleNavigate}
        currentView={view}
      />
      <main className="container mx-auto px-4 py-8 flex-grow">
        {selectedProduct ? (
          <ProductDetail product={selectedProduct} onBack={handleBack} />
        ) : view === 'marketplace' ? (
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            <aside className="lg:col-span-1 mb-8 lg:mb-0 lg:sticky top-24 h-fit">
              <FilterBar 
                allTags={allTags}
                filters={filters}
                onFilterChange={handleFilterChange}
                sortOption={sortOption}
                onSortChange={handleSortChange}
              />
            </aside>

            <div className="lg:col-span-3">
              {paginatedProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {paginatedProducts.map(product => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        onSelect={handleSelectProduct}
                        activeTags={filters.tags}
                        searchQuery={searchQuery}
                      />
                    ))}
                  </div>
                  {totalPages > 1 && (
                    <Pagination 
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  )}
                </>
              ) : (
                <div className="text-center py-16">
                  <h2 className="text-2xl font-bold text-slate-300">No Products Found</h2>
                  <p className="text-slate-400 mt-2">Try adjusting your search or filters.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <AboutPage />
        )}
      </main>
      <footer className="text-center py-6 text-sm text-slate-500 border-t border-slate-800">
        <p>&copy; {new Date().getFullYear()} ZenFlow Solutions. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
