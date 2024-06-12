const { Router } = require("express");

const router = Router();

const { body } = require('express-validator');

const auth = require('../controllers/auth');

router.post("/register", auth.register);

router.put("/login", auth.login)

module.exports = router;
