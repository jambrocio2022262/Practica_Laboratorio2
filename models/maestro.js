const { Schema, model } = require('mongoose');

const MaestroSchema = Schema({
    nombre:{
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        require: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        require: [true, "La contraseña es Obligatoria"]
    },
    role:{
        type: String,
        default : "TEACHER_ROLE"
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

