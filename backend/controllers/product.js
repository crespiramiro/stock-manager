const Product = require("../models/product");

const productsGet = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products); // Solo envía la respuesta JSON
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductsByCategory = async (req,res) => {
  try {
    const category = req.params.category;
    console.log('Category:', category); // Agrega este console.log para verificar el valor de category
    const products = await Product.find({ category: category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const productsPost =  async (req, res) => {
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

  const newProduct = new Product({name, description, category, price, quantity, createdAt, updatedAt, managedBy, images})

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
    
    // Asegúrate de incluir el campo updatedAt con la fecha y hora actual
    newData.updatedAt = new Date();

    // Utiliza el método findOneAndUpdate para buscar el producto por su ID y actualizarlo con los nuevos datos
    const updatedProduct = await Product.findOneAndUpdate({ _id: productId }, newData, { new: true });

    // Verifica si se encontró y actualizó el producto
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const productsDelete = async (req, res) => {
  try {
    const productId = req.params.id;

    // Utiliza el método findByIdAndDelete de Mongoose para encontrar y eliminar el producto por su ID
    const deletedProduct = await Product.findByIdAndDelete(productId);
    
    // Verifica si se encontró y eliminó el producto
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
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
