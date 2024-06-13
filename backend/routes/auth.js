const { Router } = require("express");
const User = require('../models/user')
const router = Router();

const { body, validationResult } = require('express-validator');

const auth = require('../controllers/auth');

router.post(
    '/register',
    [
      body('username')
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 6 })
        .withMessage('Username must be at least 6 characters long')
        .custom(async (value) => {
            const existingUser = await User.findOne({ username: value });
            if (existingUser) {
              throw new Error('Username already in use');
            }
          }),
      body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Enter a valid email address')
        .custom(async (value) => {
          const existingUser = await User.findOne({ email: value });
          if (existingUser) {
            throw new Error('Email already in use');
          }
        }),
      body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[A-Z]/).
        withMessage('Password must contain at least one uppercase letter')
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
  
  module.exports = router;
