'use client'
import { useEffect, useState } from "react";
import { ModalComponent } from "./ModalComponent";

const EditProductModal = ({ product, onSave, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };


  return (
    <ModalComponent
        product={product}
        onSave={onSave}
        onClose={closeModal}
        isOpen={isOpen}
      />
  );
};

export default EditProductModal;
