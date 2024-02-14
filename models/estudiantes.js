const { Schema, model } = require('mongoose');

const EstudianteSchema = Schema({
    nombreE:{
        type: String,
        require: [true, "El nombre es obligatorio"]
    },
    correoE:{
        type: String,
        require: [true, "El correo es obligatorio"],
        unique: true
    },
    paswword:{
        type: String,
        require: [true, "La contraseña es Obligatoria"]
    },
    habilidad:{
        type: String,
        require: [true, "La habilidad debe ser definidad"]
    },
    role:{
        type: String,
        require: true,
        enum: ["TEACHER_ROLE", "STUDENT_ROLE"]
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

module.exports = model ('Estudiante', EstudianteSchema);

