import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../components/CartContext.jsx';
import Cart from './Cart.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import Pagination from '../components/Pagination.jsx';


export default function Products({ searchQuery }) {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const { cartItems, addToCart } = useContext(CartContext);

  const toggleCart = () => {
    setShowModal(!showModal);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);
  
  const searchedProducts = searchQuery
    ? filteredProducts.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : filteredProducts;

  const totalPages = Math.ceil(searchedProducts.length / itemsPerPage);
  const paginatedProducts = searchedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const openQuickView = (product) => {
    setSelectedProduct(product);
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };
    fetchProducts();
    }, []);

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
      <div className="md:w-1/4 p-4 bg-white shadow-md">
        <h2 className="text-xl font-bold mb-4">Filter by Category</h2>
        <select
          className="w-full px-4 py-2 border rounded mb-4"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Construction">Construction</option>
          <option value="Fencing">Fencing</option>
          <option value="Flooring">Flooring</option>
          <option value="Timber">Timber</option>
          <option value="Paint">Paint</option>
          <option value="Iron Sheets">Iron Sheets</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Welding">Welding</option>
        </select>
      </div>
      <div className="md:w-3/4 p-4 sm:px-10 lg:px-20">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl uppercase font-bold mt-10 mb-10">Shop</h1>
          <button
            className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700"
            onClick={toggleCart}
          >
            Cart ({cartItems.length})
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {paginatedProducts.map((product, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4 sm:p-6 relative group">
              <img src={product.imageUrl} alt={product.imageAlt} className="rounded-md h-48 object-cover w-full" />
              <div className="mt-4">
                <h1 className="text-lg uppercase font-bold">{product.name}</h1>
                <p className="mt-2 text-gray-600 text-sm">{product.description.slice(0, 40)}...</p>
                <p className="mt-2 text-gray-600">{product.formattedPrice}</p>
                <span className="block mt-2 text-sm text-gray-500">{product.category}</span>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <button
                  className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700"
                  onClick={() => {
                    addToCart(product);
                  }}
                >
                  Add to cart
                </button>
                <div className="flex items-center">
                  <span className="text-gray-700 mr-1">{product.rating}</span>
                  <svg
                    className="w-4 h-4 fill-current text-yellow-500"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10 1.67l2.72 5.51h6.56l-4.76 4.63 1.13 6.57-5.63-3-5.63 3 1.13-6.57-4.76-4.63h6.56l2.72-5.51z"
                    />
                  </svg>
                  <span className="text-gray-700 ml-1">({product.numReviews})</span>
                </div>
              </div>
              <div className="absolute bottom-4 right-4">
                <button
                  className="px-4 py-2 bg-white text-gray-800 text-xs font-bold uppercase rounded shadow-md group-hover:visible invisible"
                  onClick={() => openQuickView(product)}
                >
                  Quick View
                </button>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <Cart showModal={showModal} toggle={toggleCart} />

        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeQuickView}
            >
              <motion.div
                className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold mb-4">{selectedProduct.name}</h2>
                <img src={selectedProduct.imageUrl} alt={selectedProduct.imageAlt} className="w-full h-auto rounded-md" />
                <p className="mt-4">{selectedProduct.description}</p>
                <p className="mt-2 text-gray-600">{selectedProduct.formattedPrice}</p>
                <p className="mt-2 text-gray-600">Category: {selectedProduct.category}</p>
                <div className="mt-4 flex justify-end">
                  <button
                    className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700"
                    onClick={closeQuickView}
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
