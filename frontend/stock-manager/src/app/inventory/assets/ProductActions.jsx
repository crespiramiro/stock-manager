'use client'
import { useState } from "react";

export const useProductActions = () => {
  const [editingProduct, setEditingProduct] = useState(null);

  const handleEditProduct = (id) => {
    setEditingProduct(id);
  };

  const handleDeleteProduct = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the product');
      }

      alert('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting the product:', error);
      alert('Failed to delete the product');
    }
  };

  return {
    editingProduct,
    handleEditProduct,
    handleDeleteProduct,
  };
};
