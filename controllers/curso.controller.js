const Cursos = require('../models/cursos');
const { response} = require('express');

const cursosPost = async (req, res) =>{
    const{nombreC,estadoC,modalidadC} = req.body;
    const curso = new Cursos({nombreC,estadoC,modalidadC});

    await curso.save();
    res.status(202).json({
        curso
    });
}

module.exports ={
    cursosPost
}