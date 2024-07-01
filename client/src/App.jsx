import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home';
import NavBar from './components/NavBar';
import Products from './components/Product';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Cart from './components/Cart';
import { CartProvider } from './components/CartContext';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <CartProvider>
      <Router>
        <NavBar setSearchQuery={setSearchQuery} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products searchQuery={searchQuery} />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
