'use client';
import { useState } from 'react';
import { FunnelSimple } from 'phosphor-react';

const DropdownC = ({ handleSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownOptions = [
    { value: 'priceLowest', label: 'Price (Lowest first)' },
    { value: 'priceHighest', label: 'Price (Highest first)' },
    { value: 'stockLowest', label: 'Stock (Lowest first)' },
    { value: 'stockHighest', label: 'Stock (Highest first)' },
    { value: 'nameAZ', label: 'Name (A-Z)' },
    { value: 'dateAsc', label: 'Date (Ascending)' },
    { value: 'dateDesc', label: 'Date (Descending)' },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value) => {
    handleSortChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button onClick={toggleDropdown} className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
          <FunnelSimple size={24} />
          <span className="ml-2">Sort by</span>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {dropdownOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                role="menuitem"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownC;
