const Curso = require('../models/cursos');

const existeCursoById = async (id = '') => {
    const existeCurso = await Curso.findOne({id});
    if(existeCurso){
        throw new Error(`El id ${id} no pertenece a mimgun curso`);
    }
}

module.exports ={
    existeCursoById
}