import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../components/CartContext.jsx';
import Cart from './Cart.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import Pagination from '../components/Pagination.jsx';
import CategorySelector from '../components/CategorySelector.jsx';

const Products = ({ searchQuery }) => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { cartItems, addToCart } = useContext(CartContext);

  const itemsPerPage = 12;

  const toggleCart = () => {
    setShowModal(!showModal);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category_id === parseInt(selectedCategory));

  const searchedProducts = searchQuery
    ? filteredProducts.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : filteredProducts;

  const totalPages = Math.ceil(searchedProducts.length / itemsPerPage);
  const paginatedProducts = searchedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch('http://localhost:5000/products'),
          fetch('http://localhost:5000/categories')
        ]);

        const productsData = await productsResponse.json();
        const categoriesData = await categoriesResponse.json();

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching products and categories:', error);
      }
    };

    fetchProductsAndCategories();
  }, []);

  const openQuickView = (product) => {
    setSelectedProduct(product);
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
  };

  const formatPrice = (price) => `kshs ${price.toFixed(2)}`;

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
      {/* Filter Panel */}
      <CategorySelector
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
        categories={categories}
      />

      {/* Product Grid */}
      <div className="md:w-3/4 p-4 sm:px-6 lg:px-10 xl:px-20">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl uppercase font-bold mt-10 mb-8">Shop</h1>
          <button
            className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700"
            onClick={toggleCart}
          >
            Cart ({cartItems.length})
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedProducts.map((product, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 sm:p-6 relative group"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={product.imageUrl}
                alt={product.imageAlt}
                className="rounded-md h-48 object-cover w-full"
              />
              <div className="mt-4">
                <h1 className="font-bold text-sm sm:text-base">{product.name}</h1>
                <p className="text-gray-700 text-xs sm:text-sm">{formatPrice(product.price)}</p>
                <p className="text-gray-700 text-xs sm:text-sm">{product.is_in_stock ? 'In Stock' : 'Out of Stock'}</p>
                <p className="text-gray-700 text-xs sm:text-sm">{product.rating}</p>
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
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Cart Modal */}
      <Cart showModal={showModal} toggle={toggleCart} />

      {/* Quick View Modal */}
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
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.imageAlt}
                className="rounded-md h-48 object-cover w-full mb-4"
              />
              <h3 className="text-lg font-bold">{selectedProduct.name}</h3>
              <p className="text-gray-700">{formatPrice(selectedProduct.price)}</p>
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
};

export default Products;
