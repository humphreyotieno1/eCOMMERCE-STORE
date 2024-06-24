import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar({ setSearchQuery }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(query);
  };

  return (
    <div className="bg-gray-800 text-white px-4">
      <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center text-xl font-bold">
          <img src="/vite.svg" alt="Geocel Logo" className="h-8 w-auto mr-2" />
          GEOCEL ENTERPRISES
        </Link>

        <div className="hidden md:flex justify-center flex-1">
          <Link to="/" className="mx-4">Home</Link>
          <Link to="/products" className="mx-4">Products</Link>
          <Link to="/services" className="mx-4">Services</Link>
          <Link to="/about" className="mx-4">About</Link>
          <Link to="/contact" className="mx-4">Contact</Link>
        </div>

        <form onSubmit={handleSearchSubmit} className="hidden md:flex">
          <input
            type="text"
            value={query}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="px-2 py-1 text-black rounded"
          />
          <button type="submit" className="ml-2 px-2 py-1 bg-blue-500 rounded hover:bg-blue-600">
            Search
          </button>
        </form>

        <button className="md:hidden flex items-center" onClick={toggleDropdown}>
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <Link to="/" className="block px-4 py-2">Home</Link>
          <Link to="/products" className="block px-4 py-2">Products</Link>
          <Link to="/services" className="block px-4 py-2">Services</Link>
          <Link to="/about" className="block px-4 py-2">About</Link>
          <Link to="/contact" className="block px-4 py-2">Contact</Link>
          <form onSubmit={handleSearchSubmit} className="px-4 py-2">
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="px-2 py-1 text-black rounded w-full"
            />
            <button type="submit" className="mt-2 w-full px-2 py-1 bg-blue-500 rounded hover:bg-blue-600">
              Search
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

