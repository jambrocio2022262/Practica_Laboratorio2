const { Router } = require("express");
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const{
    estudiantesPost, estudiantesGet, putEstudiante
} = require('../controllers/estudiante.controller');

const {existenteEmail, esRolValido, existeEstudianteById} = require('../helpers/db-validators');
const { existeCursoById, existeAsignacionEstudiante  } = require('../helpers/db-validators');

const router = Router();

router.get("/", estudiantesGet);

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
        check("correo", "Este no es un correo valido").isEmail(),
        check("correo").custom(existenteEmail),
        check("password", "El password debe de ser mayor a 6 caracteres").isLength({min:6}),
        check("habilidad", "La habilidad no puedes estar vacia").not().isEmpty(),
        validarCampos,
    ], estudiantesPost);

    router.put(
        "/:id",
        [
            check('id', 'El ID no es valido').isMongoId(),
            check("curso", "¡Solo tienes 3 cursos para asignarte!").isArray({max: 3}),
            check('curso.*').custom(async (cursoId, { req }) => {
                const estudianteId = req.params.id;
                if (await existeAsignacionEstudiante(estudianteId, cursoId)) {
                    throw new Error('¡El Estudiante no se puede asignar a más cursos!');
                }
                return true;
            }),
            validarCampos,
            
        ],
        putEstudiante
    );

module.exports = router;
