const bcryptjs = require('bcryptjs');
const Maestro = require('../models/maestro');
const {response, request, query} = require('express');

const maestrosPost = async (req, res) => {
    const {nombre,correo, password, role} = req.body;
    const maestro = new Maestro({nombre,correo,password,role});
 
    if(password){
        const salt = bcryptjs.genSaltSync();
        maestro.password = bcryptjs.hashSync(password, salt);
 
    }
 
    await maestro.save();
    res.status(202).json({
        maestro
    });
}

const maestrosGet = async (req, res = response) =>{
    const {limite, desde} = req.body;
    const query = {estado: true};
    
    const[total, maestros] = await Promise.all([
        Maestro.countDocuments(query),
        Maestro.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        maestros
    })
}


module.exports = {
    maestrosPost,
    maestrosGet
}