const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    cursosPost,  
    cursosGet,
    getCursoById,
    cursosDelete, 
    putCursos,
} = require('../controllers/curso.controller');
const { existeCursoById } = require('../helpers/db-validators');
const { esMaestroRole } = require('../middlewares/validar-roles');

const router =  Router();

router.get("/",cursosGet);

router.get(
    "/:id",
    [
        check('id', 'No es un ID Valido').isMongoId(),
        check('id').custom(existeCursoById),
        validarCampos
    ], getCursoById);

router.put(
    "/:id",
    [
        check('id', 'No es un ID Valido').isMongoId(),
        check('id').custom(existeCursoById),
        validarCampos
    ], putCursos);


router.post(
    "/",
    [
        check("nombreC", "El noombre no puede estar vacio").not().isEmpty(),
        check("modalidadC","La modalidad no debe estar vacia").not().isEmpty(),
        validarCampos
    ], cursosPost)

router.delete(
    "/:id",
    [
        validarJWT,
        esMaestroRole,
         check('id', 'No es un id válido').isMongoId(),
         check('id').custom(existeCursoById),
         validarCampos
     ],  cursosDelete);


module.exports = router;