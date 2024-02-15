const { Router } = require('express');
const { check } = require('express-validator');
const { loginUser } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post(
    '/loginUser',
    [
        check('correo', "Este no es un correo valido").isEmail(),
        check('password', "El password es Obligatorio").not().isEmpty(),
        validarCampos
    ], loginUser);

module.exports = router;