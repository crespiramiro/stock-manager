'use client'
import { useState } from "react";
import { toast } from "keep-react";
import apiUrl from "../../../../api";

export const useProductActions = (getProducts) => {
  const [editingProduct, setEditingProduct] = useState(null);

  const handleEditProduct = (id) => {
    setEditingProduct(id);
  };

  const handleSaveProduct = async (formData, product, onSave, onClose) => {
    try {
      const method = product ? 'PUT' : 'POST';
      const url = product 
        ? `${apiUrl}/products/${product._id}`
        : `${apiUrl}/products`;

        const token = localStorage.getItem('token');
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${product ? 'update' : 'create'} the product`);
      }

      onSave();
      onClose();

      toast.success(`Product ${product ? 'updated' : 'saved'} successfully!`);
    } catch (error) {
      console.error(`Error ${product ? 'updating' : 'saving'} the product:`, error);
      alert(`Failed to ${product ? 'update' : 'save'} the product`);
    }
  };

  const handleDeleteProduct = async (id) => {

    const token = localStorage.getItem('token'); 
    const headers = {
    'Authorization': `Bearer ${token}`
  };

    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      const response = await fetch(`${apiUrl}/products/${id}`, {
        method: 'DELETE',
        headers: headers,
      });

      if (!response.ok) {
        throw new Error('Failed to delete the product');
      }

      toast.success('Product deleted Succesfully')
      getProducts();
    } catch (error) {
      console.error('Error deleting the product:', error);
      alert('Failed to delete the product');
    }
  };

  return {
    editingProduct,
    handleEditProduct,
    handleDeleteProduct,
    handleSaveProduct
  };
};
