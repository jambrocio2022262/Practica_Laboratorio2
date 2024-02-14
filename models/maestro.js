const { Schema, model } = require('mongoose');

const MaestroSchema = Schema({
    nombreM:{
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    correoM:{
        type: String,
        require: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        require: [true, "La contraseña es Onlogatoria"]
    },
    role:{
        type: String,
        require: true,
        enum: ["TEACHER_ROLE"]
    },
    curso:{
        type: String,
        default: "none"
    },
    estado:{
        type: Boolean,
        default: true
    }
});

module.exports = model('Maestro', MaestroSchema);

