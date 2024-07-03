import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/Home';
import NavBar from './components/NavBar';
import Products from './components/Product';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Cart from './components/Cart';
import CheckOut from './components/CheckOut';  
import Login from './components/Login';  
import Signup from './components/SignUp';  
import { CartProvider } from './components/CartContext';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("access_token", token);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setLoggedIn(false);
  };

  return (
    <CartProvider>
      <Router>
        <NavBar setSearchQuery={setSearchQuery} loggedIn={loggedIn} onLogout={handleLogout} />
        <Routes>
          {/* Routes accessible to all users */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products searchQuery={searchQuery} />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />

          {/* Route for non-logged in users */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected route for checkout */}
          <Route 
            path="/checkout" 
            element={loggedIn ? <CheckOut /> : <Navigate to="/login" />} 
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}