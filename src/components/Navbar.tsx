import React, { useState } from 'react';
import { Sun, Moon, Search, Instagram, Youtube, Twitter, MessageCircle } from 'lucide-react';
import { Store } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  onSearch: (query: string) => void;
}

interface Product {
  id: string;
  title: string;
  image_url: string;
  marketplace_name: string;
}

export function Navbar({ darkMode, setDarkMode, onSearch }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setShowSuggestions(false);
  };

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.length > 0);
    
    if (value.length > 0) {
      onSearch(value);
      const { data } = await supabase
        .from('products')
        .select('id, title, image_url, marketplace_name')
        .ilike('title', `%${value}%`)
        .limit(5);
      setSearchResults(data || []);
    } else {
      setSearchResults([]);
      onSearch('');
    }
  };

  const handleSuggestionClick = (product: Product) => {
    setSearchQuery(product.title);
    onSearch(product.title);
    setShowSuggestions(false);
  };

  return (
    <nav className={`bg-orange-500 ${darkMode ? 'dark' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between py-4 md:h-16">
          <a href="/" className="flex items-center mb-4 md:mb-0">
            <Store className="h-8 w-8 text-white" />
            <span className="ml-2 text-3xl font-extrabold tracking-wider">
              <span className="text-white">SÓ</span>
              <span className="text-orange-500 bg-white border-[0.5px] border-white rounded-xl px-1">PROMOÇÕES</span>
            </span>
          </a>

          <form onSubmit={handleSearch} className="w-full md:flex-1 max-w-lg mx-4 mb-4 md:mb-0">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="PESQUISAR PRODUTOS..."
                className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Search className="h-5 w-5 text-gray-500" />
              </button>
              
              {showSuggestions && searchQuery && searchResults.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg">
                  <div className="py-2">
                    <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                      PESQUISANDO POR: "{searchQuery}"
                    </div>
                    <div className="p-2">
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => handleSuggestionClick(product)}
                          className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                        >
                          <img
                            src={product.image_url}
                            alt={product.title}
                            className="w-10 h-10 rounded-md object-cover"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-800">
                              {product.title}
                            </div>
                            <div className="text-xs text-gray-500">
                              {product.marketplace_name}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>

          <div className="flex items-center space-x-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="h-5 w-5 text-white hover:text-orange-200" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <Youtube className="h-5 w-5 text-white hover:text-orange-200" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="h-5 w-5 text-white hover:text-orange-200" />
            </a>
            <a
              href="https://chat.whatsapp.com/CSLykjjk3z50clHO2lo1O4"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-white text-orange-500 px-4 py-2 rounded-lg hover:bg-orange-100"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              RECEBA NADA DE PROMOÇÕES
            </a>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-orange-600"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-white" />
              ) : (
                <Moon className="h-5 w-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
