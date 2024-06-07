const { Router } = require("express");

const router = Router();

const { body } = require('express-validator');

const {
  productsGet,
  productsPost,
  productsPut,
  productsDelete,
  getProductsByCategory
} = require("../controllers/products");

router.get("/", productsGet);

router.get('/category/:category', getProductsByCategory);

router.post("/", [
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('price').isNumeric().withMessage('El precio debe ser un número válido')
], productsPost);

router.put("/:id", [
  body('name').optional().notEmpty().withMessage('El nombre es obligatorio'),
  body('price').optional().isNumeric().withMessage('El precio debe ser un número válido')
], productsPut);

router.delete("/:id", productsDelete);

module.exports = router;