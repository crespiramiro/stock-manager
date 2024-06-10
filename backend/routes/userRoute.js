const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userController');

// Ruta para registrar un nuevo usuario
router.post('/signup', registerUser);

// login route
router.post('/login', loginUser);

// Ruta para cerrar sesión
router.post('/logout', logoutUser);



module.exports = router;
