import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterSortBar from './FilterSortBar';
import ProductGrid from './ProductGrid';
import { categories, brands, sortOptions } from './data';
import { filterAndSortProducts } from './utils';
import './App.css';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Popularity');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [banners, setBanners] = useState([]);
  const [bannerIndex, setBannerIndex] = useState(0);

  // Fetch products and banners from MongoDB backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsRes, bannersRes] = await Promise.all([
          axios.get('http://localhost:6001/fetch-products'),
          axios.get('http://localhost:6001/fetch-banner')
        ]);
        setProducts(productsRes.data);
        setFilteredProducts(productsRes.data);
        // Support both string and array for banners
        if (Array.isArray(bannersRes.data)) {
          setBanners(bannersRes.data);
        } else if (typeof bannersRes.data === 'string') {
          setBanners([bannersRes.data]);
        } else {
          setBanners([]);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load products or banners. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter and sort products when filters change
  useEffect(() => {
    if (products.length > 0) {
      const filtered = filterAndSortProducts(
        products, 
        selectedCategory, 
        selectedBrand, 
        selectedSort
      );
      setFilteredProducts(filtered.slice(0, 5));
    }
  }, [selectedCategory, selectedBrand, selectedSort, products]);

  // Banner carousel effect
  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setBannerIndex((prev) => (prev + 1) % banners.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [banners]);

  if (loading) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>Product Listing</h1>
          <p>Loading products and banners from database...</p>
        </header>
        <main className="app-main">
          <div className="loading">Loading products...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>Product Listing</h1>
          <p>Error loading products or banners</p>
        </header>
        <main className="app-main">
          <div className="error">{error}</div>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Product Listing</h1>
      </header>
      {banners.length > 0 && (
        <div className="banner-carousel">
          <img
            src={banners[bannerIndex].startsWith('/') ? banners[bannerIndex] : banners[bannerIndex]}
            alt="Home Banner"
            className="home-banner-img"
          />
        </div>
      )}
      <main className="app-main">
        <FilterSortBar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedBrand={selectedBrand}
          onBrandChange={setSelectedBrand}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
          categories={categories}
          brands={brands}
          sortOptions={sortOptions}
        />
        <div className="results-info">
          <p>Showing {filteredProducts.length} products from database</p>
        </div>
        <ProductGrid products={filteredProducts} />
      </main>
    </div>
  );
};

export default App; 