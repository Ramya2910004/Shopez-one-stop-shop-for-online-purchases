import React from 'react';
import './FilterSortBar.css';

const FilterSortBar = ({ 
  selectedCategory, 
  onCategoryChange, 
  selectedBrand, 
  onBrandChange, 
  selectedSort, 
  onSortChange,
  categories,
  brands,
  sortOptions 
}) => {
  return (
    <div className="filter-sort-bar">
      <div className="filter-group">
        <label htmlFor="category-filter">Category:</label>
        <select 
          id="category-filter"
          value={selectedCategory} 
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="brand-filter">Brand:</label>
        <select 
          id="brand-filter"
          value={selectedBrand} 
          onChange={(e) => onBrandChange(e.target.value)}
        >
          {brands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-select">Sort by:</label>
        <select 
          id="sort-select"
          value={selectedSort} 
          onChange={(e) => onSortChange(e.target.value)}
        >
          {sortOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterSortBar; 