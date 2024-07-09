import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item, type) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id && cartItem.type === type);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id && cartItem.type === type ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1, type }];
      }
    });
  };

  const removeFromCart = (id, type) => {
    setCartItems(cartItems.filter(cartItem => cartItem.id !== id || cartItem.type !== type));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateQuantity = (id, quantity, type) => {
    setCartItems(prevItems =>
      prevItems.map(cartItem =>
        cartItem.id === id && cartItem.type === type ? { ...cartItem, quantity } : cartItem
      )
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
