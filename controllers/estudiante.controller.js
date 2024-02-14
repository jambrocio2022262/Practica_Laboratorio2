const bcryptjs = require('bcryptjs');
const Estudiante = require('../models/estudiantes');
const {response, request, query} = require('express');

const estudiantesPost = async (req, res) =>{
    const{nombreE, correoE, password, habilidad, role} = req.body;
    const estudiante = new Estudiante({nombreE, correoE, password, habilidad, role});

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
module.exports  = {
    estudiantesPost,
    estudiantesGet
}