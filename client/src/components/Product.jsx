import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../components/CartContext.jsx';
import Cart from './Cart.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import Pagination from '../components/Pagination.jsx';

// Sample product data
const initialProducts = [
  {
    imageUrl: 'https://res.cloudinary.com/drdradtyj/image/upload/v1718628397/GEOCEL/Bamburi_Fundi.jpg',
    imageAlt: 'Bamburi Fundi Cement',
    category: 'Construction',
    quantity: 10,
    price: 760.0,
    description:
      'Bamburi Fundi Cement is a hydraulic cement designed for use in mortars for masonry construction. Plastering, rendering, stucco, brick laying, screeding and others.',
    name: 'Bamburi Fundi Cement',
    formattedPrice: 'kshs 760.00',
    rating: 4,
    numReviews: 10,
  },
  {
    imageUrl: 'https://res.cloudinary.com/drdradtyj/image/upload/v1718629096/GEOCEL/Steel_Nail_3%22.jpg',
    imageAlt: 'Nails 3 inches',
    category: 'Fencing',
    quantity: 50,
    price: 250.0,
    description: 'High-quality 3-inch nails for various construction needs.',
    name: 'Per Kg Nails 3 inches',
    formattedPrice: 'kshs 250.00',
    rating: 4.5,
    numReviews: 30,
  },
  {
    imageUrl: 'https://res.cloudinary.com/drdradtyj/image/upload/v1718627953/GEOCEL/Juakali_wheelbarrow.jpg',
    imageAlt: 'Wheelbarrow',
    category: 'Construction',
    quantity: 5,
    price: 2500.0,
    description: 'Sturdy wheelbarrow for transporting materials around the construction site.',
    name: 'Wheelbarrow',
    formattedPrice: 'kshs 2500.00',
    rating: 4.8,
    numReviews: 15,
  },
  {
    imageUrl: 'https://res.cloudinary.com/drdradtyj/image/upload/v1718629200/GEOCEL/Shovel.jpg',
    imageAlt: 'Shovel',
    category: 'Construction',
    quantity: 20,
    price: 1200.0,
    description: 'Durable shovel for digging and moving bulk materials.',
    name: 'Shovel',
    formattedPrice: 'kshs 1200.00',
    rating: 4.6,
    numReviews: 25,
  },
  {
    imageUrl: 'https://res.cloudinary.com/drdradtyj/image/upload/v1718629253/GEOCEL/Hammer.jpg',
    imageAlt: 'Hammer',
    category: 'Construction',
    quantity: 15,
    price: 800.0,
    description: 'Heavy-duty hammer for all your construction needs.',
    name: 'Hammer',
    formattedPrice: 'kshs 800.00',
    rating: 4.7,
    numReviews: 22,
  },
  {
    imageUrl: 'https://res.cloudinary.com/drdradtyj/image/upload/v1718628397/GEOCEL/Bamburi_Fundi.jpg',
    imageAlt: 'Bamburi Fundi Cement',
    category: 'Construction',
    quantity: 10,
    price: 760.0,
    description:
      'Bamburi Fundi Cement is a hydraulic cement designed for use in mortars for masonry construction. Plastering, rendering, stucco, brick laying, screeding and others.',
    name: 'Bamburi Fundi Cement',
    formattedPrice: 'kshs 760.00',
    rating: 4,
    numReviews: 10,
  },
  {
    imageUrl: 'https://res.cloudinary.com/drdradtyj/image/upload/v1718629096/GEOCEL/Steel_Nail_3%22.jpg',
    imageAlt: 'Nails 3 inches',
    category: 'Fencing',
    quantity: 50,
    price: 250.0,
    description: 'High-quality 3-inch nails for various construction needs.',
    name: 'Per Kg Nails 3 inches',
    formattedPrice: 'kshs 250.00',
    rating: 4.5,
    numReviews: 30,
  },
  {
    imageUrl: 'https://res.cloudinary.com/drdradtyj/image/upload/v1718627953/GEOCEL/Juakali_wheelbarrow.jpg',
    imageAlt: 'Wheelbarrow',
    category: 'Construction',
    quantity: 5,
    price: 2500.0,
    description: 'Sturdy wheelbarrow for transporting materials around the construction site.',
    name: 'Wheelbarrow',
    formattedPrice: 'kshs 2500.00',
    rating: 4.8,
    numReviews: 15,
  },
  {
    imageUrl: 'https://res.cloudinary.com/drdradtyj/image/upload/v1718629200/GEOCEL/Shovel.jpg',
    imageAlt: 'Shovel',
    category: 'Construction',
    quantity: 20,
    price: 1200.0,
    description: 'Durable shovel for digging and moving bulk materials.',
    name: 'Shovel',
    formattedPrice: 'kshs 1200.00',
    rating: 4.6,
    numReviews: 25,
  },
  {
    imageUrl: 'https://res.cloudinary.com/drdradtyj/image/upload/v1718629253/GEOCEL/Hammer.jpg',
    imageAlt: 'Hammer',
    category: 'Construction',
    quantity: 15,
    price: 800.0,
    description: 'Heavy-duty hammer for all your construction needs.',
    name: 'Hammer',
    formattedPrice: 'kshs 800.00',
    rating: 4.7,
    numReviews: 22,
  },
  {
    imageUrl: 'https://res.cloudinary.com/drdradtyj/image/upload/v1718628397/GEOCEL/Bamburi_Fundi.jpg',
    imageAlt: 'Bamburi Fundi Cement',
    category: 'Construction',
    quantity: 10,
    price: 760.0,
    description:
      'Bamburi Fundi Cement is a hydraulic cement designed for use in mortars for masonry construction. Plastering, rendering, stucco, brick laying, screeding and others.',
    name: 'Bamburi Fundi Cement',
    formattedPrice: 'kshs 760.00',
    rating: 4,
    numReviews: 10,
  },
  {
    imageUrl: 'https://res.cloudinary.com/drdradtyj/image/upload/v1718629096/GEOCEL/Steel_Nail_3%22.jpg',
    imageAlt: 'Nails 3 inches',
    category: 'Fencing',
    quantity: 50,
    price: 250.0,
    description: 'High-quality 3-inch nails for various construction needs.',
    name: 'Per Kg Nails 3 inches',
    formattedPrice: 'kshs 250.00',
    rating: 4.5,
    numReviews: 30,
  },
  {
    imageUrl: 'https://res.cloudinary.com/drdradtyj/image/upload/v1718627953/GEOCEL/Juakali_wheelbarrow.jpg',
    imageAlt: 'Wheelbarrow',
    category: 'Construction',
    quantity: 5,
    price: 2500.0,
    description: 'Sturdy wheelbarrow for transporting materials around the construction site.',
    name: 'Wheelbarrow',
    formattedPrice: 'kshs 2500.00',
    rating: 4.8,
    numReviews: 15,
  },
  {
    imageUrl: 'https://res.cloudinary.com/drdradtyj/image/upload/v1718629200/GEOCEL/Shovel.jpg',
    imageAlt: 'Shovel',
    category: 'Construction',
    quantity: 20,
    price: 1200.0,
    description: 'Durable shovel for digging and moving bulk materials.',
    name: 'Shovel',
    formattedPrice: 'kshs 1200.00',
    rating: 4.6,
    numReviews: 25,
  },
  {
    imageUrl: 'https://res.cloudinary.com/drdradtyj/image/upload/v1718629253/GEOCEL/Hammer.jpg',
    imageAlt: 'Hammer',
    category: 'Construction',
    quantity: 15,
    price: 800.0,
    description: 'Heavy-duty hammer for all your construction needs.',
    name: 'Hammer',
    formattedPrice: 'kshs 800.00',
    rating: 4.7,
    numReviews: 22,
  },
];

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
                <h1 className="font-bold text-sm sm:text-base">{product.name}</h1>
                <p className="text-gray-700 text-xs sm:text-sm">{product.formattedPrice}</p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => openQuickView(product)}
                  className="px-2 py-1 sm:px-4 sm:py-2 bg-gray-200 text-gray-700 text-xs sm:text-sm font-semibold rounded hover:bg-gray-300"
                >
                  Quick View
                </button>
                <button
                  onClick={() => addToCart(product)}
                  className="px-2 py-1 sm:px-4 sm:py-2 bg-gray-800 text-white text-xs sm:text-sm font-semibold rounded hover:bg-gray-700"
                >
                  Add to Cart
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
      </div>
      <Cart showModal={showModal} toggle={toggleCart} />
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeQuickView}
          >
            <motion.div
              className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg max-w-xs sm:max-w-md md:max-w-lg w-full mx-4"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Quick View</h2>
              <img src={selectedProduct.imageUrl} alt={selectedProduct.imageAlt} className="rounded-md h-48 object-cover w-full mb-4" />
              <h3 className="text-lg font-bold">{selectedProduct.name}</h3>
              <p className="text-gray-700">{selectedProduct.formattedPrice}</p>
              <p className="mt-2 text-sm sm:text-base">{selectedProduct.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => {
                    addToCart(selectedProduct);
                    closeQuickView();
                  }}
                  className="px-3 py-2 bg-gray-800 text-white text-sm font-semibold rounded hover:bg-gray-700"
                >
                  Add to Cart
                </button>
                <button
                  onClick={closeQuickView}
                  className="px-3 py-2 bg-gray-200 text-gray-700 text-sm font-semibold rounded hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
