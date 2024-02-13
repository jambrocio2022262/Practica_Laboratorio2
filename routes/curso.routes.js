const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {
    cursosPost   
} = require('../controllers/curso.controller');

router.post(
    "/",
    [
        check("nombreC", "El noombre no puede estar vacio").not().isEmpty(),
        check("estadoC","El estado no puede estar vacio").not.isEmpty(),
        check("modalidadC","La modalidad no debe estar vacia").not.isEmpty(),
        validarCampos
    ], cursosPost)


nombreC,estadoC,modalidadC