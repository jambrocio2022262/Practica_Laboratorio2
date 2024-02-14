const { Schema, model } = require('mongoose');

const MaestroSchema = Schema({
    nombreM:{
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    correoM:{
        type: String,
        require: [true, 'El correo es obligatorio']
    }
});

module.exports = model('Maestro', MaestroSchema);