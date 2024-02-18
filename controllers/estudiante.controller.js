const bcryptjs = require('bcryptjs');
const Estudiante = require('../models/estudiantes');
const {response, request, query} = require('express');
const Curso = require('../models/cursos');

const estudiantesPost = async (req, res) =>{
    const{nombre, correo, password, habilidad, role} = req.body;
    const estudiante = new Estudiante({nombre, correo, password, habilidad, role});

    if(password){
        const salt = bcryptjs.genSaltSync();
        estudiante.password = bcryptjs.hashSync(password, salt);
    }

    await estudiante.save();
    res.status(202).json({
        estudiante
    })
}

const estudiantesGet = async (req, res = response) =>{
    const {limite, desde} = req.body;
    const query = {estado: true};

    const [total, estudiantes] = await Promise.all([
        Estudiante.countDocuments(query),
        Estudiante.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json([
        total,
        estudiantes
    ])
}

const putEstudiante = async (req, res = response) => {
    const { id } = req.params;
    const { curso, ...resto } = req.body;

    try {
        const cursosExistentes = await Curso.find({ _id: { $in: curso } });
        if (cursosExistentes.length !== curso.length) {
            return res.status(400).json({ error: '¡No existen esos cursos en la DB!' });
        }

        const estudiante = await Estudiante.findByIdAndUpdate(id, { ...resto, curso });

        res.status(200).json({
            msg: '¡Se Actualizo Correctamente el Estudiante',
            estudiante
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: '¡No se puedo actualizar el Estudiante!' });
    }
}

module.exports  = {
    estudiantesPost,
    estudiantesGet,
    putEstudiante
}