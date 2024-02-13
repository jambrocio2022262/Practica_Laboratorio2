const Cursos = require('../models/cursos');
const { response} = require('express');

const cursosGet = async(req, res = response) =>{
    const {limite, desde} = req.query;
    const query = {estadoC: true};

    const[total, cursos] = await Promise.all([
        Cursos.countDocuments(query),
        Cursos.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        cursos
    })
}

const getCursoById = async(req, res) =>{
    const{id} = req.params;
    const curso = await Cursos.findOne({_id: id});

    res.status(200).json({
        curso
    });
}

const cursosPost = async (req, res) =>{
    const{nombreC,estadoC,modalidadC} = req.body;
    const curso = new Cursos({nombreC,estadoC,modalidadC});

    await curso.save();
    res.status(202).json({
        curso
    });
}

const putCursos = async (req, res = response) =>{
    const {id} = req.params;
    const {_id, nombreC, ...resto} = req.body;

    const curso = await Cursos.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Curso Actualizado Correctamente',
        curso
    });
}

const cursosDelete = async(req, res = response) =>{
    const {id} = req.params;
    const curso = await Cursos.findByIdAndUpdate(id, {estadoC: false});

    res.status(200).json({
        msg: "Curso Eliminado Exitosamente",
        curso
    })

}

module.exports ={
    cursosPost,
    cursosGet,
    getCursoById,
    cursosDelete,
    putCursos
}