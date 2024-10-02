"use client"

import React, { useState } from 'react';
import style from './style.module.scss';
import { redirect } from 'next/navigation';
import Link from 'next/link';

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
              className={style.checkbox}
            />
            {category}
          </label>
        </div>
      ))}
      <div className={style.Buttons}>
      <button onClick={handleApplyFilters}>Apply Filters</button>
      <Link href={"/products"}><button>Reset Filters</button></Link>
      </div>
    </div>
  );
};

export default FilterCheckbox;
