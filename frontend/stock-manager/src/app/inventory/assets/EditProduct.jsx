'use client'
import { useEffect, useState } from "react";

const EditProductModal = ({ product, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    updatedAt: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        category: product.category,
        updatedAt: product.updatedAt,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/products/${product}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update the product');
      }

      onSave();
      onClose();
    } catch (error) {
      console.error('Error updating the product:', error);
      alert('Failed to update the product');
    }
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Price:</label>
          <input type="text" name="price" value={formData.price} onChange={handleChange} />
        </div>
        <div>
          <label>Quantity:</label>
          <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} />
        </div>
        <div>
          <label>Category:</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditProductModal;
