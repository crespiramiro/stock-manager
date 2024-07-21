"use client";
import { Avatar, Badge, Button, Popover, Table } from "keep-react";
import { ArrowDown,CurrencyDollar, MagnifyingGlass, Cube, DotsThreeOutline, Pencil, Trash, FileSearch, Clock, Drop } from "phosphor-react";
import { useEffect, useState } from "react";
import sortProducts from "./assets/SortProducts";
import DropdownComponent from "./assets/DropDownComponent";
import { useProductActions } from "./assets/ProductActions";
import EditProductModal from "./assets/EditProduct";
import { ModalComponent } from "./assets/ModalComponent";

const TableComponent = () => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('priceLowest'); // Estado para el tipo de orden
  const [isOpen, setIsOpen] = useState(false); // Nuevo estado para controlar la apertura del modal
  const [searchTerm, setSearchTerm] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token')); // Estado para el token
  const [totalProducts, setTotalProducts] = useState(0);

  const getProducts = async () => {
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    try {
      const response = await fetch('http://localhost:8080/api/products', {
        method: 'GET',
        headers: headers
      });

      if (response.status === 401) { // Si el token está expirado o inválido
        await refreshToken();
        return; // Reintentar la solicitud después de actualizar el token
      }

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const data = await response.json();
      setProducts(data);
      setTotalProducts(data.length);
      console.log(data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      // Redirigir al usuario si el error es relacionado con la autenticación
      if (error.message.includes('401')) {
        window.location.href = '/'; // Redirige al inicio de sesión o página de error
      }
    }
  };

  const refreshToken = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      });

      if (!response.ok) {
        throw new Error('Error al renovar el token');
      }

      const { token: newToken } = await response.json();
      localStorage.setItem('token', newToken);
      setToken(newToken);
      // Volver a intentar la solicitud original
      getProducts();
    } catch (error) {
      console.error('Error al renovar el token:', error);
      window.location.href = '/'; // Redirige al inicio de sesión o página de error
    }
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  // Obtener productos ordenados utilizando sortProducts
  const sortedProducts = sortProducts(products, sortBy);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = sortedProducts.filter((product) =>
  product.name.toLowerCase().includes(searchTerm.toLowerCase())
);


  const { editingProduct, handleEditProduct, handleDeleteProduct, handleSaveProduct } = useProductActions(getProducts);

  useEffect(() => {
    getProducts();
  }, [sortBy, token]); // La dependencia vacía [] indica que se ejecutará una sola vez al montar el componente

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const openModal = (product) => {
    console.log('Opening modal for product:', product);
    handleEditProduct(product);
    setIsOpen(true);
    console.log('Modal open state set to true');
  };

  const closeModal = () => {
    handleEditProduct(null);
    setIsOpen(false);
    console.log('Modal open state set to false');
  };

  return (
    <Table hoverable={true} showBorder={true}
    showCheckbox={true}>
      <Table.Caption>
        <div className="my-5 flex items-center justify-between px-6">
          <div className="flex items-center gap-5">
            <p className="text-body-1 font-semibold text-metal-600">Products</p>
            <Badge size="sm"  className="p-2" color="secondary"><nav>{totalProducts}</nav></Badge>
          </div>
          <div>
          <DropdownComponent sortBy={sortBy} handleSortChange={handleSortChange} />
      </div>
          <div className="flex items-center gap-5">
            <Button variant="outline" className="p-3" size="sm" onClick={() => { console.log('Add Product button clicked'); openModal(null); }}>
              <span className="pr-2">
                <Cube size={24} />
              </span>
              Add Product
            </Button>
            <Button variant="link" size="sm" value={searchTerm} className="px-2" onChange={handleSearchChange} >
              <span className="pr-2">
                <MagnifyingGlass size={24} />
              </span>
              Search
              <input className="p-3 ml-1 border border-[#1b4dff] rounded-lg "
  type="text"
  value={searchTerm}
  onChange={handleSearchChange}
/>
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
        {filteredProducts.map((product) => (
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
      {isOpen && (
  <ModalComponent
    product={editingProduct}
    onSave={getProducts}
    onClose={closeModal}
    isOpen={isOpen}
    handleSaveProduct={handleSaveProduct}
  />
)}
    </Table>
  );
};

export default TableComponent;