const { Router } = require("express");

const router = Router();

const { body, validationResult } = require('express-validator');

const auth = require('../controllers/auth');

router.post(
    "/register",
    [
      body('username')
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 6 }).withMessage('Username must be at least 6 characters long'),
      body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Enter a valid email address'),
      body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
    auth.register
  );
  
  router.post(
    "/login",
    [
      body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Enter a valid email address'),
      body('password')
        .notEmpty().withMessage('Password is required')
    ],
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
    auth.login
  );
  
  module.exports = router;
