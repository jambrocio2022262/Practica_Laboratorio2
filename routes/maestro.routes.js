const { Router } = require('express');
const { check } = require('express-validator');

const{ validarCampos } = require('../middlewares/validar-campos');

const {
    maestrosPost, maestrosGet
    } = require('../controllers/maestro.controller');

const { existenteEmail, esRolValido, existeMaestroById } = require('../helpers/db-validators');

const router = Router();

router.get("/", maestrosGet);

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
        check("correo", "Este no es un correo valido").isEmail(),
        check("correo").custom(existenteEmail),
        check("password", "El password debe de ser mayor a 6 caracteres").isLength({min:6}),
        validarCampos,
    ], maestrosPost);

module.exports = router;
