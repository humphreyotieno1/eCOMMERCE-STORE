import React from 'react';

const CategorySelector = ({ selectedCategory, handleCategoryChange, categories }) => {
  return (
    <div className="md:w-1/4 p-4 bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4">Filter by Category</h2>
      <select
        className="w-full px-4 py-2 border rounded mb-4"
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
      >
        <option value="All">All</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelector;
