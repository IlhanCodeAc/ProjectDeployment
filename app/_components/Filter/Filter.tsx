"use client"

import React, { useState } from 'react';
import style from './style.module.scss';

const categories = ['FPS', 'RPG', 'Open World'];

const FilterCheckbox = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCheckboxChange = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((cat) => cat !== category); 
      } else {
        return [...prev, category]; 
      }
    });
  };

  const handleApplyFilters = () => {
    const queryString = selectedCategories.length
      ? `?category=${selectedCategories.join(',')}`
      : '';
    window.location.href = queryString; 
  };

  return (
    <div className={style.filterCheckbox}>
      <h3>Filter by Category</h3>
      {categories.map((category) => (
        <div key={category}>
          <label>
            <input
              type="checkbox"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={() => handleCheckboxChange(category)}
            />
            {category}
          </label>
        </div>
      ))}
      <button onClick={handleApplyFilters}>Apply Filters</button>
    </div>
  );
};

export default FilterCheckbox;
