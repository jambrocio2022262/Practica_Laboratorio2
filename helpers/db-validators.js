const Curso = require('../models/cursos');
const Role = require('../models/role')
const Maestro = require('../models/maestro');
const Estudiante = require('../models/estudiantes');


const esRolValido = async (role = '') =>{
    const existeRol = await Role.findOne({role});
    if(!existeRol){
        throw new Error(`El role ${ role } no existe en la base de datos`);
    }
}

const existenteEmail = async (correo = '') => {
    const existeEmail = await Maestro.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${ correo } ya esta registrado`);
    }
}

const existeMaestroById = async (id = '') =>{
    const existeMaestro = await Maestro.findOne({id});
    if(existeMaestro){
        throw new Error(`El id ${id} no pertenece a ningun Maestro`);
    }
}

const existeEstudianteById = async (id = '') =>{
    const existeEstudiante = await Estudiante.findOne({id});
    if(existeEstudiante){
        throw new Error(`El id ${id} no pertenece a ningun Estudiante`);
    }
}


const existeCursoById = async (id = '') => {
    const existeCurso = await Curso.findOne({id});
    if(existeCurso){
        throw new Error(`El id ${id} no pertenece a ningun curso`);
    }
}

module.exports ={
    existeCursoById,
    existeMaestroById,
    existenteEmail,
    esRolValido,
    existeEstudianteById
}