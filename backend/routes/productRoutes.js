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
  body('name').notEmpty().withMessage('name is required'),
  body('price').isNumeric().withMessage('price must be a valid number'),
  body('quantity').notEmpty().isNumeric().withMessage('quantity must be a valid number'),
  body('category').notEmpty().isString().withMessage('category is required and must be a string'),
], productsPost);

router.put("/:id", [
  jwtValidate,
  body('name').notEmpty().withMessage('name is required'),
  body('price').notEmpty().isNumeric().withMessage('price must be a valid number'),
  body('quantity').notEmpty().isNumeric().withMessage('stock must be a valid number'),

], productsPut);

router.delete("/:id", jwtValidate, productsDelete);

module.exports = router;