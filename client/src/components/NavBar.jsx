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
}