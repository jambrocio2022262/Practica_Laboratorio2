const Estudiante = require('../models/estudiantes');

const esMaestroRole = (req, res, next) => {
    if (!req.maestro && !req.alumno) {
        return res.status(500).json({
            msg: "Se desea validar un usuario sin validar token primero"
        });
    }

    const user = req.maestro || req.estudiante;

    if (user && user.role !== "TEACHER_ROLE") {
        return res.status(401).json({
            msg: `${user.nombre} no es un Teacher, no tienes acceso a esto`
        });
    };
    next();
}

module.exports = {
    esMaestroRole
}