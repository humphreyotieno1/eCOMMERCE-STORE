import React from 'react';

export default function CategorySidebar({ selectedCategory, onCategoryChange }) {
  const categories = [
    'All',
    'Construction',
    'Fencing',
    'Plumbing',
    'Flooring',
    'Welding',
    'Paint',
    'Timber'
  ];

  return (
    <div className="bg-gray-200 p-4 rounded">
      <h3 className="text-lg font-bold mb-2">Categories</h3>
      <ul>
        {categories.map((category, index) => (
          <li key={index} className={`cursor-pointer ${selectedCategory === category ? 'font-bold' : ''}`} onClick={() => onCategoryChange(category)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
