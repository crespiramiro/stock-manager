const { Router } = require("express");

const router = Router();

const { body } = require('express-validator');

const jwtValidate = require('../middlewares/jwValidate')

const {
  productsGet,
  productsPost,
  productsPut,
  productsDelete,
  getProductsByCategory
} = require("../controllers/product");

router.get("/",jwtValidate, productsGet);

router.get('/category/:category',jwtValidate, getProductsByCategory);

router.post("/", [
  jwtValidate,
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('price').isNumeric().withMessage('El precio debe ser un número válido'),
  body('quantity').notEmpty().isNumeric().withMessage('Quantity must be a valid number'),
  body('category').notEmpty().isString().withMessage('Category is required and must be a string'),
], productsPost);

router.put("/:id", [
  jwtValidate,
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('price').notEmpty().isNumeric().withMessage('El precio debe ser un número válido'),
  body('quantity').notEmpty().isNumeric().withMessage('Stock must be a valid number'),

], productsPut);

router.delete("/:id", jwtValidate, productsDelete);

module.exports = router;