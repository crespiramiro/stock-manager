"use client";
import { Avatar, Badge, Button, Popover, Table } from "keep-react";
import { ArrowDown,CurrencyDollar, MagnifyingGlass, Cube, DotsThreeOutline, Pencil, Trash, FileSearch, Clock, Drop } from "phosphor-react";
import { useEffect, useState } from "react";
import sortProducts from "./assets/SortProducts";
import DropdownComponent from "./assets/DropDownComponent";
import { useProductActions } from "./assets/ProductActions";
import EditProductModal from "./assets/EditProduct";
import { ModalComponent } from "./assets/ModalComponent";

export const TableComponent = () => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('priceLowest'); // Estado para el tipo de orden
  const [isOpen, setIsOpen] = useState(false); // Nuevo estado para controlar la apertura del modal

  const getProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/products');
      
      // Verificar si la respuesta es exitosa
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
  
      const data = await response.json();
      setProducts(data)
  
      // Aquí puedes hacer algo con los datos recibidos
      console.log(data);
    } catch (error) {
      // Manejo de errores
      console.error('Error al obtener los productos:', error);
    }
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  // Obtener productos ordenados utilizando sortProducts
  const sortedProducts = sortProducts(products, sortBy);

  const { editingProduct, handleEditProduct, handleDeleteProduct } = useProductActions(getProducts);

  useEffect(() => {
    getProducts();
  }, [sortBy]); // La dependencia vacía [] indica que se ejecutará una sola vez al montar el componente

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const openModal = (product) => {
    handleEditProduct(product);
    setIsOpen(true);
  };

  const closeModal = () => {
    handleEditProduct(null);
    setIsOpen(false);
  };

  return (
    <Table hoverable={true} showBorder={true}
    showCheckbox={true}>
      <Table.Caption>
        <div className="my-5 flex items-center justify-between px-6">
          <div className="flex items-center gap-5">
            <p className="text-body-1 font-semibold text-metal-600">Products</p>
            <Badge size="sm" color="secondary"><nav>number of products</nav></Badge>
          </div>
          <div>
          <DropdownComponent sortBy={sortBy} handleSortChange={handleSortChange} />
      </div>
          <div className="flex items-center gap-5">
            <Button variant="outline" size="sm">
              <span className="pr-2">
                <Cube size={24} />
              </span>
              Add Product
            </Button>
            <Button variant="outline" size="sm">
              <span className="pr-2">
                <MagnifyingGlass size={24} />
              </span>
              Search
            </Button>
          </div>
        </div>
      </Table.Caption>
      <Table.Head>
        <Table.HeadCell className="min-w-[140px]">
          <p className="text-body-5 font-medium text-metal-400">Product</p>
        </Table.HeadCell>
        <Table.HeadCell className="min-w-[130px]" >Price</Table.HeadCell>
        <Table.HeadCell className="min-w-[130px]">Stock</Table.HeadCell>
        <Table.HeadCell className="min-w-[130px]">Category</Table.HeadCell>
        <Table.HeadCell className="min-w-[130px]">Updated At</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-gray-25 divide-y">
        {sortedProducts.map((product) => (
          <Table.Row key={product._id} className="bg-white">
            <Table.Cell>
              {/* Renderizar el nombre del producto y más detalles si es necesario */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {/* Aquí deberías renderizar el nombre del producto */}
                    <div>
                      <p className="-mb-0.5 text-body-4 font-medium text-metal-600">{product.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Table.Cell>
            <Table.Cell>
              {/* Renderizar el precio, puedes usar un Badge o simplemente mostrar el número */}
              <Badge color="primary">
              <CurrencyDollar size={24} />
                <span className="px-1">{product.price}</span>
              </Badge>
            </Table.Cell>
            <Table.Cell>
              {/* Mostrar el stock, podrías condicionar el Badge según el stock */}
              {product.quantity < 5 ? (
                <Badge color="warning">{product.quantity}</Badge>
              ) : (
                <Badge color="success">{product.quantity}</Badge>
              )}
            </Table.Cell>
            <Table.Cell className=" text-body-4 font-medium" >
              {/* Mostrar la categoría */}
              {product.category}
            </Table.Cell>
            <Table.Cell>
              {/* Mostrar la fecha de actualización */}
              <div className="flex items-center gap-1">
                <Badge color="secondary">
                  <Clock size={18} />
                  <span className="px-2">{formatDate(product.updatedAt)}</span>
                </Badge>
              </div>
            </Table.Cell>
            <Table.Cell>
            <div className="flex items-center gap-3">
                <button onClick={() => openModal(product._id)} className="text-purple-500 hover:text-purple-700">
                  <Pencil size={20} />
                </button>
                <button onClick={() => handleDeleteProduct(product._id)} className="text-red-500 hover:text-red-700">
                  <Trash size={20} />
                </button>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      {editingProduct && (
         <ModalComponent
         product={editingProduct}
         onSave={getProducts}
         onClose={closeModal}
         isOpen={isOpen} // Pasar el estado del modal
       />
      )}
    </Table>
  );
};

