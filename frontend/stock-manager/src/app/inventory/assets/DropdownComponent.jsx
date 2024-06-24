'use client';
import { Dropdown } from 'keep-react';
import { FunnelSimple } from 'phosphor-react';

const DropdownComponent = ({ handleSortChange }) => {
  const dropdownOptions = [
    { value: 'priceLowest', label: 'Price (Lowest first)' },
    { value: 'priceHighest', label: 'Price (Highest first)' },
    { value: 'stockLowest', label: 'Stock (Lowest first)' },
    { value: 'stockHighest', label: 'Stock (Highest first)' },
    { value: 'nameAZ', label: 'Name (A-Z)' }
  ];

  return (
    <Dropdown label={<FunnelSimple size={24} />}>
    {dropdownOptions.map(option => (
      <Dropdown.Item key={option.value} onClick={() => handleSortChange(option.value)}>
        {option.label}
      </Dropdown.Item>
    ))}
  </Dropdown>
  );
};

export default DropdownComponent;
