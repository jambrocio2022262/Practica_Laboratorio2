const {request, response} = require('express');
const Maestro = require('../models/maestro');
const Estudiante = require('../models/estudiantes');
const bcyptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const loginUser = async (req, res) =>{
    const {correo, password} = req.body;

    try{
        let user = await Maestro.findOne({correo}) || await Estudiante.findOne({ correo });

        if(!user || !user.estado){
            return res.status(400).json({
                msg: !user ? "Credenciales incorrectas, correo no existe en la base de datos" : "El usuario no existe en la base de datos"
            });
        }
        if(!validarPassword(password, user.password)){
            return res.status(400).json({
                msg: "La Contraseña es incorrecta"
            });
        }
        const token = await generarJWT(user.id)
        return res.status(200).json({
            msg: "Bienvenidos al Campus",
            user,
            token
        });
    }catch(error){
        console.error('Error al inicier sesión:',error);
        return res.status(500).json({
            msg: "Error interno del servidor, comunicarse con el administrador"
        });
    }
}

const validarPassword = (password, hashedPassword) =>{
    return bcyptjs.compareSync(password, hashedPassword);
}

module.exports = {
    loginUser
}