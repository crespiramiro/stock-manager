const { Router } = require("express");

const router = Router();

const { body } = require('express-validator');

const {
    getUsers,
    registerUser,
    loginUser,
    logoutUser
} = require("../controllers/user")

//get users
router.get('/', getUsers)

// // Ruta para registrar un nuevo usuario
// router.post('/signup', registerUser);

// // login route
// router.post('/login', loginUser);

// // Ruta para cerrar sesión
// router.post('/logout', logoutUser);



module.exports = router;
