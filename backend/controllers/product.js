const Product = require("../models/product");

const productsGet = async (req, res) => {
  try {
    const { userId } = req.user;
    const products = await Product.find({ userId });
    res.json(products); // Solo envía la respuesta JSON
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductsByCategory = async (req,res) => {
  try {
    const { userId } = req.user;
    const category = req.params.category;
    console.log('Category:', category); // Agrega este console.log para verificar el valor de category
    const products = await Product.find({ category, userId});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const productsPost =  async (req, res) => {
  console.log('Usuario autenticado:', req.user)
  const {
    name,
    description,
    category,
    price,
    quantity,
    createdAt,
    updatedAt,
    managedBy,
    images,
  } = req.body;

  const { userId } = req.user;

  const newProduct = new Product({name, description, category, price, quantity, createdAt, updatedAt, managedBy, images, userId})

  await newProduct.save(); 

  res.json({
    msg: "Product added succesfully",
    newProduct
  }); 
};

const productsPut = async (req, res) => {
  try {
    const productId = req.params.id;
    const newData = req.body;
    
    const { userId } = req.user;
    newData.updatedAt = new Date();
    newData.userId = userId;

    // Utiliza el método findOneAndUpdate para buscar el producto por su ID y actualizarlo con los nuevos datos
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId, userId },
      newData,
      { new: true }
    );

    // Verifica si se encontró y actualizó el producto
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found or you do not have permission to update this product' });
    }
    
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const productsDelete = async (req, res) => {
  try {
    const productId = req.params.id;
    const { userId } = req.user;

    const deletedProduct = await Product.findOneAndDelete({ _id: productId, userId });
    
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found or you do not have permission to delete this product' });
    }
    
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  productsGet,
  productsPost,
  productsPut,
  productsDelete,
  getProductsByCategory
};
