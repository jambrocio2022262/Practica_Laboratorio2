const { Router } = require("express");
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const{
    estudiantesPost, estudiantesGet
} = require('../controllers/estudiante.controller');

const {existenteEmail, esRolValido, existeEstudianteById} = require('../helpers/db-validators');

const router = Router();

router.get("/", estudiantesGet);

router.post(
    "/",
    [
        check("nombreE", "El nombre no puede estar vacio").not().isEmpty(),
        check("correoE", "Este no es un correo valido").isEmail(),
        check("correoE").custom(existenteEmail),
        check("password", "El password debe de ser mayor a 6 caracteres").isLength({min:6}),
        check("habilidad", "La habilidad no puedes estar vacia").not().isEmpty(),
        check('role').custom(esRolValido),
        validarCampos,
    ], estudiantesPost);

module.exports = router;
