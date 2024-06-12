const { Router } = require("express");

const router = Router();

const { body } = require('express-validator');

const jwtValidate = require('../middlewares/jwValidate')

const {
    getUsers,
    registerUser,
    loginUser,
    logoutUser
} = require("../controllers/user");

//get users
router.get('/', jwtValidate, getUsers);


module.exports = router;
