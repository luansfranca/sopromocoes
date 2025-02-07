import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CategoryList } from './components/CategoryList';
import { ProductCarousel } from './components/ProductCarousel';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { Toaster } from 'react-hot-toast';
import { supabase } from './lib/supabase';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [otherProducts, setOtherProducts] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      let categoryId = null;
      
      if (selectedCategory) {
        const { data: categoryData } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', selectedCategory)
          .single();
        
        if (categoryData) {
          categoryId = categoryData.id;
        }
      }

      let featuredQuery = supabase
        .from('products')
        .select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(10);

      let othersQuery = supabase
        .from('products')
        .select('*')
        .eq('is_featured', false)
        .order('created_at', { ascending: false })
        .limit(10);

      if (categoryId) {
        featuredQuery = featuredQuery.eq('category_id', categoryId);
        othersQuery = othersQuery.eq('category_id', categoryId);
      }

      const [{ data: featured }, { data: others }] = await Promise.all([
        featuredQuery,
        othersQuery
      ]);

      setFeaturedProducts(featured || []);
      setOtherProducts(others || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .ilike('title', `%${query}%`)
        .order('is_featured', { ascending: false })
        .limit(20);

      if (error) throw error;
      setSearchResults(data || []);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSearchResults(null);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Toaster position="top-center" />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} onSearch={handleSearch} />
      <CategoryList onCategorySelect={handleCategorySelect} />
      
      <main className="container mx-auto px-4 py-8">
        {searchResults ? (
          <section className="mb-12">
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Resultados da Pesquisa
            </h2>
            <ProductCarousel products={searchResults} darkMode={darkMode} />
          </section>
        ) : (
          <>
            <section className="mb-12">
              <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {selectedCategory ? `Ofertas em Destaque - ${selectedCategory}` : 'Ofertas em Destaque'}
              </h2>
              <ProductCarousel products={featuredProducts} darkMode={darkMode} />
            </section>

            <section className="mb-12">
              <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {selectedCategory ? `Outras Ofertas - ${selectedCategory}` : 'Outras Ofertas'}
              </h2>
              <ProductCarousel products={otherProducts} darkMode={darkMode} />
            </section>
          </>
        )}
      </main>

      <Footer darkMode={darkMode} />
      <ScrollToTop darkMode={darkMode} />
    </div>
  );
}

export default App;