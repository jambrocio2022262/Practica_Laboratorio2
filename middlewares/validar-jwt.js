const jwt = require('jsonwebtoken');
const Maestro = require('../models/maestro');
const { request, response } = require('express');


const validarJWT = async(req = request, res = response, next)=> {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: '¡No tenemos la validación correspondiente!',
        });
    }
    try{
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const maestro = await Maestro.findById(uid);

        if(!maestro){
            return res.status(401).json({
                msg: "¡Este Rol no es Maestro!"
            });
        }

        if(!maestro.estado){
            return res.status(401).json({
                msg: "¡Este token no existe, verifique el usuario en estado verdader!"
            });
        }

        req.maestro = maestro;
        next();
        
    }catch(e){
        console.log(e);
        res.status(401).json({
            msg: "¡No tenemos la validación correspondiente!"
        })
    }
} 
module.exports = {
    validarJWT
}