const bcryptjs = require('bcryptjs');
const Maestro = require('../models/maestro');
const {response, request} = require('express');

const maestrosPost = async (req, res) => {
    const {nombreM,correoM, password} = req.body;
    const maestro = new Maestro({nombreM,correoM,password});
 
    if(password){
        const salt = bcryptjs.genSaltSync();
        maestro.password = bcryptjs.hashSync(password, salt);
 
    }
 
    await maestro.save();
    res.status(202).json({
        maestro
    });
}


module.exports = {
    maestrosPost
}