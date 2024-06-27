'use client'
import { useState, useEffect } from 'react'
import { Button, Modal } from 'keep-react'


export const ModalComponent = ({ product, onSave, onClose, isOpen }) => {

        console.log('producto', product);

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
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Body className="space-y-3">
        <div>
      <h2 className='text-center font-semibold' >Edit Product</h2>
      <form className='flex flex-col gap-y-6 items-center w-full font-medium p-3  ' onSubmit={handleSubmit}>
        <div className='items-center   w-full ' >
          <input className='p-3 w-full bg-slate-100  '  placeholder='Enter the name of the product' type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className='items-center w-full ' >
          <input className='p-3 w-full bg-slate-100 ' placeholder='Enter the price of the product' type="text" name="price" value={formData.price} onChange={handleChange} />
        </div>
        <div className='items-center w-full ' >
          <input className='p-3 w-full bg-slate-100 ' placeholder='Enter the stock of the product' type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
        </div>
        <div className='items-center w-full ' >
          <input className='p-3 w-full bg-slate-100 ' placeholder='Enter the category of the product' type="text" name="category" value={formData.category} onChange={handleChange} />
        </div>
        <div className="buttons flex flex-row gap-x-2 ">
        <button className=' font-medium  py-2 px-4 bg-purple-500 text-white rounded-md hover:bg-purple-700' type="submit">Save</button>
        <button type="button" className=' font-meidium py-2 px-4 rounded-md border-2 border-purple-500 hover:border-purple-700' onClick={onClose}>Cancel</button>
        </div>
       
      </form>
    </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
