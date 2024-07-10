'use client'
import { useState, useEffect } from 'react'
import { Button, Modal, toast } from 'keep-react'
import { useForm } from 'react-hook-form'


export const ModalComponent = ({ product, onSave, onClose, isOpen }) => {
  if (!isOpen) return null;

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: "",
      price: "",
      quantity: "",
      category: "",
    }
  });    

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        category: product.category,
      });
    }
  }, [product, reset]);
    
  const onSubmit = async (formData) => {
    try {
      console.log(product, "PRODUCTO");
      const method = product ? 'PUT' : 'POST';
      const url = product 
        ? `http://localhost:8080/api/products/${product}`
        : 'http://localhost:8080/api/products';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
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

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Body className="space-y-3">
        <div>
        <h2 className="text-center font-semibold">{product ? 'Edit' : 'Add'} Product</h2>
      <form className='flex flex-col gap-y-6 items-center w-full font-medium p-3' onSubmit={handleSubmit(onSubmit)}>
          <div className='items-center w-full'>
            <input
              className='p-3 w-full bg-slate-100'
              placeholder='Enter the name of the product'
              type="text"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>
          <div className='items-center w-full'>
            <input
              className='p-3 w-full bg-slate-100'
              placeholder='Enter the price of the product'
              type="number"
              {...register("price", { required: "Price is required", valueAsNumber: true, min: { value: 0, message: "Price must be a positive number" } })}
            />
            {errors.price && <p className="text-red-500">{errors.price.message}</p>}
          </div>
          <div className='items-center w-full'>
            <input
              className='p-3 w-full bg-slate-100'
              placeholder='Enter the stock of the product'
              type="number"
              {...register("quantity", { required: "Quantity is required", valueAsNumber: true, min: { value: 0, message: "Quantity must be a positive number" } })}
            />
            {errors.quantity && <p className="text-red-500">{errors.quantity.message}</p>}
          </div>
          <div className='items-center w-full'>
            <input
              className='p-3 w-full bg-slate-100'
              placeholder='Enter the category of the product'
              type="text"
              {...register("category", { required: "Category is required" })}
            />
            {errors.category && <p className="text-red-500">{errors.category.message}</p>}
          </div>
          <div className="buttons flex flex-row gap-x-2">
            <button className='font-medium py-2 px-4 bg-purple-500 text-white rounded-md hover:bg-purple-700' type="submit">Save</button>
            <button type="button" className='font-medium py-2 px-4 rounded-md border-2 border-purple-500 hover:border-purple-700' onClick={onClose}>Cancel</button>
          </div>
        </form>
    </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
